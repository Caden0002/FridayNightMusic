import React, { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroSunset(props) {
  // State to track window size
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

  // Determine object position based on screen size
  const objectPosition = windowSize.width < 540 ? "35% 65%" : "bottom left";

  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/Sunset/BackgroundSunset.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1, objectPosition: objectPosition }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/Sunset/AudioSunset.mp3"
        audioTitle="Deja Vu"
        audioArtist="Purrple Cat"
        themeColor="#ef9068"
        audioTheme="Sunset Mellow"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroSunset;

// https://www.reddit.com/r/animation/comments/15tidqj/pixel_art_animated_scene_i_created_and_titled/
// https://www.youtube.com/watch?v=0IumeJT5HIA
