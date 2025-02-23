import React, { useState } from "react";
import MenuLogo from "/MenuLogo.gif"; // Import the GIF image

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
        <div className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#000]/70 rounded-tl-lg rounded-bl-lg shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0">
          <div className="flex flex-col items-center space-y-6 mt-24 text-white text-md font-bold">
            <div>
              <a
                href="/study"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Study Mode
              </a>
            </div>
            <div>
              <a
                href="/work"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Work Flow
              </a>
            </div>
            <div>
              <a
                href="/nightride"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Night Ride
              </a>
            </div>
            <div>
              <a
                href="/gardening"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Gardening
              </a>
            </div>
            <div>
              <a
                href="/cafe"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Café Hustle
              </a>
            </div>
            <div>
              <a
                href="/space"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Alone in Space
              </a>
            </div>
            <div>
              <a
                href="/rain"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Rainy Reverie
              </a>
            </div>
            <div>
              <a
                href="/sunset"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Sunset Mellow
              </a>
            </div>
            {/* <div>
              <a
                href="/gina"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                GINA
              </a>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
