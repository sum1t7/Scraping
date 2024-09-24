import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import './loader.css';

 


const Doraemonplayer = () => {
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [NotAvailable, setNotAvailable] = useState(false);
    
    let current = +episode;
    let currentSeason = +season;


    // save the season and episode to local storage
   const saved_season = JSON.parse(localStorage.getItem('season'))
   const saved_episode = JSON.parse(localStorage.getItem('episode'))  
   console.log("outside all" ,episode ,current)  ;


  
  

const fetchVideoUrl = () => {
    setLoading(true);
    setError(null);
    console.log("inside fetchurl" ,episode);
    axios.get('https://reimagined-rotary-phone-q7qr655wwqx6295gj-3000.app.github.dev/doraemon', {
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

    localStorage.setItem('season', JSON.stringify(season));
    localStorage.setItem('episode', JSON.stringify(episode));
  };
  


const previous = () =>{
     setEpisode(previous => +previous - 1);
    console.log("current previous" , current);
    console.log("inside previous ",episode);
    fetchVideoUrl();
    
    if(currentSeason == 1 && current < 53){
      setNotAvailable(true);
      current = 1;
      currentSeason = 2;
      setEpisode(current);
      setSeason(currentSeason);
      fetchVideoUrl()
    }
   else if (current < 1) {
    setSeason(previous => +previous - 1);
    current = 52;
    setEpisode(current);
    fetchVideoUrl()
  }
}
// seasons upto 15 , episodes upto 52 ,Not working: season 9 , season 10 ,season 11
const next = () =>{
  
  setEpisode(previous => +previous + 1);
  console.log("current inside next" , current);
  console.log("inside next",episode);
  fetchVideoUrl();
  
  
  setNotAvailable(false);  
  if (current > 52) {
    setSeason(previous => +previous + 1);
    current = 1;
    setEpisode(current);
    fetchVideoUrl();  
  }
  if(currentSeason > 15){
    setNotAvailable(true);
    current = 1;
    currentSeason = 2;
    setEpisode(current);
    setSeason(currentSeason);
    fetchVideoUrl();
  } 
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
      <h1>Previously Watched</h1>
        <h2>Season: {saved_season}   Episode: {saved_episode}</h2>
         
      
      {error && <p>{error}</p>}
      
      
    
    </div> 
    
    :
    <div>
    <div className='videoplayer InputFields'>
      {loading && <p>Loading...</p>}
      <iframe src={videoUrl}   width={800} height={500} frameborder="0" allowfullscreen allow='fullscreen'>
      </iframe>
      <h2>Season: {saved_season}   Episode: {saved_episode}</h2>
    </div>
    
    <div className='change'>
      <button className='change_buttons' onClick={previous} >Previous</button>
      <button className='change_buttons' onClick={next} >Next</button>
    </div>
    {NotAvailable && <p>That Season Not Available wath this instead heehe</p>}
    </div>
  );
   
}

export default Doraemonplayer;
 