import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero.jsx"; // Dynamic Hero component
import Landing from "./components/Landing.jsx"; // New Landing Page
import { themes } from "./components/theme.js";

const landingAndSharedImageAssets = [
  "/LandingBackground.gif",
  "/LandingImage2.png",
  "/LandingHomeButton.svg",
  "/LandingShareButton.svg",
  "/LandingArrowButton.svg",
  "/LandingGithub.svg",
  "/LandingInstagramButton.svg",
  "/LandingAndroidButton.svg",
  "/LandingAppStoreButton.svg",
  "/MenuLogo.gif",
  "/NoteInactiveLogo.jpg",
  "/NoteActiveLogo.jpg",
  "/PlayerButtons/next.svg",
  "/PlayerButtons/prev.svg",
  "/PlayerButtons/play.svg",
  "/PlayerButtons/pause.svg",
  "/PlayerButtons/repeat.svg",
  "/PlayerButtons/shuffle.svg",
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

function App() {
  const [isPreloadDone, setIsPreloadDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const preloadPlan = useMemo(() => {
    const themeList = Object.values(themes);
    const themeBackgrounds = themeList.map((theme) => theme.bgImage);
    const themeAudioTracks = themeList.map((theme) => theme.audioSrc);

    const images = [
      ...new Set([...landingAndSharedImageAssets, ...themeBackgrounds]),
    ];
    const audios = [...new Set(themeAudioTracks)];

    return { images, audios };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const total = preloadPlan.images.length + preloadPlan.audios.length;
    let done = 0;

    const tick = () => {
      done += 1;
      if (!isMounted) return;
      setProgress(Math.round((done / total) * 100));
      if (done >= total) setIsPreloadDone(true);
    };

    preloadPlan.images.forEach((src) => {
      preloadImage(src).then(tick);
    });

    // Metadata only keeps preloading lightweight while still warming route switches.
    preloadPlan.audios.forEach((src) => {
      preloadAudioMetadata(src).then(tick);
    });

    return () => {
      isMounted = false;
    };
  }, [preloadPlan]);

  if (!isPreloadDone) {
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

  return (
    <Router>
      <Routes>
        {/* Default Route - Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Dynamic Route for music themes */}
        <Route path="/:themeName" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
