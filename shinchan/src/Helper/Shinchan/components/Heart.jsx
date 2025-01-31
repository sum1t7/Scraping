 import { HeartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import '../styles/Heart.css';

const Heart = ({ season, episode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
     const storedLiked = JSON.parse(localStorage.getItem("setliked")) || [];
    setLiked(storedLiked);

     const isItemLiked = storedLiked.some(item => item.season === season && item.episode === episode);
    setIsLiked(isItemLiked);
  }, [season, episode]);

  const handleClick = (e) => {
    e.preventDefault();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    let updatedLiked;
    if (newIsLiked) {
       updatedLiked = [...liked, { season, episode }];
    } else {
       updatedLiked = liked.filter(item => !(item.season === season && item.episode === episode));
    }

    setLiked(updatedLiked);
    localStorage.setItem("setliked", JSON.stringify(updatedLiked));
  };

  useEffect(() => {
     localStorage.setItem("setliked", JSON.stringify(liked));
  }, [liked]);

  return (
    <button onClick={handleClick} className="like-button">
      <HeartIcon
        fill={`${isLiked ? "red" : "transparent"}`}
        style={{ strokeWidth: 1,  width: "6vw", height: "6vw" }}
        />
    </button>
  );
};

export default Heart;