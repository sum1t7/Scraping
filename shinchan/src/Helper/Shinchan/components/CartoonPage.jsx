import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartoondetails } from "../../../data/seasons";
import CartoonSeasonPage from "./CartoonSeasonPage";
import EpisodeContainer from "./CartoonEpisode";
import CartoonEpisodePage from "./CartoonEpisode";
import PreviousWatches from "./PreviousWatches";
import CartooonPreviousWatch from "./CartoonPreviousWatch";

const CartoonPage = () => {
  const { name } = useParams();
  const [bgimage, setBgImage] = useState("");
  const [season, setSeason] = useState([]);
  const [seasonNumber, setSeasonNumber] = useState(null);
  const [seasonImage, setSeasonImage] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState(null);
  const [seasonNames, setSeasonNames] = useState(null);
  const watchedEpisodes = {
    name: JSON.parse(localStorage.getItem("name")),
     season: JSON.parse(localStorage.getItem("season")),
    episode: JSON.parse(localStorage.getItem("episode")),} || { name:null, season: null, episode: null };


  useEffect(() => {
    const cartoon = Object.values(cartoondetails).find(
      (cartoon) => cartoon.name.toLowerCase() === name.toLowerCase()
    );
    if (cartoon) {
      setBgImage(cartoon.bgimage);
      setSeason(cartoon.seasons);
      setSeasonImage(cartoon.seasonImage);
      setSeasonNames(cartoon.seasonNames);
    }
  }, [name]);

  const handleSeasonChange = (season) => {
    setSeasonNumber(season);
    console.log(season);
  };
  const handleEpisodeChange = (episode) => {
    setEpisodeNumber(episode);
    console.log(episode);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div
          className="background-container"
          style={{ backgroundImage: `url(${bgimage})` }}
        ></div>
        <div className="content">
          <h1 className="heading">{name}</h1>
          
          <CartoonSeasonPage
            seasons={season}
            onSeasonSelect={handleSeasonChange}
            seasonImage={seasonImage}
          />
          {seasonNumber == null &&
            watchedEpisodes.episode &&
            watchedEpisodes.season && (
              <CartooonPreviousWatch watchedEpisodes={watchedEpisodes} />
            )}
          {seasonNumber != null  && (
            <CartoonEpisodePage
              season={seasonNumber}
              onEpisodeSelect={handleEpisodeChange}
              seasonNames={seasonNames}
              cartoonName={name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartoonPage;
