import { useState, useRef, useEffect } from "react";
import { cartoondetails, SeasonMap } from "../../../data/seasons";
import { useNavigate } from "react-router-dom"; 

import Snow from "../../../Nostalgia/components/Snow";
import "../styles/SeasonScroll.css";
import "../styles/Main.css";
import "../styles/Cartoon.css"
import "../styles/homepage.css";


const Cartoons = () => { 
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const watchedEpisodes = {
    name: JSON.parse(localStorage.getItem("name")),
    season: JSON.parse(localStorage.getItem("season")),
    episode: JSON.parse(localStorage.getItem("episode")),
  } || { name: null, season: null, episode: null };

  

   
 

  return (
    <div className="app-container">
      <div className="content-container">
        <Snow count={100} />

        <div
          className="  container"
          ref={scrollRef}
          id="cardContainer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Object.entries(cartoondetails).map(([key, cartoon]) => (
            <div key={key}>
              <div
                className={`poster`}
                style={{ backgroundImage: `url(${cartoon.image})` }}
                onClick={() => {
                  navigate(`/${cartoon.name}`);
                }}
                role="button"
                tabIndex={0}
              >
                <h1 className="names">{cartoon.name}</h1>
              </div>
            </div>
          ))}
        </div>
      
      <h1
        style={{
          color: "yellow",
          marginBottom: "0px",
          marginTop: "10px",
         }}
        className="title"
        >
        Shinzo
      </h1>
      <p style={{ color: "grey", marginTop: "0px", fontSize: "20px" }}>
        No ads , No interruption to Nostalgia
      </p>

        </div>
    </div>
  );
};

export default Cartoons;
export const dynamic = "force-dynamic";
