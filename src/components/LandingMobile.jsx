import { useEffect, useState } from "react";
import AudioPlayerLanding from "./AudioPlayerLanding.jsx"; // Import the AudioPlayer component
import Fireflies from "./LandingFireflies.jsx"; // Import Fireflies component
import SocialButtons from "./LandingSocialButtons.jsx"; // Import SocialButtons component
import LandingCodeInput from "./LandingCodeInput.jsx"; // Import "Have a Code?" input component

import image from "/LandingBackground.gif";

import { themes } from "./theme.js"; // Import all themes
import { useNavigate } from "react-router-dom"; // Import React Router for navigation

const glassContainer =
  "bg-white/50 backdrop-blur-sm border border-white rounded-[2rem]";

const words = [
  { english: "Pixel", japanese: "画", romaji: "Ga" },
  { english: "Lofi", japanese: "低", romaji: "Tei" },
  { english: "Soothing", japanese: "癒", romaji: "Iyashi" },
  { english: "Relaxing", japanese: "静", romaji: "Sei" },
  { english: "Favorite", japanese: "愛", romaji: "Ai" },
];

function LandingMobile() {
  const navigate = useNavigate();
  const [customInput, setCustomInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [fireflies, setFireflies] = useState([]);

  // Function to handle navigation based on input
  const handleCustomRoute = () => {
    const formattedInput = customInput.toLowerCase().trim();

    if (!formattedInput) {
      setErrorMessage("Please enter a code.");
      return;
    }

    if (Object.keys(themes).includes(formattedInput)) {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-cover bg-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center">
        <img src={image} alt="Landing" className="w-full h-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/0 backdrop-blur-"></div>

      {/* Content Container */}
      <div className="relative flex flex-col items-center justify-center w-full px-6 py-12 gap-6">
        {/* Title */}
        <h1 className="text-4xl mt-[-8px] font-PS font-extrabold text-transparent bg-clip-text bg-[linear-gradient(90deg,#f59e0b_0%,#fb7185_30%,#60a5fa_60%,#34d399_100%)] bg-[length:220%_100%] animate-title-slide-fast drop-shadow-lg">
          Melody Moods
        </h1>

        {/* Button Group */}
        <SocialButtons />

        {/* Animated Words */}
        <div className="mt-24 text-center text-5xl font-extrabold text-black tracking-wide">
          <span className="font-PS text-[black]">
            <span
              className={`transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              {words[wordIndex].english}{" "}
              <span className="text-2xl font-normal">
                {words[wordIndex].japanese}
              </span>
            </span>
          </span>
        </div>

        {/* Glass Container 1 */}
        <div
          className={`${glassContainer} w-full max-w-[400px] flex flex-col items-center p-4`}
        >
          <div className="flex flex-wrap justify-center gap-2 w-full">
            {Object.entries(themes) // Convert object to array of key-value pairs
              .filter(([, theme]) => !theme.hidden) // Exclude hidden themes
              .map(([key, theme]) => (
                <a
                  key={key}
                  href={`/${key}`} // Navigate to the theme route
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Security best practice
                  className="text-xs text-center font-medium bg-white text-gray-500 px-4 py-2 rounded-[1.5rem] inline-block cursor-pointer transition duration-300 hover:bg-[#fecc59] hover:text-white"
                >
                  {theme.audioTheme}
                </a>
              ))}
          </div>
        </div>

        {/* Glass Container 2*/}
        <div
          className={`${glassContainer} w-full max-w-[400px] p-4 text-center w-[260px]`}
        >
          <p className="text-sm font-medium text-gray-500">
            Generate immersive music moods for yourself or send a vibe to your
            friends!
          </p>
        </div>

        {/* Code Input Section */}
        <LandingCodeInput
          customInput={customInput}
          setCustomInput={setCustomInput}
          handleCustomRoute={handleCustomRoute}
          handleKeyDown={handleKeyDown}
          errorMessage={errorMessage}
        />

        <div className="">
          <AudioPlayerLanding
            audioSrc="/Landing/AudioLanding.mp3"
            audioTitle="Intro Theme"
            audioArtist="Melody Mood"
            themeColor="#000000"
            audioTheme="Welcome"
            className=""
          />
        </div>
      </div>

      {/* Fireflies Animation */}
      <Fireflies fireflies={fireflies} />

      {/* Firefly Animation Keyframes */}
      <style>
        {`
    @keyframes firefly {
      0% { transform: translateY(0) translateX(0); opacity: 1; }
      25% { transform: translateY(-20vh) translateX(-10px); opacity: 0.8; }
      50% { transform: translateY(-40vh) translateX(10px); opacity: 0.6; }
      75% { transform: translateY(-60vh) translateX(-10px); opacity: 0.4; }
      100% { transform: translateY(-100vh) translateX(0); opacity: 0; }
    }
  `}
        {`
    @keyframes title-slide {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    .animate-title-slide-fast { animation: title-slide 2.6s linear infinite alternate; }
  `}
      </style>
    </div>
  );
}

export default LandingMobile;
