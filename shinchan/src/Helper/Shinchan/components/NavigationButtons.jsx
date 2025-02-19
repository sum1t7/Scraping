import React from "react";
   import "../styles/NavButtons.css";
   import { IoPlaySkipBack } from "react-icons/io5";
   import { IoPlaySkipForward } from "react-icons/io5";
   import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NavigationButtons = ({ season, episode , name}) => {
  const navigate = useNavigate();

  const next = () => {
    let newEpisode = parseInt(episode) + 1;

    if (!episode || !season) {
      navigate("/");
    } else if (newEpisode > 52) {
      window.scrollTo(0, 0);
      localStorage.setItem("episode", JSON.stringify(newEpisode - 1));
      navigate("/");
      toast("Season Completed", { icon: "🎉", duration: 4000,position: 'top-center' , style: { backgroundColor: '#333', color: '#fff',  fontSize:'20px' } });
    } else {
       navigate(`/cartoon/${name}/${season}/${newEpisode}`);
    }
  };

  const previous = () => {
    let newEpisode = parseInt(episode) - 1;

    if (!episode || !season) {
      navigate("/");
    } else if (newEpisode < 1) {
      window.scrollTo(0, 0);
      localStorage.setItem("episode", JSON.stringify(newEpisode + 1));
      setTimeout(() => {
        navigate("/");
      }, 2000);
      toast("Season Completed", { icon: "🎉", duration: 3000 , position: 'top-center', style: { backgroundColor: '#333', color: '#fff',  fontSize:'20px' } });
    } else {
       navigate(`/cartoon/${name}/${season}/${newEpisode}`);
    }
  };

  return (
    <div>
      <div className="change">
        <h2 className="Nav-Buttons" onClick={previous}>
          <Toaster />
          <IoPlaySkipBack style={{color:'yellow'}}/>
          </h2>
        <h2 className="Nav-Buttons" onClick={next}>
          <Toaster />
          <IoPlaySkipForward style={{color:'yellow'}} />
          </h2>
      </div>
    </div>
  );
};

export default NavigationButtons;
export const dynamic = "force-dynamic";