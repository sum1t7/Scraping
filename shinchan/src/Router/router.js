import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Navigate } from "react-router";
 
import CartoonPage from "../Helper/Shinchan/components/CartoonPage";
import Cartoons from "../Helper/Shinchan/components/Cartoons";
import Nostalgia from "../Nostalgia/components/NostalgiaPage";
import CartoonDemoPlayer from "../Helper/Shinchan/components/CartoonDemoPlayer";

const Rofees = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<><Nav/><Home /><Rev/></>} />
        <Route path="/player/:season/:episode" element={<PlayerPage />} />
        <Route path = "/test1" element = {<Test/>}/>
        <Route path="/Just-Shinchan" element={<MainComponent />} />
        */}
        <Route path="/nostalgia" element={<Nostalgia />} />
        <Route path="/:name" element={<CartoonPage />} />
        <Route path="/" element={<Cartoons />} />
        <Route
          path="/cartoon/:name/:season/:episode"
          element={<CartoonDemoPlayer />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Rofees;
