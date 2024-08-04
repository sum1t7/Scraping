import React, { useState } from 'react';
import axios from 'axios';
import './loader.css';
 


const VideoPlayer = () => {
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



const fetchVideoUrl = () => {
    setLoading(true);
    setError(null);

    axios.get('https://shinchan-nine.vercel.app/video', {
      params: {
        season: season >= 10 ? season : `0${season}`,
        episode: episode >= 10 ? episode : `0${episode}`
      }
    })
      .then(response => {
        setVideoUrl(response.data.videoUrl);
        setLoading(false);
        console.log(response.data.videoUrl);
      })
      .catch(error => {
        setError('Error fetching video URL');
        setLoading(false);
      });
  };

 

  return (
    videoUrl == '' ? <div className='InputFields'>
      <input 
        type="number"
        value={season}
        onChange={e => setSeason(e.target.value)}
        placeholder="Season"
      />

      <input
        type="number"
        value={episode}
        onChange={e => setEpisode(e.target.value)}
        placeholder="Episode"
      />

      <button onClick={fetchVideoUrl}>Watch</button>
       
      
      {error && <p>{error}</p>}

      
    
    </div> 
    
    :
    <div className='videoplayer InputFields'>
      
      {loading && <p>Loading...</p>}
      <h1>Season:{season} Episode:{episode}</h1>
      <iframe src={videoUrl}   width={800} height={500} frameborder="0" allowfullscreen allow='fullscreen'>
      </iframe>

    </div>
  );
   
}
    
export default VideoPlayer;
 