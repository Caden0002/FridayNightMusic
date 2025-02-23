import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HeroStudy from "./components/HeroStudy.jsx";
// import HeroFirstNight from "./components/HeroFirstNight.jsx";
import HeroWork from "./components/HeroWork.jsx";
import HeroGina from "./components/HeroGina.jsx";
import HeroGardening from "./components/HeroGardening.jsx";
import HeroNightRide from "./components/HeroNightRide.jsx";
import HeroCafe from "./components/HeroCafe.jsx";
import HeroSpace from "./components/HeroSpace.jsx";
import HeroRain from "./components/HeroRain.jsx";
import HeroSunset from "./components/HeroSunset.jsx";

import ReactGA from "react-ga4";

// Page View Tracking Component (Google Analytics)
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <TrackPageViews />
      <Routes>
        <Route path="/" element={<HeroGina />} />
        <Route path="/study" element={<HeroStudy />} />
        {/* <Route path="/firstnight" element={<HeroFirstNight />} /> */}
        <Route path="/work" element={<HeroWork />} />
        <Route path="/gina" element={<HeroGina />} />
        <Route path="/nightride" element={<HeroNightRide />} />
        <Route path="/gardening" element={<HeroGardening />} />
        <Route path="/cafe" element={<HeroCafe />} />
        <Route path="/space" element={<HeroSpace />} />
        <Route path="/rain" element={<HeroRain />} />
        <Route path="/sunset" element={<HeroSunset />} />
      </Routes>
    </>
  );
}
