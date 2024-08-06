import React, { useState } from 'react';
import axios from 'axios';
import './loader.css';
 


const VideoPlayer = () => {
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [NotAvailable, setNotAvailable] = useState(false);


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
  
  let current = episode;
  let currentSeason = season;

  const previous = () =>{
    if(currentSeason == 1 && current < 53){
      setNotAvailable(true);
      current = 2;
      currentSeason = 2;
      setEpisode(current);
      setSeason(currentSeason);
 }
   if (current <= 1) {
    setSeason(--currentSeason);
    current = 53;
    setEpisode(current);
  }
  setNotAvailable(false);
    setEpisode(--current);
    fetchVideoUrl()
}
// seasons upto 15 , episodes upto 52 ,Not working: season 9 , season 10 ,season 11
const next = () =>{
  
  if (current >= 52) {
    setSeason(++currentSeason);
    current = 0;
    setEpisode(current);
  }

  if(currentSeason > 15){
    setNotAvailable(true);
    current = 0;
    currentSeason = 2;
    setEpisode(current);
    setSeason(currentSeason);
  }

  setNotAvailable(false);
  setEpisode(++current);
  fetchVideoUrl();
}

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
    <div>
    <div className='videoplayer InputFields'>
      {loading && <p>Loading...</p>}
      <h1>Season:{season} Episode:{episode}</h1>
      <iframe src={videoUrl}   width={800} height={500} frameborder="0" allowfullscreen allow='fullscreen'>
      </iframe>
    </div>
    
    <div className='change'>
      <button className='change_buttons' onClick={previous} >Previous</button>
      <button className='change_buttons' onClick={next} >Next</button>
    </div>
    {NotAvailable && <p>Not Available</p>}
    </div>
  );
   
}

export default VideoPlayer;
 