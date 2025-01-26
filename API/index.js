import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';

const app = express();
const PORT = 3000;
dotenv.config();
 

const require = createRequire(import.meta.url);

app.use(cors({
    origin: '*'
}));

// puppeteer options
let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}







app.get('/video', async (req, res) => {

  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
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
    
    const targetUrl = `https://beta.awstream.net/watch?v=shinchan-8211-season-${season}-8211-episode-${episode}&lang=hin`;
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

  } catch (error) {
    console.error('Puppeteer error:', error);
    return res.status(500).json({ error: "Failed to fetch stream" });
  } finally {
    await browser.close();
  }

  if (!m3u8Url) {
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


