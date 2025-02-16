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
import "@videojs/themes/dist/forest/index.css";
import VideoJS from "./Video";
import "videojs-hls-quality-selector";

const CartoonPlayerPage = () => {
  const navigate = useNavigate();
  const {name, season, episode } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  
   
  

  useEffect(() => {
    if (season && episode && name) {
      fetchVideoUrl(name ,season, episode);
      console.log(name, season, episode);
    }
  }, [season, episode]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fluid: true,
    muted: false,
    aspectRatio: "16:9",
    responsive: true,
    preload: "metadata",
    userActions: {
      hotkeys: function (event) {
        return true;
      },
      doubleClick: true,
    },
    html5: {
      vhs: { 
     overrideNative: false,  
     enableLowInitialPlaylist: true,
     bufferWater: 30,  
     maxBufferSize: 20,  
     bandwidth: 2621440,  
     useDevicePixelRatio: true,
     experimentalBufferBasedABR: true,
     bufferCheckInterval: 500,
     backBufferLength: 90
   }},
     
    sources: [
      {
        src: videoUrl,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("keydown", (event) => {
      const key = event.key.toLowerCase();
      const isFullscreen = player.isFullscreen();
      const duration = player.duration();
      const currentTime = player.currentTime();

      const handledKeys = new Set([
        " ",
        "m",
        "f",
        "i",
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
      ]);
      if (handledKeys.has(key)) {
        event.preventDefault();
      }

      switch (key) {
        case " ":  
          player.paused() ? player.play() : player.pause();
          break;

        case "i":  
          if (document.pictureInPictureEnabled && player.tech().el_) {
            if (document.pictureInPictureElement) {
              document.exitPictureInPicture();
            } else {
              player.tech().el_.requestPictureInPicture();
            }
          }
          break;
        case "m":  
          player.muted(!player.muted());
          break;

        case "arrowup": 
          player.volume(Math.min(player.volume() + 0.1, 1));
          break;

        case "arrowdown":  
          player.volume(Math.max(player.volume() - 0.1, 0));
          break;

        case "f": 
          isFullscreen ? player.exitFullscreen() : player.requestFullscreen();
          break;
          
        case "arrowleft":  
          player.currentTime(Math.max(currentTime - 10, 0));
          
          break;

        case "arrowright":  
          player.currentTime(Math.min(currentTime + 10, duration));
          break;
      
      
        }
    });

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.hlsQualitySelector({
      displayCurrentQuality: true,
       });

    player.on('error', function() {
      console.log(player.error());
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const skipForward = () => {
    if (playerRef.current) {
      const player = playerRef.current;
      const currentTime = player.currentTime();
      player.currentTime(currentTime + 10);
    }
  };

  const fetchVideoUrl = async (name , season, episode) => {
    setLoading(true);
    setError(null);
    const formattedEpisode = parseInt(episode, 10).toString();
    
    localStorage.setItem("name", JSON.stringify(name));

    switch (name) {
                 case "pokmon-Indigo-League":
                   localStorage.setItem("season", JSON.stringify(1)); 
                   break;


                case "pokmon-adventures-in-the-orange-islands":
                    localStorage.setItem("season", JSON.stringify(2));
                    break;

                  
                case "pokmon-the-johto-journeys":
                    localStorage.setItem("season", JSON.stringify(3));
                    break;

      
                case "pokmon-johto-league-champions":
                     localStorage.setItem("season", JSON.stringify(4));
                     break;

      
                case "pokmon-Master-Quest":
                  localStorage.setItem("season", JSON.stringify(5));
                   break;

                default:
                localStorage.setItem("season", JSON.stringify(season));

    }
    localStorage.setItem("episode", JSON.stringify(episode));

    try {
      const response = await axios.get(
        "https://scraping-blush.vercel.app/video-test",
        {
          params: {
            name: name,
            season: name.startsWith('pokmon') ? '01' : (season >= 10 ? season : `0${season}`),
            episode:
              formattedEpisode.length === 1
                ? `0${formattedEpisode}`
                : formattedEpisode,
          },
        }
      );
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
                <div style={{ display: "flex" ,justifyContent:"space-between" ,alignItems:"center"}}>

                <button onClick={skipForward} className="skip-button">
              Skip 10 seconds
            </button>
            <NavigationButtons season={season} episode={episode} name={name} />
                </div>

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
               
              <Heart season={season} episode={episode} name={name} />
              <h1 className="PreviousWatches">
                {name} Ep {episode}
              </h1>
            </div>
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

export default CartoonPlayerPage;
export const dynamic = "force-dynamic";