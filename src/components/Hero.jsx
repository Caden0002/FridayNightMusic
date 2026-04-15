import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";
import { themes } from "./theme.js"; // Import the themes

function Hero() {
  const { themeName } = useParams();
  const theme = themes[themeName];

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isAudioMetaLoaded, setIsAudioMetaLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    const previous = {
      htmlOverflow: htmlEl.style.overflow,
      bodyOverflow: bodyEl.style.overflow,
      htmlOverscroll: htmlEl.style.overscrollBehavior,
      bodyOverscroll: bodyEl.style.overscrollBehavior,
    };

    const applyLockState = () => {
      if (media.matches) {
        htmlEl.style.overflow = "hidden";
        bodyEl.style.overflow = "hidden";
        htmlEl.style.overscrollBehavior = "none";
        bodyEl.style.overscrollBehavior = "none";
      } else {
        htmlEl.style.overflow = previous.htmlOverflow;
        bodyEl.style.overflow = previous.bodyOverflow;
        htmlEl.style.overscrollBehavior = previous.htmlOverscroll;
        bodyEl.style.overscrollBehavior = previous.bodyOverscroll;
      }
    };

    applyLockState();
    media.addEventListener("change", applyLockState);

    return () => {
      media.removeEventListener("change", applyLockState);
      htmlEl.style.overflow = previous.htmlOverflow;
      bodyEl.style.overflow = previous.bodyOverflow;
      htmlEl.style.overscrollBehavior = previous.htmlOverscroll;
      bodyEl.style.overscrollBehavior = previous.bodyOverscroll;
    };
  }, []);

  useEffect(() => {
    if (!theme) return undefined;

    let isMounted = true;
    setIsBgLoaded(false);
    setIsAudioMetaLoaded(false);

    const image = new Image();
    image.onload = () => {
      if (isMounted) setIsBgLoaded(true);
    };
    image.onerror = () => {
      if (isMounted) setIsBgLoaded(true);
    };
    image.src = theme.bgImage;

    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      if (isMounted) setIsAudioMetaLoaded(true);
    };
    audio.onerror = () => {
      if (isMounted) setIsAudioMetaLoaded(true);
    };
    audio.src = theme.audioSrc;

    return () => {
      isMounted = false;
    };
  }, [theme]);

  if (!theme) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        <p>404 - Theme Not Found</p>
      </div>
    );
  }

  const objectPosition =
    windowSize < 540 ? theme.objectPositionSm : theme.objectPositionLg;
  const isThemeReady = isBgLoaded && isAudioMetaLoaded;

  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background image is preloaded for this specific theme */}
      <img
        src={theme.bgImage}
        alt={`${themeName} Background`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isBgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ zIndex: -1, objectPosition }}
      />

      {!isThemeReady && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/25 z-50">
          <div className="w-12 h-12 border-4 border-t-[#fecc59] border-gray-300 rounded-full animate-spin" />
        </div>
      )}

      {isThemeReady && (
        <>
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
        </>
      )}
    </div>
  );
}

export default Hero;
