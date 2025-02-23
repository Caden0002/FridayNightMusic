import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLogo from "/MenuLogo.gif";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const menuRef = useRef(null); // Ref for detecting outside clicks
  const navigate = useNavigate();

  const validRoutes = ["gina", "amanda", "amandat"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCustomRoute = () => {
    const formattedInput = customInput.toLowerCase().trim();

    if (validRoutes.includes(formattedInput)) {
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
            <a href="/study" target="_blank" rel="noopener noreferrer">
              Study Mode
            </a>
            <a href="/work" target="_blank" rel="noopener noreferrer">
              Work Flow
            </a>
            <a href="/nightride" target="_blank" rel="noopener noreferrer">
              Night Ride
            </a>
            <a href="/gardening" target="_blank" rel="noopener noreferrer">
              Gardening
            </a>
            <a href="/cafe" target="_blank" rel="noopener noreferrer">
              Café Hustle
            </a>
            <a href="/space" target="_blank" rel="noopener noreferrer">
              Alone in Space
            </a>
            <a href="/rain" target="_blank" rel="noopener noreferrer">
              Rainy Reverie
            </a>
            <a href="/sunset" target="_blank" rel="noopener noreferrer">
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
