import React from "react";
import home from "/LandingHomeButton.svg";
import share from "/LandingShareButton.svg";
import github from "/LandingGithub.svg";
import instagram from "/LandingInstagramButton.svg";
import android from "/LandingAndroidButton.svg";
import apple from "/LandingAppStoreButton.svg";

const button =
  "w-10 h-10 rounded-full flex items-center justify-center transition duration-300";

const shareContent = {
  title: "Melody Moods",
  text: "Check out this cool music experience!",
  url: window.location.href, // Gets the current page URL
};

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareContent);
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  } else {
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareContent.url);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Copying failed:", error);
    }
  }
};

const buttons = [
  { icon: home, alt: "Home", bg: "bg-[#fecc59]", link: "/" },
  {
    icon: share,
    alt: "Share",
    bg: "bg-white hover:bg-[#fecc59]",
    action: handleShare,
  },
  {
    icon: github,
    alt: "Github",
    bg: "bg-white hover:bg-[#fecc59]",
    link: "https://github.com/Caden0002/FridayNightMusic",
  },
  {
    icon: instagram,
    alt: "Instagram",
    bg: "bg-gray-300 cursor-not-allowed",
    link: "#",
  },
  {
    icon: apple,
    alt: "App Store",
    bg: "bg-gray-300 cursor-not-allowed",
    link: "#",
  },
  {
    icon: android,
    alt: "Android",
    bg: "bg-gray-300 cursor-not-allowed",
    link: "#",
  },
];

const SocialButtons = () => {
  return (
    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-4 md:top-24 md:left-8 md:transform-none">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className={`${btn.bg} ${button}`}
          onClick={
            btn.action
              ? btn.action
              : () => btn.link !== "#" && window.open(btn.link, "_blank")
          }
          disabled={btn.link === "#"} // Prevents interaction for disabled buttons
        >
          <img src={btn.icon} alt={btn.alt} className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

export default SocialButtons;
