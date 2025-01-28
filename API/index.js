import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import puppeteer from 'puppeteer';

const app = express();
const PORT = 3000;
dotenv.config();
 

const require = createRequire(import.meta.url);

app.use(cors({
  origin: '*'
}));

// puppeteer options
 let chromium;

chromium = require("@sparticuz/chromium");
    


chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

 

app.get('/video', async (req, res) => {

  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
 
    };
  }


  const { season, episode } = req.query;
  
   if (!season || !episode) {
    return res.status(400).json({ error: "Missing season/episode" });
  }


  let m3u8Url = [];
  const browser = await puppeteer.launch(options);

  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (request) => {
      const reqUrl = request.url();
      
       if (reqUrl.includes('/m3u8/') && new URL(reqUrl).pathname.endsWith('/master.txt')) {
        m3u8Url.push(reqUrl);
       }
      request.continue();
    });

    if(season == '01'){
      const targetUrl = `https://beta.awstream.net/watch?v=shinchan-8211-episode-${episode}&lang=hin`;
      await page.goto(targetUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
    }
    else{
      const targetUrl = `https://beta.awstream.net/watch?v=shinchan-8211-season-${season}-8211-episode-${episode}&lang=hin`;
      await page.goto(targetUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
    }

  } catch (error) {
    console.error('Puppeteer error:', error);
    return res.status(500).json({ error: "Failed to fetch stream" });
  } finally {
    await browser.close();
  }

  if (!m3u8Url) {
    return res.status(404).json({ error: "HLS stream not found" });
  }
  if (m3u8Url.length === 0) {
    return res.status(404).json({ error: "HLS stream not found" });
  } 
   res.json({ 
    videoUrl: `https://anym3u8player.com/tv/video-player.php?url=${encodeURIComponent(m3u8Url)}`,  
    season,
    episode
    
  });
});
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


