import React from "react";
import arrow from "/LandingArrowButton.svg";

const glassContainer =
  "bg-white/50 backdrop-blur-xs border border-white rounded-[2rem]";

const button =
  "w-10 h-10 rounded-full flex items-center justify-center transition duration-300";

const LandingGenerateButton = () => {
  return (
    <div
      className={`${glassContainer} hidden md:block p-1 text-center w-[220px] z-10`}
    >
      <div className="cursor-not-allowed rounded-[2rem] flex items-center justify-between pl-5 pr-3 py-2">
        <span className="text-normal text-black">Generate</span>
        <button
          className={`cursor-not-allowed bg-gray-300 hover:bg-gray-300 bg-[#fecc59] ${button} h-8 w-8`}
        >
          <img src={arrow} alt="Arrow" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LandingGenerateButton;
