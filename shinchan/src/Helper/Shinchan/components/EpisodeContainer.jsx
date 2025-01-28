import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSeasonId } from "../../../lib/helper/Action";
import "../styles/EpisodeContainer.css";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";
 
const EpisodeContainer = ({
  season,
  episode,
  onEpisodeSelect,
  onVideoUrlChange,
}) => {
  const [thumbnail, setThumbnail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    season != null
      ? setThumbnail([...Array(52)].map((_, index) => index + 1))
      : setThumbnail([]);
    setLoading(false);
  }, [season]);

  const fetchVideoUrl = async (season, episode) => {
    setLoading(true);
    setError(null);
    onEpisodeSelect(episode);
    console.log("inside fetchurl", episode);
    const formattedEpisode = parseInt(episode, 10).toString();
    localStorage.setItem("season", JSON.stringify(season));
    localStorage.setItem("episode", JSON.stringify(episode));

    //This will give you back the Video Url Dumbass
    try {
      const response = await axios.get(
        "https://shinchan-nine.vercel.app/video",
        {
          params: {
            season: season >= 10 ? season : `0${season}`,
            episode:
              formattedEpisode.length === 1
                ? `0${formattedEpisode}`
                : formattedEpisode,
          },
        }
      );
      const videoUrl = response.data.videoUrl;
      onVideoUrlChange(videoUrl);
    } catch (error) {
      window.location.reload();
      alert("Not Available")
     } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Ep-continent">
      {season != null && !loading && (
        <h1 className="Ep-season-heading">Season {getSeasonId(season) === 0 ? 1 : getSeasonId(season)}{" "}</h1>
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
                onClick={() =>
                  fetchVideoUrl(
                    getSeasonId(season) === 0 ? 1 : getSeasonId(season),
                    indx
                  )
                }
              >
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
