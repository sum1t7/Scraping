import React from "react";
import axios from "axios";
import { useState } from "react";
import { getSeasonId, getSeasonIdreverse } from "../../../lib/helper/Action";
import "../styles/NavButtons.css";

const NavigationButtons = ({
  season,
  episode,
  onEpisodeSelect,
  onVideoUrlChange,
  onSeasonSelect,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [nextEpisode, setNextEpisode] = useState(null);

  const next = () => {
    if (!episode || !season) {
      window.location.reload();
    }

    let newEpisode = parseInt(episode) + 1;
    onEpisodeSelect(newEpisode.toString());
    console.log("inside next", newEpisode);
    fetchVideoUrl(getSeasonId(season), newEpisode);

    if (newEpisode > 53) {
      window.location.reload();
    }
  };

  const previous = () => {
    if (!episode || !season) {
      window.location.reload();
    }

    let newEpisode = parseInt(episode) - 1;
    onEpisodeSelect(newEpisode.toString());
    setNextEpisode(newEpisode.toString());
    fetchVideoUrl(getSeasonId(season), newEpisode);
    if (newEpisode < 1) {
      window.location.reload();
    }
  };

  const fetchVideoUrl = async (season, episode) => {
    setLoading(true);
    setError(null);
    console.log("inside fetchurl", episode, season, getSeasonId(season));
    const formattedEpisode = parseInt(episode, 10).toString();

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
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <h1 className="loading-text">Please wait</h1>
        </div>
      ) : (
        <div className="change">
          <h2 className="Nav-Buttons" onClick={previous}>
            ⏮️
          </h2>
          <h2 className="Nav-Buttons" onClick={next}>
            ⏭️
          </h2>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
