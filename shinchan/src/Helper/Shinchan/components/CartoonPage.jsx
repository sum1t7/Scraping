import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { cartoondetails } from "../../../data/seasons";
import CartoonSeasonPage from "./CartoonSeasonPage";
 import CartoonEpisodePage from "./CartoonEpisode";
 import CartooonPreviousWatch from "./CartoonPreviousWatch";  
import Snow from "../../../Nostalgia/components/Snow";

import backGif from '../../../assest/Cartoons/Background/BackGIF.gif';

const CartoonPage = () => {
  const { name } = useParams();
  const [bgimage, setBgImage] = useState("");
  const [season, setSeason] = useState([]);
  const [seasonNumber, setSeasonNumber] = useState(null);
  const [seasonImage, setSeasonImage] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState(null);
  const [seasonNames, setSeasonNames] = useState(null);
  const [mute, setmute] = useState(false);
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
    <div className="app-container fade">
       <div className="content-wrapper">

      <img src={backGif} style={{ position: "fixed", right: 0, bottom: 0, minWidth: "100%", minHeight: "100%", zIndex: -1, }}
   preload="metadata"/ >
  
           
          
          <Snow count={100}/>
        <div className="content">
          <button style={{ background: "transparent", border: "none" }} title="mute" onClick={() => setmute(!mute)}>
          <h1 className="heading">{name}
          </h1>
          </button>
          
           
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
export const dynamic = "force-dynamic";