import { useEffect, useMemo, useState } from "react";
import LandingLaptop from "./LandingLaptop.jsx";
import LandingMobile from "./LandingMobile.jsx";

const landingImageAssets = [
  "/LandingBackground.gif",
  "/LandingImage2.png",
  "/LandingHomeButton.svg",
  "/LandingShareButton.svg",
  "/LandingArrowButton.svg",
  "/LandingGithub.svg",
  "/LandingInstagramButton.svg",
  "/LandingAndroidButton.svg",
  "/LandingAppStoreButton.svg",
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

function preloadAudioMetadata(src) {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";
    audio.onloadedmetadata = resolve;
    audio.onerror = resolve;
    audio.src = src;
  });
}

function Landing() {
  // For example, if window.innerWidth < 1024, show mobile version.
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const preloadPlan = useMemo(
    () => ({
      images: landingImageAssets,
      audios: ["/Landing/AudioLanding.mp3"],
    }),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const total = preloadPlan.images.length + preloadPlan.audios.length;
    let done = 0;

    const tick = () => {
      done += 1;
      if (!isMounted) return;
      setProgress(Math.round((done / total) * 100));
      if (done >= total) setAssetsLoaded(true);
    };

    preloadPlan.images.forEach((src) => preloadImage(src).then(tick));
    preloadPlan.audios.forEach((src) => preloadAudioMetadata(src).then(tick));

    return () => {
      isMounted = false;
    };
  }, [preloadPlan]);

  if (!assetsLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin" />
          <p className="font-PS text-sm tracking-wide">
            Loading music... {progress}%
          </p>
        </div>
      </div>
    );
  }

  return <>{isMobile ? <LandingMobile /> : <LandingLaptop />}</>;
}

export default Landing;
