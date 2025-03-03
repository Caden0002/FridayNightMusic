import React from "react";

const Fireflies = ({ fireflies }) => {
  return (
    <>
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
    </>
  );
};

export default Fireflies;
