import React, { useState, useEffect } from "react";
 import { getSeasonId } from "../../../lib/helper/Action";
import "../styles/EpisodeContainer.css";
import { useNavigate } from "react-router-dom";
 import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";
import toast, { Toaster } from "react-hot-toast";
  

//Takes season and returns episode based on selection

const EpisodeContainer = ({
  season,
   onEpisodeSelect,
 }) => {
  const [thumbnail, setThumbnail] = useState([]);
  const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
  
  const navigate = useNavigate();
 
  useEffect(() => {
    setLoading(true);
    season != null
      ? setThumbnail([...Array(52)].map((_, index) => index + 1))
      : setThumbnail([]);
    setLoading(false);
  }, [season]);

  
   

  return (
    <div className="Ep-continent">
      {season != null && !loading && (
        <h1 className="Ep-season-heading">
          Season {getSeasonId(season) === 0 ? 1 : getSeasonId(season)}{" "}
        </h1>
      )}
      <div className="Episode-container">
        {loading ? (
          <>
            <h1 className="loading-text">Please wait</h1>
            <img src={notAvailableGif} alt="loading" className="loading" />
          </>
        ) : (
          thumbnail.map((indx) => {
            return (
              <div
                className="Episode-cards"
                key={indx}
                onClick={() =>{
                  onEpisodeSelect(indx) ; navigate(`/player/${getSeasonId(season)}/${indx}`)
                }
                   }
                
              >
                <Toaster />
 
                <img
                  loading="lazy"
                  src={`https://img.anime-world.in/images/${season}/${
                    indx >= 10 ? indx : `0${indx}`
                  }.webp`}
                  className="Episode-img"
                  alt="thumbnail"
                  onError={(e) => (e.target.style.display = "none")}
                
                />
                <h2 className="Ep-season-text">
                  Season {getSeasonId(season) === 0 ? 1 : getSeasonId(season)}{" "}
                  Ep {indx}
                </h2>

              </div>
            );
          })
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default EpisodeContainer;
export const dynamic = "force-dynamic";