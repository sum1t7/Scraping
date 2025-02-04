 import React, { useEffect, useState } from "react";
import '../styles/Heart.css';
import HeartIcon from './HeartIcon'

const Heart = ({ season, episode , name }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
     const storedLiked = JSON.parse(localStorage.getItem("setliked")) || [];
    setLiked(storedLiked);
     const isItemLiked = storedLiked.some(item => item.season === season && item.episode === episode && item.name === name);
    setIsLiked(isItemLiked); 
  }, [season, episode]);

  const handleClick = (e) => {
    e.preventDefault();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    let updatedLiked;
    if (newIsLiked) {
      updatedLiked = [...liked, { season, episode, name }];
       if (updatedLiked.length > 10) {
        updatedLiked.shift();  
        alert("Max limit reached, likes wont be saved");
      }
    } else {
       updatedLiked = liked.filter(item => !(item.season === season && item.episode === episode && item.name === name));
    }

    setLiked(updatedLiked);
    localStorage.setItem("setliked", JSON.stringify(updatedLiked));
  };

  useEffect(() => {
    
     localStorage.setItem("setliked", JSON.stringify(liked));
  }, [liked]);



  return (
    <div className="heart-container">

    <button onClick={handleClick} className={`like-button heart ${isLiked ? "liked" : ""}`}>
      <HeartIcon
      size={40}
        fill={`${isLiked ? "red" : "transparent"}`}
        className="heart-icon"
        absoluteStrokeWidth={true}

 />
    </button>
        </div>
  );
};

export default Heart;