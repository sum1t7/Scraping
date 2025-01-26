import React from "react";
import axios from "axios";
import { useState } from "react";
import { getSeasonIdreverse } from "../../../lib/helper/Action";
import "../styles/PreviousWatches.css";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";

const PreviousWatches = ({ watchedEpisodes, onVideoUrlChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideoUrl = async (season, episode) => {
    setLoading(true);
    setError(null);
    console.log("inside fetchurl", episode, season, getSeasonIdreverse(season));
    const formattedEpisode = parseInt(episode, 10).toString();

    try {
      const response = await axios.get("https://shinchan-nine.vercel.app/video", {
        params: {
          season: season >= 10 ? season : `0${season}`,
          episode:
            formattedEpisode.length === 1
              ? `0${formattedEpisode}`
              : formattedEpisode,
        },
      });
      const videoUrl = response.data.videoUrl;
      onVideoUrlChange(videoUrl);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleclick = () => {
    fetchVideoUrl(watchedEpisodes.season, watchedEpisodes.episode);
    console.log(
      "inside previous",
      watchedEpisodes.episode,
      watchedEpisodes.season
    );
  };
  return (
    <div>
      {loading ? (
        <>
          <h1 className="loading-text">Please wait</h1>
          <img src={notAvailableGif} alt="loading" className="loading" />
        </>
      ) : (
        <div>
          <h1 className="PreviousWatches">Previously Watched</h1>

          <div className="Episode-cards" onClick={() => handleclick()}>
            <img
              loading="lazy"
              src={`https://img.anime-world.in/images/${getSeasonIdreverse(
                watchedEpisodes.season
              )}/${
                watchedEpisodes.episode > 10
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
      )}
    </div>
  );
};

export default PreviousWatches;
