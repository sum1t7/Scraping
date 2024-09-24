import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
 
  
app.use(cors({
    origin: '*'
}));


app.get('/video', (req, res) => {
    const { season, episode } = req.query;
    const videoUrl = `https://beta.awstream.net/watch?v=shinchan-8211-season-${season}-8211-episode-${episode}&lang=hin`;
    res.json({ videoUrl, season, episode});
   
});

app.get('/doraemon', (req, res) => {
    const { season, episode } = req.query;
    const videoUrl = `https://beta.awstream.net/watch?v=doraemon-8211-season-${season}-8211-episode-${episode}&lang=hin`;
    res.json({ videoUrl, season, episode});
   
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});