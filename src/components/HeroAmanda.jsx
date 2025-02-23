import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroAmanda(props) {
  // State to hold the window size
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Effect to update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine the object position based on screen size
  const objectPosition = windowSize.width < 540 ? "15% 85%" : "left";

  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background Video */}
      <video
        src="/Amanda/BackgroundAmanda.mp4"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          zIndex: -1,
          objectPosition: objectPosition, // Adjusted position based on screen size
        }}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/Amanda/AudioAmanda.mp3"
        audioTitle="Always With Me (Lo-fi)"
        audioArtist="Shoyo"
        themeColor="#c097cc"
        audioTheme="Amanda"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroAmanda;
