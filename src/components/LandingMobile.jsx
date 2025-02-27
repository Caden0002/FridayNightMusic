import React, { useEffect, useState } from "react";
import AudioPlayerLanding from "./AudioPlayerLanding.jsx"; // Import the AudioPlayer component
import image from "/LandingBackground.gif";
import home from "/LandingHomeButton.svg";
import share from "/LandingShareButton.svg";
import arrow from "/LandingArrowButton.svg";
import github from "/LandingGithub.svg";
import instagram from "/LandingInstagramButton.svg";
import android from "/LandingAndroidButton.svg";
import apple from "/LandingAppStoreButton.svg";

import { themes } from "./theme.js"; // Import all themes
import { useNavigate } from "react-router-dom"; // Import React Router for navigation
import { motion, AnimatePresence } from "framer-motion";

const glassContainer =
  "bg-white/50 backdrop-blur-sm border border-white rounded-[2rem]";
const button =
  "w-10 h-10 rounded-full flex items-center justify-center transition duration-300";

const words = [
  { english: "Pixel", japanese: "画", romaji: "Ga" },
  { english: "Lofi", japanese: "低", romaji: "Tei" },
  { english: "Soothing", japanese: "癒", romaji: "Iyashi" },
  { english: "Relaxing", japanese: "静", romaji: "Sei" },
  { english: "Favorite", japanese: "愛", romaji: "Ai" },
];

function LandingMobile() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const fireflyArray = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      duration: Math.random() * 8 + 5,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 5,
    }));
    setFireflies(fireflyArray);

    const interval = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeOut(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleListenClick = () => {
    setShowAudioPlayer((prev) => !prev);
  };

  return (
    <div className="h-auto min-h-screen bg-black flex flex-col items-center justify-start bg-cover bg-center relative overflow-y-auto">
      {" "}
      {/* Background Image */}
      <img
        src={image}
        alt="Landing"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10"></div>
      {/* Fireflies Animation */}
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="absolute z-50"
          style={{
            left: `${fly.left}%`,
            bottom: "-10px",
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            backgroundColor: "#fecc59",
            borderRadius: "50%",
            boxShadow: "0 0 10px #fecc59, 0 0 20px #fecc59",
            animation: `firefly ${fly.duration}s ease-in-out ${fly.delay}s infinite`,
          }}
        />
      ))}
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-6">
        {/* Title */}
        <h1 className="text-4xl font-PS font-extrabold text-black drop-shadow-lg mt-6">
          Melody Moods
        </h1>

        {/* Buttons */}
        <div className="flex space-x-3 mt-4">
          <button className={`bg-[#fecc59] ${button}`}>
            <img src={home} alt="Home" className="w-4 h-4" />
          </button>
          <button className={`bg-white hover:bg-[#fecc59] ${button}`}>
            <img src={share} alt="Share" className="w-4 h-4" />
          </button>
          <button className={`bg-white hover:bg-[#fecc59] ${button}`}>
            <img src={github} alt="Github" className="w-4 h-4" />
          </button>
          <button className={`bg-gray-300 cursor-not-allowed ${button}`}>
            <img src={instagram} alt="Instagram" className="w-4 h-4" />
          </button>
          <button className={`bg-gray-300 cursor-not-allowed ${button}`}>
            <img src={apple} alt="App Store" className="w-4 h-4" />
          </button>
          <button className={`bg-gray-300 cursor-not-allowed ${button}`}>
            <img src={android} alt="Android" className="w-4 h-4" />
          </button>
        </div>

        {/* Animated Words */}
        <div className="text-center text-5xl font-extrabold text-black tracking-wide mt-6">
          Immerse in <br />
          <span className="text-[#fecc59]">
            <span
              className={`transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              {words[wordIndex].english}{" "}
              <span className="text-4xl font-normal">
                {words[wordIndex].japanese}
              </span>
            </span>
          </span>
          <br />
          Music
        </div>

        {/* Glass Container - Opens AudioPlayer */}
        <div className={`${glassContainer} mt-8 p-4 text-center w-[260px]`}>
          <p className="text-sm font-medium text-gray-500">
            Generate immersive music moods for yourself or send a vibe to your
            friends!
          </p>

          <div
            className="mt-4 bg-white rounded-[2rem] flex items-center justify-between pl-5 pr-3 py-2 cursor-pointer"
            onClick={handleListenClick}
          >
            <span className="text-normal text-black">
              {showAudioPlayer ? "Minimise" : "Listen"}
            </span>
            <button
              className={`hover:bg-gray-300 bg-[#fecc59] ${button} h-8 w-8`}
            >
              <img
                src={arrow}
                alt="Arrow"
                className={`w-4 h-4 transform ${
                  showAudioPlayer ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Audio Player with Framer Motion Animation */}
        <AnimatePresence>
          {showAudioPlayer && (
            <motion.div
              className="mt-6 flex justify-center w-full z-50"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              exit={{ opacity: 0, y: 40, transition: { duration: 0.5 } }}
            >
              <AudioPlayerLanding
                audioSrc="/Landing/AudioLanding.mp3"
                audioTitle="Intro Theme"
                audioArtist="Melody Mood"
                themeColor="#000000"
                audioTheme="Welcome"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default LandingMobile;
