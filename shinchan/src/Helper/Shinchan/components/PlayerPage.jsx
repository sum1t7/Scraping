import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PlayerPage.css";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { toast } from "react-hot-toast";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";
import Heart from "./Heart";
import NavigationButtons from "./NavigationButtons";
import '@videojs/themes/dist/fantasy/index.css';
import VideoJS from "./Video";
import 'videojs-hls-quality-selector';


const PlayerPage = () => {
  const navigate = useNavigate();
  const { season, episode } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!season || !episode || isNaN(season) || isNaN(episode)) {
      navigate("/main");
    }
  }, [season, episode, navigate]);

  useEffect(() => {
    if (season && episode) {
      fetchVideoUrl(season, episode);
    }
  }, [season, episode]);


  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fluid: true,
    muted: false,
   aspectRatio: "16:9",
    responsive: true,
      sources: [
       {
         src: videoUrl,
         type: "application/x-mpegURL",
       },
     ],
   };
 
   const handlePlayerReady = (player) => {
     playerRef.current = player;
 
      player.on('waiting', () => {
       videojs.log('player is waiting');
     });
     player.hlsQualitySelector({
      displayCurrentQuality: true,
  })

     player.on('dispose', () => {
       videojs.log('player will dispose');
     });
   };


  const fetchVideoUrl = async (season, episode) => {
    setLoading(true);
    setError(null);
    const formattedEpisode = parseInt(episode, 10).toString();
    localStorage.setItem("season", JSON.stringify(season));
    localStorage.setItem("episode", JSON.stringify(episode));

    try {
      const response = await axios.get("https://scraping-blush.vercel.app/video", {
        params: {
          season: season >= 10 ? season : `0${season}`,
          episode:
            formattedEpisode.length === 1
              ? `0${formattedEpisode}`
              : formattedEpisode,
        },
      });
      const videoUrl = response.data.proxied;
      setVideoUrl(videoUrl);
      setLoading(false);
    } catch (error) {
      toast.error("Not Available", { duration: 4000 });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="player-container">
      <div className="video-background"></div>
      <div className="background-overlay"></div>
      <div className="player-content">
        {videoUrl && !loading ? (
          <>
          <div className="video-wrapper">
            <div className="video-container">
               <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
          </div>
          
           <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             gap: "10px",
            }}
            >
             <Heart season={season} episode={episode} />
             <h1 className="PreviousWatches">
               Season {season === 0 ? 1 : season} Ep {episode}
             </h1>
           </div>
           <NavigationButtons season={season} episode={episode} />
             </>

          
        ) : (
          <>
            <h1 className="loading-text">Please wait</h1>
            <img src={notAvailableGif} alt="loading" className="loading" />

          </>
          )}
             
        
        <button className="back-button" onClick={() => navigate(`/`)}>
              <IoArrowBack className="back-icon" />
              Back
            </button>
      </div>
      
    </div>
  );
};

 

export default PlayerPage;
