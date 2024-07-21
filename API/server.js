import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
 
  
app.use(cors({
    origin: 'https://laughing-broccoli-r4g9w55j9j6jcprj4-3001.app.github.dev'
}));


app.get('/video/:season&:episode', (req, res) => {
    const { season, episode } = req.params;
    const videoUrl = `https://beta.awstream.net/watch?v=shinchan-8211-season-${season}-8211-episode-${episode}&lang=hin`;
    res.json({ videoUrl, season, episode});
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});