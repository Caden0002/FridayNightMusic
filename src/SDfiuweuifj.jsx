import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { themes } from "./theme.js"; // Import available themes

function Landing() {
  const [customInput, setCustomInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // List of all theme keys
  const searchableRoutes = Object.keys(themes);
  // List of visible themes (exclude hidden)
  const visibleThemes = Object.keys(themes).filter(
    (theme) => !themes[theme].hidden
  );

  const handleCustomRoute = () => {
    const formattedInput = customInput.toLowerCase().trim();
    if (searchableRoutes.includes(formattedInput)) {
      navigate(`/${formattedInput}`);
    } else {
      setErrorMessage(
        "Sorry love, I guess Caden didn't make one for you ｡°(°.◜ᯅ◝°)°｡"
      );
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCustomRoute();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white text-center px-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-4">Welcome to the Music App</h1>
      <p className="text-lg text-gray-300 mb-8">
        Enter a code to access a special theme
      </p>

      {/* Input for Code */}
      <div className="relative w-72">
        <input
          type="text"
          placeholder="Have a code?"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 bg-transparent border-b border-gray-600 placeholder-gray-500 text-lg focus:outline-none focus:border-gray-300 transition-colors"
        />
        <button
          onClick={handleCustomRoute}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-white hover:text-gray-300 transition-colors"
        >
          →
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-400">{errorMessage}</p>
      )}

      {/* Divider */}
      <div className="mt-8 w-40 border-b border-gray-600"></div>

      {/* Public Links */}
      <p className="mt-8 text-lg text-gray-300">No code? Check out these:</p>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {visibleThemes.map((theme) => (
          <a
            key={theme}
            href={`/${theme}`}
            className="px-5 py-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition ease-in-out duration-200"
          >
            {themes[theme].audioTheme}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Landing;
