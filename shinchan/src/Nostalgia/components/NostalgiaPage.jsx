import "../components/NostalgiaPage.css";
import { useState, useRef, useEffect } from 'react';
import vid from "../assets/DoraemonSpace.mp4"
import aud from "../assets/DoraemonSteelTroops.mp3"
import Snow from '../components/Snow';
import TriangleStars from '../components/Stars';

const Nostalgia = () => {
  
 
    const videoSources = [
    vid,
    '../assets/ShinchanBGM.mp4',
  ];
  
  const audioSources = [
    aud,
      
  ];

   const [videoIndex, setVideoIndex] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);

   const videoRef = useRef(null);
  const audioRef = useRef(null);

   const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

   const handleAudioEnded = () => {
    setAudioIndex((prevIndex) => (prevIndex + 1) % audioSources.length);
  };

   useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.error('Error attempting to play video:', err);
      });
    }
  }, [videoIndex]);

   useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.error('Error attempting to play audio:', err);
      });
    }
  }, [audioIndex]);

  return (
    <div>
    <div className="video-container"  >
        <div
          className="background-container"
         ></div>
      <Snow count={300} />
      <TriangleStars/>
      
    </div>
    </div>    
     
  );
}; 
 
export default Nostalgia;
