import { useState, useRef, useEffect } from "react";
import { themes } from "./theme.js"; // Import all themes

// Import button icons
import NextIcon from "/PlayerButtons/next.svg";
import PrevIcon from "/PlayerButtons/prev.svg";
import PlayIcon from "/PlayerButtons/play.svg";
import PauseIcon from "/PlayerButtons/pause.svg";
import RepeatIcon from "/PlayerButtons/repeat.svg";
import ShuffleIcon from "/PlayerButtons/shuffle.svg";

function AudioPlayerLanding({ className }) {
  // Extract audio tracks from `themes`, excluding hidden ones
  const availableTracks = Object.values(themes).filter(
    (theme) => !theme.hidden
  );

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

  const currentTrack = availableTracks[currentTrackIndex]; // Get current track details
  const audioRef = useRef(new Audio(currentTrack.audioSrc));

  // Reset media loading state when changing tracks
  const changeTrack = (newIndex) => {
    setIsMediaLoaded(false);
    setCurrentTrackIndex(newIndex);
  };

  /** 🔄 Update audio source when track or play state changes **/
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.audioSrc;
    audio.loop = isLooping;
    audio.load();

    if (isPlaying) {
      audio
        .play()
        .catch((error) => console.error("Failed to play audio:", error));
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [currentTrack, isLooping, isPlaying]);

  /** 🎧 Handle end of track **/
  useEffect(() => {
    const audio = audioRef.current;

    const handleTrackEnd = () => {
      if (!isLooping) nextTrack();
    };

    audio.addEventListener("ended", handleTrackEnd);
    return () => audio.removeEventListener("ended", handleTrackEnd);
  }, [isLooping]);

  /** ▶️ Toggle Play/Pause **/
  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  /** ⏭ Next Track **/
  const nextTrack = () => {
    setIsMediaLoaded(false);
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex + 1) % availableTracks.length
    );
  };

  /** ⏮ Previous Track **/
  const prevTrack = () => {
    setIsMediaLoaded(false);
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? availableTracks.length - 1 : prevIndex - 1
    );
  };

  /** 🔁 Toggle Loop **/
  const toggleLoop = () => setIsLooping((prev) => !prev);

  /** 🔀 Toggle Shuffle **/
  const toggleShuffle = () => setIsShuffling((prev) => !prev);

  return (
    <div
      className="w-[330px] h-[445px] bg-[#000]/[.7] rounded-[1rem] flex flex-col px-4 pt-4 pb-6"
      style={{ boxShadow: "rgba(255, 255, 255, 0.1) 0px 0px 10px 2px" }}
    >
      {/* Song Info */}
      <div className="w-auto h-full text-center">
        {currentTrack.bgImage ? (
          <>
            {!isMediaLoaded && (
              <div className="flex justify-center items-center w-[300px] h-[225px] bg-gray-800 rounded-[0.25rem]">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-[#fecc59] rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={currentTrack.bgImage}
              alt="Background"
              className={`mx-auto mb-4 w-[300px] h-[225px] rounded-[0.25rem] ${
                isMediaLoaded ? "block" : "hidden"
              }`}
              onLoad={() => setIsMediaLoaded(true)}
            />
          </>
        ) : currentTrack.bgVideo ? (
          <video
            src={currentTrack.bgVideo}
            className={`mx-auto mb-1 w-[300px] h-[225px] rounded-[0.25rem] ${
              isMediaLoaded ? "block" : "hidden"
            }`}
            onLoadedData={() => setIsMediaLoaded(true)}
            muted
            loop
            playsInline
          />
        ) : null}

        {/* Song Details */}
        {isMediaLoaded && (
          <>
            <div
              className="text-lg font-bold"
              style={{ color: currentTrack.themeColor }}
            >
              {currentTrack.audioTheme}
            </div>
            <div className="text-white text-base font-semibold">
              {currentTrack.audioTitle}
            </div>
            <div className="text-gray-500 text-sm mb-2">
              {currentTrack.audioArtist}
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button onClick={toggleShuffle} className="w-4 h-4">
          <img src={ShuffleIcon} alt="Shuffle" className="w-4 h-4" />
        </button>

        <button onClick={prevTrack} className="w-6 h-6">
          <img src={PrevIcon} alt="Previous" className="w-6 h-6" />
        </button>

        <button onClick={togglePlayPause} className="w-6 h-6">
          <img
            src={isPlaying ? PauseIcon : PlayIcon}
            alt="Play/Pause"
            className="w-6 h-6"
          />
        </button>

        <button onClick={nextTrack} className="w-6 h-6">
          <img src={NextIcon} alt="Next" className="w-6 h-6" />
        </button>

        <button onClick={toggleLoop} className="w-4 h-4">
          <img src={RepeatIcon} alt="Repeat" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default AudioPlayerLanding;
