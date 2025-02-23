import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import MenuLogo from "/MenuLogo.gif"; // Import the GIF image

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const validRoutes = ["gina", "amanda"]; // List of valid custom routes

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCustomRoute = () => {
    const formattedInput = customInput.toLowerCase().trim(); // Normalize input

    if (validRoutes.includes(formattedInput)) {
      navigate(`/${formattedInput}`); // Navigate to the valid route
      setErrorMessage(""); // Clear error if valid
      closeMenu(); // Close menu after navigation
    } else {
      setErrorMessage(
        "Sorry love, I guess Caden didn't make one for you ｡°(°.◜ᯅ◝°)°｡"
      ); // Show error message
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCustomRoute(); // Trigger navigation on Enter key press
    }
  };

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
        <div className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#000]/70 rounded-tl-lg rounded-bl-lg shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0 p-6">
          <div className="flex flex-col items-center space-y-6 mt-12 text-white text-md font-bold">
            {/* Navigation Links */}
            <a
              href="/study"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Study Mode
            </a>
            <a
              href="/work"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Work Flow
            </a>
            <a
              href="/nightride"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Night Ride
            </a>
            <a
              href="/gardening"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Gardening
            </a>
            <a
              href="/cafe"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Café Hustle
            </a>
            <a
              href="/space"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Alone in Space
            </a>
            <a
              href="/rain"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Rainy Reverie
            </a>
            <a
              href="/sunset"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Sunset Mellow
            </a>

            {/* Custom Route Input */}
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Have a code?"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={handleKeyDown} // Trigger navigation on Enter key press
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
