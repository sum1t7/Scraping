import React, { useEffect, useState } from "react";
import "../styles/Heart.css";

const Heart = ({ season, episode, name }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const storedLiked = JSON.parse(localStorage.getItem("setliked")) || [];
    setLiked(storedLiked);
   const isItemLiked = storedLiked.some(
  item =>
    Number(item.season) === Number(season) &&
    Number(item.episode) === Number(episode) &&
    item.name === name
);

    setIsLiked(isItemLiked);
  }, [season, episode, name]);

  const handleClick = (e) => {
    e.preventDefault();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    let updatedLiked;
    if (newIsLiked) {
updatedLiked = [...liked, {
  season: Number(season),
  episode: Number(episode),
  name
}];
      if (updatedLiked.length > 10) {
        updatedLiked.shift();
        alert("Max limit reached, likes won't be saved");
      }
    } else {
      updatedLiked = liked.filter(
        item => !(item.season === season && item.episode === episode && item.name === name)
      );
    }

    setLiked(updatedLiked);
    localStorage.setItem("setliked", JSON.stringify(updatedLiked));
  };

  return (
    <div className="heart-container">
      <button
        onClick={handleClick}
        className={`like-button heart ${isLiked ? "liked" : ""}`}
      >
        ❤️
      </button>
    </div>
  );
};

export default Heart;
