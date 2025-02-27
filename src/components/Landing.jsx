import React, { useState, useEffect } from "react";
import LandingLaptop from "./LandingLaptop.jsx";
import LandingMobile from "./LandingMobile.jsx";

function Landing() {
  // For example, if window.innerWidth < 1024, show mobile version.
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <LandingMobile /> : <LandingLaptop />}</>;
}

export default Landing;
