import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Navigate } from "react-router";
import MainComponent from "../Helper/Shinchan/Main";
import PlayerPage from "../Helper/Shinchan/components/PlayerPage";
import LivePlayer from "../Helper/Shinchan/components/test";

const Rofees = () => {
 

  

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<><Nav/><Home /><Rev/></>} /> */}
        <Route
          path="/"
          element={<MainComponent />}
        />
        <Route
          path="/player/:season/:episode"
          element={<PlayerPage />}
        />
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Rofees;
