import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLogo from "/MenuLogo.gif";
import { themes } from "./theme.js"; // Import the themes

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Get theme names dynamically from themes.js
  const validRoutes = Object.keys(themes).filter(
    (theme) => !themes[theme].hidden // Only for displaying in the menu
  );

  const searchableRoutes = Object.keys(themes); // Allow searching all themes, including hidden ones

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCustomRoute = () => {
    const formattedInput = customInput.toLowerCase().trim();

    if (searchableRoutes.includes(formattedInput)) {
      navigate(`/${formattedInput}`);
      setErrorMessage("");
      closeMenu();
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

  // Close menu if user clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      {/* Burger Icon */}
      <div
        className="fixed top-4 right-4 z-30 cursor-pointer text-white"
        onClick={toggleMenu}
      >
        <img src={MenuLogo} alt="Menu" width={50} height={50} />
      </div>

      {/* Slide-in Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#000]/70 rounded-tl-lg rounded-bl-lg shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0 p-6"
        >
          <div className="flex flex-col items-center space-y-6 mt-12 text-white text-md font-bold">
            {/* Dynamically Generate Menu Items, Excluding Hidden Themes */}
            {validRoutes.map((theme) => (
              <a
                key={theme}
                href={`/${theme}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {themes[theme].audioTheme}
              </a>
            ))}

            {/* Custom Route Input */}
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Have a code?"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none focus:border-gray-300 w-full text-center"
                />
                <button
                  onClick={handleCustomRoute}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-lg"
                >
                  →
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
