import React from "react";
import axios from "axios";
import { useState } from "react";
import { getSeasonId, getSeasonIdreverse } from "../../../lib/helper/Action";
import "../styles/NavButtons.css";
import toast from "react-hot-toast";

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
      window.scrollTo(0, 0);

      toast("Season Completed", { icon: "🎉" })
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
      window.scrollTo(0, 0);
      toast("Season Completed", { icon: "🎉" })

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
        process.env.REACT_APP_HOSTED_URL,
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
