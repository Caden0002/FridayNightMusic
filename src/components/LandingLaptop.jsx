import React, { useEffect, useState } from "react";

import AudioPlayerLanding from "./AudioPlayerLanding.jsx"; // Import the AudioPlayer component
import Fireflies from "./LandingFireflies.jsx"; // Import Fireflies component
import SocialButtons from "./LandingSocialButtons.jsx"; // Import SocialButtons component
import LandingCodeInput from "./LandingCodeInput.jsx"; // Import Have a Code component
import LandingGenerateButton from "./LandingGenerateButton.jsx"; // Import Generate button component

import image from "/LandingBackground.gif";
import image2 from "/LandingImage2.png";
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
  "bg-white/50 backdrop-blur-xs border border-white rounded-[2rem]";
const button =
  "w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ";

// Word List with Japanese Characters
const words = [
  { english: "Pixel", japanese: "画", romaji: "Ga" }, // "画" means "picture" or "pixel"
  { english: "Lofi", japanese: "低", romaji: "Tei" }, // "低" means "low" (from "low fidelity")
  { english: "Soothing", japanese: "癒", romaji: "Iyashi" }, // "癒" means "healing" or "soothing"
  { english: "Relaxing", japanese: "静", romaji: "Sei" }, // "静" means "calm" or "quiet"
  { english: "Favorite", japanese: "愛", romaji: "Ai" }, // "愛" means "love" (as in favorite)
];

// Variants for the audio player's exit animation
const audioVariants = {
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40, transition: { duration: 1.5 } },
};

function LandingLaptop() {
  const [customInput, setCustomInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Extract all valid theme routes from themes.js
  const searchableRoutes = Object.keys(themes);

  const handleCustomRoute = () => {
    const formattedInput = customInput.toLowerCase().trim();

    if (!formattedInput) {
      setErrorMessage("Please enter a code.");
      return;
    }

    if (searchableRoutes.includes(formattedInput)) {
      navigate(`/${formattedInput}`);
      setErrorMessage(""); // Clear error
      setCustomInput(""); // Clear input field after navigation
    } else {
      setErrorMessage("Invalid code. Please try again.");
    }
  };

  // Handle "Enter" key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCustomRoute();
    }
  };
  const navigate = useNavigate();

  const [fireflies, setFireflies] = useState([]);
  const [wordIndex, setWordIndex] = useState(0); // Tracks the current word
  const [fadeOut, setFadeOut] = useState(false); // Controls fade-out effect
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [animateAudioExit, setAnimateAudioExit] = useState(false);

  useEffect(() => {
    // Generate 15 fireflies with random positions
    const fireflyArray = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100, // Random left position (0-100%)
      duration: Math.random() * 8 + 5, // Random animation duration (5s-13s)
      size: Math.random() * 6 + 3, // Random size (3px-9px)
      delay: Math.random() * 5, // Random delay before starting animation
    }));

    setFireflies(fireflyArray);

    // Word Animation: Change words every 3 seconds with fade-out before transition
    const interval = setInterval(() => {
      setFadeOut(true); // Start fade-out effect
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeOut(false); // Reset fade-out effect for new word
      }, 1000); // Wait for fade-out to finish before changing word
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Toggle the audio player visibility with animation.
  const handleListenClick = () => {
    if (showAudioPlayer) {
      // Animate exit
      setAnimateAudioExit(true);
      setTimeout(() => {
        setShowAudioPlayer(false);
        setAnimateAudioExit(false);
      }, 500); // Match this duration to your exit animation duration
    } else {
      setShowAudioPlayer(true);
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center p-12 bg-cover bg-center relative overflow-hidden">
      {/* Background Image (Full Screen) */}
      <img
        src={image}
        alt="Landing"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Fireflies Animation */}
      <Fireflies fireflies={fireflies} />

      {/* Content Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-[3.5rem] h-full min-h-[612px] w-full relative flex flex-col items-center justify-center p-10 z-10 ">
        {/* Top Right Buttons (Home & Share) */}
        <SocialButtons />

        {/* Title (Top Left) */}
        <h1 className="absolute top-6 left-10 text-4xl font-PS font-extrabold text-black drop-shadow-lg">
          Melody Moods
        </h1>

        {/* Animated Words (Cycle through words) */}
        <div className="absolute top-24 left-32 text-7xl font-extrabold text-black tracking-wide ">
          Immerse in
          <br />
          <span className="text-[#fecc59] relative inline-block">
            <span
              key={words[wordIndex].english}
              className={`absoluteinset-0 ${
                fadeOut ? "animate-fade-exit" : "animate-fade-enter"
              }`}
            >
              {words[wordIndex].english}{" "}
              <span className="text-4xl  top-6  font-normal">
                {words[wordIndex].japanese}
              </span>
            </span>
          </span>
          <br />
          Music
        </div>

        {/* Parent Flex Container for Themes, Open Audio, and Player */}
        <div className="flex mr-16 mt-36 ml-56 justify-left items-end w-full gap-4">
          {/* Glass Container - Display all audio themes */}
          <div className={`${glassContainer} hidden md:block w-[400px] p-2 `}>
            <div>
              {Object.entries(themes) // Convert object to array of key-value pairs
                .filter(([key, theme]) => !theme.hidden) // Exclude hidden themes
                .map(([key, theme]) => (
                  <a
                    key={key}
                    href={`/${key}`} // Navigate to the theme route
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice
                    className="text-xs text-center font-medium bg-white text-gray-500 px-4 py-2 rounded-[1.5rem] inline-block m-1.5 cursor-pointer transition duration-300 hover:bg-[#fecc59] hover:text-white"
                  >
                    {theme.audioTheme}
                  </a>
                ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4 ">
            {/* Have a Code? Input */}
            <LandingCodeInput
              customInput={customInput}
              setCustomInput={setCustomInput}
              handleCustomRoute={handleCustomRoute}
              handleKeyDown={handleKeyDown}
              errorMessage={errorMessage}
            />

            {/* Generate Button */}
            <LandingGenerateButton />

            {/* Glass Container - Opens AudioPlayer */}
            <div className={`${glassContainer} p-4 text-center w-[220px] z-10`}>
              <p className="text-normal font-medium text-gray-500">
                Generate immersive music moods for yourself or send a vibe to
                your friends!
              </p>

              <div
                className=" mt-8 bg-white rounded-[2rem] flex items-center justify-between pl-5 pr-3 py-2 cursor-pointer"
                onClick={handleListenClick}
              >
                <span className="text-normal text-black">
                  {showAudioPlayer ? "Minimise" : "Listen"}
                </span>{" "}
                <button
                  className={`hover:bg-gray-300 bg-[#fecc59] ${button} h-8 w-8 `}
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
          </div>

          {/* Audio Player with Framer Motion Animation */}
          <div className="min-w-[330px] min-h-[445px] flex justify-center z-50">
            <AnimatePresence>
              {showAudioPlayer && (
                <motion.div
                  className=""
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.5 } }}
                >
                  <AudioPlayerLanding
                    audioSrc="/Landing/AudioLanding.mp3"
                    audioTitle="Intro Theme"
                    audioArtist="Melody Mood"
                    themeColor="#000000"
                    audioTheme="Welcome"
                    className=""
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Image2 at Bottom Right */}
        <img
          src={image2}
          alt="Landing Image 2"
          className="absolute bottom-0 right-0 rounded-br-[3.5rem] w-100 h-auto object-contain"
        />
      </div>

      {/* Firefly & Word Animation */}
      <style>
        {`
          @keyframes firefly {
            0% { transform: translateY(0) translateX(0); opacity: 1; }
            25% { transform: translateY(-20vh) translateX(-10px); opacity: 0.8; }
            50% { transform: translateY(-40vh) translateX(10px); opacity: 0.6; }
            75% { transform: translateY(-60vh) translateX(-10px); opacity: 0.4; }
            100% { transform: translateY(-100vh) translateX(0); opacity: 0; }
          }
          @keyframes fade-enter {
            0% { opacity: 0; transform: translateX(20px); }
            50% { opacity: 0.8; }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fade-exit {
            0% { opacity: 1; transform: translateX(0); }
            50% { opacity: 0.8; }
            100% { opacity: 0; transform: translateX(-20px); }
          }
          .animate-fade-enter { animation: fade-enter 1s ease-in-out forwards; }
          .animate-fade-exit { animation: fade-exit 1s ease-in-out forwards; }
        `}
      </style>
    </div>
  );
}

export default LandingLaptop;
