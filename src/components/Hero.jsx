import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";
import { themes } from "./theme.js"; // Import the themes

function Hero() {
  const { themeName } = useParams();
  // Use the themeName directly (assuming URL is case-sensitive)
  const theme = themes[themeName];

  if (!theme) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        <p>404 - Theme Not Found</p>
      </div>
    );
  }

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const objectPosition =
    windowSize < 540 ? theme.objectPositionSm : theme.objectPositionLg;

  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background Video or Image */}
      {theme.bgVideo ? (
        <video
          src={theme.bgVideo}
          alt={`${themeName} Background`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: -1, objectPosition }}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={theme.bgImage}
          alt={`${themeName} Background`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: -1, objectPosition }}
        />
      )}

      {/* Audio Player */}
      <AudioPlayer
        audioSrc={theme.audioSrc}
        audioTitle={theme.audioTitle}
        audioArtist={theme.audioArtist}
        themeColor={theme.themeColor}
        audioTheme={theme.audioTheme}
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default Hero;
