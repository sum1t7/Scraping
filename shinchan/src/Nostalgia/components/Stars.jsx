import React, { CSSProperties, useState } from 'react';
import aud from "../assets/DoraemonSteelTroops.mp3"


const TriangleStars = () => {
   const containerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    pointerEvents: 'none',
    zIndex: 1000,
  };

  const starStyle = (delay) => ({
    position: 'absolute',
    fontSize: '48px',
    color: 'gold',
    opacity: 0,
    animation: `appear 20s ease-out ${delay}s forwards`,
    filter: 'drop-shadow(0 0 4px rgba(255, 223, 0, 0.5))',
  });

   


  const positions = [
    { top: '0%', left: '50%' },    // Top star
    { top: '80%', left: '20%' },   // Bottom left star
    { top: '80%', left: '80%' },   // Bottom right star
  ];

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes appear {
            0% {
              opacity: 0;
             }
            50% {
              opacity: 0;
             }
            100% {
              opacity: 1;
             }
          }
        `}
        {
          `@keyframes gone{
            0% {
            top: 0%;
            bottom: 0%;
              opacity: 1;
             }
            50% {
            top: 30%;
            bottom: 30%;
              opacity: 1;
             }
            100% {
            top: 100%;
            bottom: 100%;
              opacity: 0;
             }
          }`
        }
      </style>
      {positions.map((pos, index) => (
        <div
          key={index}
          style={{
            ...starStyle(index==2 ?  index*12 : index*10),
            ...pos,
          }} 
        >
          ★
        </div>
      ))}
        <audio
         autoPlay
        >
        <source src={aud} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
 
    </div>
  );
};

export default TriangleStars;