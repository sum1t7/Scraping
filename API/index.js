import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { load } from "cheerio";
import http from "http";
import https from "https";
import NodeCache from "node-cache";

dotenv.config();

const app = express();
app.use(cors());

/*
===========================================================
CONFIG
===========================================================
*/

const PORT = process.env.PORT || 3000;

const BASE_URL = "https://watchanimeworld.net";

const TIMEOUT = 15000;

/*
===========================================================
HTTP CLIENT (connection pooling + keep-alive)
===========================================================
*/

const client = axios.create({
  timeout: TIMEOUT,

  httpAgent: new http.Agent({
    keepAlive: true,
    maxSockets: 20
  }),

  httpsAgent: new https.Agent({
    keepAlive: true,
    maxSockets: 20
  }),

  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept-Encoding":
      "gzip, deflate",
    Connection: "keep-alive"
  }
});

/*
===========================================================
RETRY LOGIC
===========================================================
*/

async function fetchWithRetry(url, retries = 2) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await client.get(url);
    } catch (err) {
      lastError = err;

      if (i === retries) break;

      await new Promise((r) =>
        setTimeout(r, 500 * (i + 1))
      );
    }
  }

  throw lastError;
}

/*
===========================================================
CACHES (tiered TTL strategy)
===========================================================
*/

const episodeCache = new NodeCache({
  stdTTL: 600,
  checkperiod: 120
});

const imageCache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 300
});

const negativeCache = new NodeCache({
  stdTTL: 120
});

/*
===========================================================
HELPERS
===========================================================
*/

function buildEpisodeKey(name, season, episode) {
  return `${name}-${season}-${episode}`;
}

function extractIframe($) {
  return (
    $("#options-1 iframe").attr("data-src") ||
    $("#options-1 iframe").attr("src") ||
    $("#options-2 iframe").attr("data-src") ||
    $("#options-2 iframe").attr("src") ||
    $("iframe").first().attr("data-src") ||
    $("iframe").first().attr("src") ||
    null
  );
}

/*
===========================================================
ROOT
===========================================================
*/

app.get("/", (res) => {
  res.send("Proxy server running");
});

/*
===========================================================
EPISODE STREAM ROUTE
===========================================================
*/

app.get(
  "/api/:name/:season/:episode",
  async (req, res) => {
    const { name, season, episode } =
      req.params;

    const cacheKey =
      buildEpisodeKey(
        name,
        season,
        episode
      );

    /*
    ---------------------------------------
    NEGATIVE CACHE CHECK
    ---------------------------------------
    */

    if (
      negativeCache.has(cacheKey)
    ) {
      return res
        .status(404)
        .json({
          error:
            "Previously not found"
        });
    }

    /*
    ---------------------------------------
    POSITIVE CACHE CHECK
    ---------------------------------------
    */

    const cached =
      episodeCache.get(
        cacheKey
      );

    if (cached) {
      console.log(
        "Cache hit:",
        cacheKey
      );

      return res.json(
        cached
      );
    }

    console.log(
      "Cache miss:",
      cacheKey
    );

    try {
      const url =
        `${BASE_URL}/episode/` +
        `${name}-${season}x${episode}/`;

      const { data } =
        await fetchWithRetry(
          url
        );

      if (
        data.includes(
          "404 Not Found"
        )
      ) {
        negativeCache.set(
          cacheKey,
          true
        );

        return res
          .status(404)
          .json({
            error:
              "Page not found"
          });
      }

      const $ = load(data);

      const iframeSrc =
        extractIframe($);

      if (!iframeSrc) {
        negativeCache.set(
          cacheKey,
          true
        );

        return res
          .status(404)
          .json({
            error:
              "Iframe not found"
          });
      }

      const result = {
        iframeSrc
      };

      episodeCache.set(
        cacheKey,
        result
      );

      return res.json(
        result
      );
    } catch (error) {
      console.error(
        "Episode fetch error:",
        error.message
      );

      return res
        .status(500)
        .json({
          error:
            "Internal server error"
        });
    }
  }
);

/*
===========================================================
IMAGE ROUTE
===========================================================
*/

app.get(
  "/images/:name",
  async (req, res) => {
    const { name } =
      req.params;

    const cacheKey =
      `images-${name}`;

    const cached =
      imageCache.get(
        cacheKey
      );

    if (cached) {
      console.log(
        "Image cache hit:",
        name
      );

      return res.json(
        cached
      );
    }

    try {
      const url =
        `${BASE_URL}/series/${name}`;

      const { data } =
        await fetchWithRetry(
          url
        );

      if (
        data.includes(
          "404 Not Found"
        )
      ) {
        return res
          .status(404)
          .json({
            error:
              "Page not found"
          });
      }

      const $ = load(data);

      const images = [];

      $(
        "li article div.post-thumbnail img"
      ).each(
        ( element) => {
          const src =
            $(element).attr(
              "src"
            );

          if (src) {
            images.push(src);
          }
        }
      );

      if (
        images.length === 0
      ) {
        return res
          .status(404)
          .json({
            error:
              "Images not found"
          });
      }

      const result = {
        images
      };

      imageCache.set(
        cacheKey,
        result
      );

      return res.json(
        result
      );
    } catch (error) {
      console.error(
        "Image fetch error:",
        error.message
      );

      return res
        .status(500)
        .json({
          error:
            "Internal server error"
        });
    }
  }
);

/*
===========================================================
SERVER
===========================================================
*/

app.listen(PORT, () => {
  console.log(
    `Proxy server running on port ${PORT}`
  );
});