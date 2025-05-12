import React, { useCallback, useState } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Heart from "./Heart";
import "../styles/NavButtons.css";

const NavigationButtons = ({ season, episode, name }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const isValidInput = useCallback(() => {
    if (!episode || !season || !name) {
      toast.error("Missing episode or season information", {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#333", color: "#fff", fontSize: "18px" }
      });
      navigate("/");
      return false;
    }
    return true;
  }, [episode, season, name, navigate]);

  const addToWatchHistory = useCallback(() => {
    const watched = JSON.parse(localStorage.getItem("watchedEpisodes")) || [];
    const current = {
      season: Number(season),
      episode: Number(episode),
      name
    };

    const isDuplicate = watched.some(
      item =>
        item.season === current.season &&
        item.episode === current.episode &&
        item.name === current.name
    );

    if (!isDuplicate) {
      const updated = [...watched, current];
      localStorage.setItem("watchedEpisodes", JSON.stringify(updated));
    }
  }, [season, episode, name]);

  const handleSeasonComplete = useCallback(() => {
    window.scrollTo(0, 0);
    localStorage.setItem("episode", JSON.stringify(parseInt(episode)));

    toast.success("Season Completed", {
      icon: "🎉",
      duration: 4000,
      position: "top-center",
      style: { backgroundColor: "#333", color: "#fff", fontSize: "20px" }
    });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [episode, navigate]);

  const navigateToEpisode = useCallback(
    (newEpisode) => {
      setIsLoading(true);
      navigate(`/cartoon/${name}/${season}/${newEpisode}`);
      setTimeout(() => setIsLoading(false), 300);
    },
    [name, season, navigate]
  );

  const handleNext = () => {
    if (!isValidInput()) return;

    addToWatchHistory(); // log current before navigating
    const newEpisode = parseInt(episode) + 1;

    if (newEpisode > 52) {
      handleSeasonComplete();
    } else {
      navigateToEpisode(newEpisode);
    }
  };

  const handlePrevious = () => {
    if (!isValidInput()) return;

    addToWatchHistory(); // log current before navigating
    const newEpisode = parseInt(episode) - 1;

    if (newEpisode < 1) {
      handleSeasonComplete();
    } else {
      navigateToEpisode(newEpisode);
    }
  };

  return (
    <div className="navigation-container">
      <Toaster />

      <div className="navigation-controls">
        <button
          className={`nav-button ${isLoading ? "disabled" : ""}`}
          onClick={handlePrevious}
          disabled={isLoading}
          aria-label="Previous episode"
          title={`Go to episode ${parseInt(episode) - 1}`}
        >
          <IoPlaySkipBack className="nav-icon" style={{ color: "yellow" }} />
          <span className="nav-text">Previous</span>
        </button>

        <div className="episode-indicator">
          <span>
            S{season} E{episode}
          </span>
        </div>

        <button
          className={`nav-button ${isLoading ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={isLoading}
          aria-label="Next episode"
          title={`Go to episode ${parseInt(episode) + 1}`}
        >
          <span className="nav-text">Next</span>
          <IoPlaySkipForward className="nav-icon" style={{ color: "yellow" }} />
        </button>

        <Heart season={season} episode={episode} name={name} />
      </div>
    </div>
  );
};

export default NavigationButtons;
export const dynamic = "force-dynamic";
