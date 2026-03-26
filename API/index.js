import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { load } from "cheerio";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from the proxy server!");
});

app.get("/api/:name/:season/:episode", async (req, res) => {
  const { name, season, episode } = req.params;

  try {
    // Step 1: Get the episode page and extract the Zephyrflick iframe URL
    const episodeUrl = `https://watchanimeworld.net/episode/${name}-${season}x${episode}/`;
    const { data: episodePage } = await axios.get(episodeUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });

    if (episodePage.includes("404 Not Found")) {
      return res.status(404).json({ error: "Episode not found" });
    }

    const $ = load(episodePage);
    const iframeSrc =
      $("#options-1 iframe").attr("data-src") ||
      $("#options-1 iframe").attr("src") ||
      $("#options-2 iframe").attr("data-src") ||
      $("#options-2 iframe").attr("src") ||
      $("iframe").first().attr("data-src") ||
      $("iframe").first().attr("src");

    if (!iframeSrc) {
      return res.status(404).json({ error: "Iframe not found" });
    }

    // Step 2: Extract video ID from Zephyrflick URL
    const videoIdMatch = iframeSrc.match(/\/video\/([a-f0-9]+)/i);
    if (!videoIdMatch) {
      return res.status(404).json({ error: "Video ID not found in iframe URL" });
    }

    const videoId = videoIdMatch[1];

    // Step 3: POST to Zephyrflick API to get the real video URL
    const { data: zephyrData } = await axios.post(
      "https://play.zephyrflick.top/player/index.php",
      null,
      {
        params: { data: videoId, do: "getVideo" },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "X-Requested-With": "XMLHttpRequest",
          Referer: iframeSrc
        }
      }
    );

    const videoUrl = zephyrData?.videoSource;

    if (!videoUrl) {
      return res.status(404).json({ error: "Video URL not found" });
    }

    console.log("Video URL:", videoUrl);
    return res.json({ videoUrl });

  } catch (error) {
    console.error("Error scraping:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));