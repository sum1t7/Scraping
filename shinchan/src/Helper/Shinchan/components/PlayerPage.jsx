import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlayerPage.css";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { getSeasonId } from "../../../lib/helper/Action";

const PlayerPage = ({ videoUrl, season, episode }) => {
  return (
    <div className="player-container">
      <div className="video-background"></div>
      <div className="background-overlay"></div>

      <div className="player-content">
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

        <button
          className="back-button"
          onClick={() => window.location.reload()}
        >
          <IoArrowBack className="back-icon" />
          Back
        </button>
        <h1 className="PreviousWatches">
          Season {getSeasonId(season) === 0 ? 1 : getSeasonId(season)}{" "} Ep {episode}
        </h1>
      </div>
    </div>
  );
};

export default PlayerPage;
