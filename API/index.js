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
  const {name, season, episode } = req.params;

  try {
    const url = `https://watchanimeworld.in/episode/${name}-${season}x${episode}/`;

    const { data } = await axios.get(url);

    if (data.includes("404 Not Found")) {
      return res.status(404).json({ error: "Page not found" });
    }

    const $ = load(data);
    const iframe = $("#options-1 iframe");
    const iframeSrc = iframe.attr("data-src");
    console.log(iframeSrc);
    return iframeSrc
      ? res.json({ iframeSrc })
      : res.status(404).json({ error: "Iframe not found" });
  } catch (error) {
    console.error("Error scrapping", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/images/:name/:seasonId/:episode", async (req, res) => {
  const { name, seasonId, episode } = req.params;

  try {
    const url = `https://watchanimeworld.in/series/${name}`;

    const { data } = await axios.get(url);

    if (data.includes("404 Not Found")) {
      return res.status(404).json({ error: "Page not found" });
    }

    const $ = load(data);
    const imgage = [];
$('li article div.post-thumbnail img').each((index, element) => {
  const src = $(element).attr('src');
  if (src) {
    imgage.push(src);
  }
});

    return image
      ? res.json({ image })
      : res.status(404).json({ error: "Image not found" });
  } catch (error) {
    console.error("Error scrapping", error);
    res.status(500).json({ error: "Internal server error" });
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
