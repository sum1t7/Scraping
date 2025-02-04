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
import CartoonPage from "../Helper/Shinchan/components/CartoonPage";
import CartoonPlayerPage from "../Helper/Shinchan/components/CartoonPlayer";
import Cartoons from "../Helper/Shinchan/components/Cartoons";
 
const Rofees = () => {
 

  

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<><Nav/><Home /><Rev/></>} /> 
        */}
        <Route
          path="/Just-Shinchan"
          element={<MainComponent />}
        />
         <Route
          path="/:name"
          element={<CartoonPage />}
        />
        <Route
          path="/player/:season/:episode"
          element={<PlayerPage/>}
        />
        <Route path="/" element={<Cartoons/>} />
        <Route path="/cartoon/:name/:season/:episode" element={<CartoonPlayerPage/>}/>
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Rofees;
