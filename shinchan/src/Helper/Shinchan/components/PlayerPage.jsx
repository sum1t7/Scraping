import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlayerPage.css";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { getSeasonId, getSeasonIdreverse } from "../../../lib/helper/Action";
import NavigationButtons from "./NavigationButtons";
import notAvailableGif from "../../../assest/Shinchan-assests/loading.gif";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

// takes season and episode as props and returns the videoUrl
const PlayerPage = () => {
  const navigate = useNavigate();
  const { season, episode } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!season || !episode || isNaN(season) || isNaN(episode)) {
      navigate("/main");
    }
  }, [season, episode]);

  useEffect(() => {
    if (season && episode) {
      fetchVideoUrl(season, episode);
    }
  }, [season, episode]);

  const fetchVideoUrl = async (season, episode) => {
    setLoading(true);
    setError(null);
    const formattedEpisode = parseInt(episode, 10).toString();
    localStorage.setItem("season", JSON.stringify(season));
    localStorage.setItem("episode", JSON.stringify(episode));
    //This will give you back the Video Url Dumbass
    try {
      const response = await axios.get(
        "https://scraping-blush.vercel.app/video",
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
      setVideoUrl(videoUrl);
    } catch (error) {
      toast.error("Not Available", { duration: 4000 });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="player-container">
        <div className="video-background"></div>
        <div className="background-overlay"></div>

        <div className="player-content">
          {loading ? (
            <>
              <h1 className="loading-text">Please wait</h1>
              <img src={notAvailableGif} alt="loading" className="loading" />
            </>
          ) : (
            <div className="video-wrapper">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  frameBorder="0"
                  className="video-player"
                  width={800}
                  height={500}
                  allowFullScreen
                  allow="accelerometer; autoplay; fullscreen; encrypted-media;  picture-in-picture"
                ></iframe>
              ) : (
                <p className="error-message">No video URL provided</p>
              )}
            </div>
          )}

          <button className="back-button" onClick={() => navigate(`/`)}>
            <IoArrowBack className="back-icon" />
            Back
          </button>
          <h1 className="PreviousWatches">
            Season {season === 0 ? 1 : season} Ep {episode}
          </h1>
          <NavigationButtons season={season} episode={episode} />
        </div>
      </div>
    </>
  );
};

export default PlayerPage;
