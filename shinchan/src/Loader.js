import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import './loader.css';
import FecthThumbnail from './util';
import { SeasonMap } from './seasons';
import notAvailableGif from '../src/assest/loading.gif';
import favaudio from '../src/assest/button-pressed-38129.mp3';
import { useNavigate } from 'react-router-dom';

 
const VideoPlayer = () => {
  
  
  //States & constants ------------------------------
    const navigate = useNavigate();
    const [season, setSeason] = useState('');
    const [episode, setEpisode] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thumbanail, setThumbanail] = useState(null);
    const [isclicked, setisclicked] = useState(false);
    const [showFavList, setShowFavList] = useState(false);
    const [watched, setwatched] = useState(false);
    const [SeasonNotAvailable, setSeasonNotAvailable] = useState(false);
// Local Storage ------------------------------
   const setFavourite = JSON.parse(localStorage.getItem('setFavourite')) || [];
   const faVaudio = new Audio(favaudio);

//Functions ------------------------------    
    const getSeasonId = (seasonNumber) => {
    for (let [key, value] of SeasonMap) {
      if (value === seasonNumber) {
              return key;
          }
      }
      return null;
  };
     
const thumbnailfn = async (seasons) => {
    setLoading(true);
    setError(null); 
    setSeasonNotAvailable(false);
       try {
        console.log("inside thumbnailfn",seasons);
      const data = await FecthThumbnail(seasons);
      setThumbanail(data);
      
    } catch (err) {
      console.error("Error fetching Episodes info:", err);
      setSeasonNotAvailable(true);  
       
      
    } finally {
      setLoading(false);
    }
  }

const selectcard = (data) => {
  console.log("inside selectcard",data);
  thumbnailfn(data);
  setSeason(data);
}

const fetchVideoUrl = async (season ,episode) => {
 setLoading(true);
 setError(null);
 setEpisode(episode);
 setSeason(season);
 console.log("inside fetchurl", episode);

 const formattedEpisode = parseInt(episode, 10).toString();
 try {
   const response = await axios.get('https://shinchan-nine.vercel.app/video', {
     params: {
       season: season >= 10  ? season : `0${season}` ,
       episode: formattedEpisode.length === 1 ? `0${formattedEpisode}` : formattedEpisode,
     }
   });
   setVideoUrl(response.data.videoUrl);
   console.log(response.data.videoUrl);
 } catch (error) {
   setError('Error fetching video URL', error);
 } finally {
   setLoading(false);
 }

 localStorage.setItem('season', JSON.stringify(season));
 localStorage.setItem('episode', JSON.stringify(episode));
};
 
function setFavouriteEp(){
  setFavourite.push({ season, episode });
  localStorage.setItem('setFavourite', JSON.stringify(setFavourite))
  setisclicked(true) ; 
  faVaudio.play();
  //console.log("favourite",favourite);
  //localStorage.setItem('favourite', JSON.stringify(favourite));
}
 
const next = () =>{
   // Increment the episode number
   let newEpisode = parseInt(episode) + 1;
   setEpisode(newEpisode.toString());
   console.log("inside next",newEpisode);
    fetchVideoUrl(season, newEpisode);
   if (newEpisode > 53) {
     // If episode number is greater than 12, go to the next season
     let newSeason = parseInt(season) + 1;
     setSeason(newSeason.toString());
     newEpisode = 1; // Set episode number to 1 for the new season
   fetchVideoUrl(newSeason, newEpisode);}
   if(season === '15' && newEpisode >52 ){
      postMessage("End of the series");
      fetchVideoUrl('2','1');
   }
    
}
 
const previous = () =>{
  let newEpisode = parseInt(episode) - 1;
    setEpisode(newEpisode.toString());
    fetchVideoUrl(season, newEpisode);
  if (newEpisode < 1) {
    let newSeason = parseInt(season) - 1;
    setSeason(newSeason.toString());
    newEpisode = 53; // Set episode number to 1 for the new season
    fetchVideoUrl(newSeason, newEpisode);
  }
  if(season === '1' && newEpisode <1 ){
    postMessage("End of the series");
    fetchVideoUrl('2','1');
  }
}

 

const handleFavClick = () => {
  setShowFavList(!showFavList);

  if(watched){
    setwatched(false);
  }
};
const handlewatched = () => {
 setwatched(!watched);
  if(showFavList){
    setShowFavList(false);
  }
}


const saved_season = JSON.parse(localStorage.getItem('season')) 
const saved_episode = JSON.parse(localStorage.getItem('episode')) 

//Component ------------------------------

return (

  // Interface Component -----------------------------
    videoUrl == '' ?


  //Season Cards 
    <> 
       <h1 className='heading'>Shinchan</h1>
       <div className='Season-container'>
     <div className='input-fields'>
        <input
          type='number'
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder='Season'
        />
        <input
          type='number'
          value={episode}
          onChange={(e) => setEpisode(e.target.value)}
          placeholder='Episode'
        />
      </div>



        <h2 onClick={() => fetchVideoUrl(season, episode)} >Watch ▶️</h2>
         <div class="swipe-container">
         <h2 class="swipe-text">Swipe</h2>
         <h2 class="arrow">&#8594;</h2>
         </div>
   <div className='Slider-container'>
    <div className='Season-cards-container' id="cardContainer"> 
      {SeasonMap && Array.from(SeasonMap).slice(1,13).map(([key,value],indx) => {
          return (
            
            <div className='Season-cards' key={indx}>
            <div onClick={()=>selectcard(value)}>
            <h4>Season {key}</h4>
            </div>
            </div>
          );
        })}
    </div>
    </div>

    <div className='Texts'> 
    <h2 className={`fav ${watched ? 'move-left' : ''}`} title='Previously Watched' onClick={handlewatched}>👌</h2>
    <h2 className={`fav ${showFavList ? 'move-left' : ''}`} onClick={handleFavClick}  title='Favourite'>❤️</h2>
    </div>  

   { watched && (<div className={`fav-list ${watched ? '' : 'none'} `}> <h2>Previously Watched</h2> <h2>Season {saved_season}   Episode {saved_episode}</h2></div>)}
       {showFavList && ( <div className={`fav-list ${showFavList ? '' : 'none'} `}>
          <h2>Favourites</h2>
          {setFavourite && setFavourite.map((data,indx) => {
            return (
              <div key={indx}>
                <h2> Season {data.season}   Episode {data.episode}</h2>
              </div>
            );
          })}
          </div>  
      )} 

       
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>

    
    <filter id="squiggly-0">
      <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
      <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
    </filter>
    <filter id="squiggly-1">
      <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
    </filter>
    
    <filter id="squiggly-2">
      <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
    </filter>
    <filter id="squiggly-3">
      <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
    </filter>
    
    <filter id="squiggly-4">
      <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/>
<feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
    </filter>
  </defs> 
</svg>
    </div>

    {/* Card Component  */}
    <div className='Episode-container'>
     {loading ? (
      <div className='loader'></div>)
     :  SeasonNotAvailable ? (
       <div className='player-frame'>
       <h1>Season not available hehe 😁 , try searching it instead</h1> 
       <img  className='error-gif' src={notAvailableGif} alt="Season not available" />
       </div>
    ) :
     (thumbanail && thumbanail.map((data,indx) => {
          return (
            <div className='Episode-cards' key={indx} onClick={()=>fetchVideoUrl(getSeasonId(season),data.metadata.number)}>  
              <img src={data.metadata.thumbnail} className='Episode-img' alt="thumbnail" />
              
              <h3>{data.metadata.number}</h3>
              </div>
          );
        })
      )}
    {error && <p>{error}</p>}
    </div> 
    </>

    : // VideoPLayer Component -----------------------------

    
    <div>
    {/* Just the VideoPlayer   */}
    <div>
      {loading ? (<p>Loading...</p>)
:
      (<div className='player-frame'>
      <iframe src={videoUrl}   width={800} height={500} frameborder="0" allowfullscreen allow='fullscreen'>
      </iframe>
      <h1>Season: {season}   Episode: {episode}</h1>
      </div>)}
    {/* Buttons for changing the episode */}
    <div className='change'>
      <button className='change_buttons' onClick={previous} >Previous</button>
      <button className='change_buttons' onClick={next} >Next</button>
      <div onClick={setFavouriteEp} title='Favourites' className='fav' disabled={isclicked}>❤️</div>
    </div>
      <div className='fav' onClick={() => navigate(-1)}>🏠</div>
    </div>
    </div>
);
}

export default VideoPlayer;
 