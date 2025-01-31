import React from "react";
import axios from "axios";
import { useState } from "react";
import { getSeasonId, getSeasonIdreverse } from "../../../lib/helper/Action";
import "../styles/PreviousWatches.css";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PreviousWatches = ({ watchedEpisodes }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const liked = JSON.parse(localStorage.getItem("setliked")) || [];
  return (
    <div>
      {loading ? (
        <>
          <h1 className="loading-text">Please wait</h1>
          <img src={notAvailableGif} alt="loading" className="loading" />
        </>
      ) : (
        <>
         <div>
          <h1 className="PreviousWatches">Previously Watched</h1>
           <div
            className="Episode-cards"
            onClick={() =>
              navigate(
                `/player/${Number(watchedEpisodes.season)}/${
                  watchedEpisodes.episode
                }`
              )
            }
          >
            <Toaster />
            <img
              loading="lazy"
              src={`https://img.anime-world.in/images/${getSeasonIdreverse(
                Number(watchedEpisodes.season)
              )}/${
                watchedEpisodes.episode >= 10
                  ? watchedEpisodes.episode
                  : `0${watchedEpisodes.episode}`
              }.webp`}
              className="Episode-img"
              alt="thumbnail"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h2 className="Ep-season-text">
              Season {watchedEpisodes.season} Ep {watchedEpisodes.episode}
            </h2>
          </div>
          </div>
          
           <div style={{marginTop: "20px"}}> 
            <h1 className="PreviousWatches">Liked Episodes</h1>
             <div className="Episode-container-liked">
              {liked.map((i, indx) => (
                <div
                  className="Episode-cards"
                  key={indx}
                  onClick={() =>
                    navigate(`/player/${Number(i.season)}/${i.episode}`)
                  }
                >
                  <Toaster />
                  <img
                    loading="lazy"
                    src={`https://img.anime-world.in/images/${getSeasonIdreverse(
                      Number(i.season)
                    )}/${i.episode > 10 ? i.episode : `0${i.episode}`}.webp`}
                    className="Episode-img"
                    alt="thumbnail"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <h2 className="Ep-season-text">
                    Season {i.season} Ep {i.episode}
                  </h2>
                </div>
              ))}
            </div>
          </div>
          </>

       )}
    </div>
  );
};

export default PreviousWatches;
