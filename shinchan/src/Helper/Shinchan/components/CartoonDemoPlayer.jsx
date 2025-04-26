import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


import "../styles/PlayerPage.css";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios"; 
 import hima from "../../../assest/Shinchan-assests/loading.gif";

const CartoonDemoPlayer = () => {
const { name, season, episode } = useParams();
const [videoUrl, setVideoUrl] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();

useEffect(() => {   
    fetchVideoUrl(name, season, episode);
}, [name, season, episode]);



const fetchVideoUrl = async (name, season, episode) => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get(`https://scraping-blush.vercel.app/api/${name}/${season}/${episode}`);
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
}



    return (
        <div className="player-container">
          <div className="video-background"></div>
          <div className="background-overlay"></div>
          <div className="player-content">
            
            {
              videoUrl && 
              (<>
                  <a
                    href={videoUrl}
                    className="clickme"
                    
                    >
                  <img src={hima} style={{borderRadius:"20px",  fontfamily: "Amatic SC" , width:"45vh" , height:"40vh"}}   />
                  </a>             
                  
                  
                     {/* <div className="video-wrapper">
                  <div className="video-container">
                  
                  
                  <NavigationButtons
                  season={season}
                  episode={episode}
                  name={name}
                  />
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
                    </div>
                    <p
                    style={{ color: "yellow", textAlign: "center", fontSize: "30px" }}
                    >
                    {name}
                    </p> */}

              </>)
             
            }
    
            <button className="back-button" onClick={() => navigate(-1)}>
              <IoArrowBack className="back-icon" />
              Back
            </button>
          </div>
           
        </div>
        )
}

export default CartoonDemoPlayer