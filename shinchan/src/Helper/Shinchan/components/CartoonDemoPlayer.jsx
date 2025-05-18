import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavigationButtons from "./NavigationButtons";
import Heart from "./Heart";
import "../styles/PlayerPage.css";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import hima from "../../../assest/Shinchan-assests/loading.gif";

const CartoonDemoPlayer = () => {
  const { name, season, episode } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideoUrl(name, season, episode);
  }, [name, season, episode]);

  const fetchVideoUrl = async (name, season, episode) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://scraping-blush.vercel.app/api/${name}/${season}/${episode}`
      );
      if (response.status === 200) {
        setVideoUrl(response.data.iframeSrc);
      } else {
        setError("Video URL not found");
      }
    } catch (error) {
      setError("Failed to fetch video URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      { 
        <div className="player-container">
          <div className="video-background"></div>
          <div className="background-overlay"></div>
          <div className="player-content">
            {videoUrl && (
              <>
                {loading ? (
                  <>
                  <div
                    className="loading-div"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                        width: "100%",
                        
                        height: "100%",
                       
                       position: "absolute",                       
                    }}
                  >
                    <img
                      src={hima}
                      alt="Loading..."
                      style={{ width: "120px", marginBottom: "16px" ,   zIndex: 1}}
                    />
                    <span style={{ fontSize: "1.2rem", color: "#555" ,  zIndex: 1}}> 
                      Please wait a moment...
                    </span>
                    </div>
                     <iframe
                    src={videoUrl}
                    title="Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "720px",
                      borderRadius: "10px",
                      backgroundColor: "black",
                      position: "relative"
                     }}
                    loading="lazy"
                  ></iframe>
                  </>
                  
                ) : (
                  <iframe
                    src={videoUrl}
                    title="Video Player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "720px",
                      borderRadius: "10px",
                      backgroundColor: "black",
                    }}
                    loading="lazy"
                  ></iframe>
                )}
                <div className="video-wrapper">
                  <div className="video-container">
                    <NavigationButtons
                      season={season}
                      episode={episode}
                      name={name}
                    />
                  </div>
                </div>
              </>
            )}

            <button
              className="back-button"
              onClick={() => navigate(`/${name}`)}
            >
              <IoArrowBack className="back-icon" />
              Back
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default CartoonDemoPlayer;
