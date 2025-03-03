import React from "react";
import arrow from "/LandingArrowButton.svg";

const glassContainer =
  "bg-white/50 backdrop-blur-xs border border-white rounded-[2rem]";

const LandingCodeInput = ({
  customInput,
  setCustomInput,
  handleCustomRoute,
  handleKeyDown,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col items-center z-10">
      <div
        className={`${glassContainer} p-1 text-center w-[220px] max-h-[60px]`}
      >
        <div
          className={`rounded-[2rem] flex items-center justify-between pl-5 pr-3 py-2 border ${
            errorMessage ? "border-red-500" : "border-[#fecc59]"
          } transition-all duration-300`}
        >
          {/* Input Field */}
          <input
            type="text"
            placeholder="Have a code?"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown} // Allows Enter key submission
            className="p-1 text-black bg-transparent focus:outline-none w-full text-left"
          />

          {/* Submit Button */}
          <button
            onClick={handleCustomRoute}
            disabled={!customInput.trim()} // Prevents empty submission
            className={`${
              !customInput.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#e6b450]"
            } bg-[#fecc59] transition rounded-full flex items-center justify-center h-8 w-8`}
          >
            <img src={arrow} alt="Arrow" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingCodeInput;
