import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home/Hero";
import Nav from "./navbar/Nav";
import Rev from "./review/Rev";
import VideoPlayer from "./Loader";
import Doraemonplayer from "./doraemon";
import { Navigate } from "react-router";
import { useEffect } from "react";

const Rofees = () => {
   
  
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Nav/><Home /><Rev/> </>} />
        <Route path="/shinchan" element={<VideoPlayer/>} />
        <Route path="/doraemon" element={<Doraemonplayer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default Rofees;