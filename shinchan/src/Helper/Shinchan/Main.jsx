import React, { useEffect, useState } from "react";
import SeasonScroll from "./components/SeasonScroll";
import EpisodeContainer from "./components/EpisodeContainer";
import notAvailableGif from "../../assest/Shinchan-assests/loading.gif";
import PlayerPage from "./components/PlayerPage";
import "./styles/Main.css";
import bgimage from "../../assest/Shinchan-assests/shinchan.jpg";
import PreviousWatches from "./components/PreviousWatches";
import NavigationButtons from "./components/NavigationButtons";

const MainComponent = () => {
  const [season, setSeason] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const watchedEpisodes = { season: JSON.parse(localStorage.getItem("season")),
  episode: JSON.parse(localStorage.getItem("episode")),} || { season: null, episode: null };
 
  
  const handleEpisodeSelect = (selectedEpisode) => {
    setEpisode(selectedEpisode);
  };
  
  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
    setLoading(false);
  };

  const handleSeasonSelect = (selectedSeason) => {
    setLoading(true);
    setSeason(selectedSeason);
    setEpisode(null);
    setVideoUrl("");
    setLoading(false);
  };
  
  

   

  return (
    <div className="app-container">
      {videoUrl === "" ? (
        <div className="content-wrapper">
          <div
            className="background-container"
            style={{ backgroundImage: `url(${bgimage})` }}
          ></div>
          <div className="content">
            <h1 className="heading">Shinchan </h1>
            <SeasonScroll onSeasonSelect={handleSeasonSelect} />
            {season == null && watchedEpisodes.episode && watchedEpisodes.season && (
              <PreviousWatches
                watchedEpisodes={watchedEpisodes}
                onVideoUrlChange={handleVideoUrlChange}
                onSeasonSelect={handleSeasonSelect}
                onEpisodeSelect={handleEpisodeSelect}
                
              />
            )}
            {season != null &&  !loading && (
              <EpisodeContainer
                season={season}
                episode={episode}
                onEpisodeSelect={handleEpisodeSelect}
                onVideoUrlChange={handleVideoUrlChange}
               />
            )}
          </div>
        </div>
      ) : (
        <>
        <PlayerPage videoUrl={videoUrl} season={season} episode={episode} />
        <NavigationButtons 
                season={season}
                episode={episode}
                onSeasonSelect={handleSeasonSelect}
                onEpisodeSelect={handleEpisodeSelect}
                onVideoUrlChange={handleVideoUrlChange}/>
        </>
      )}
    </div>
  );
};

export default MainComponent;
