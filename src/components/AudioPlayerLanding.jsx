import { useState, useRef, useEffect } from "react";
import { themes } from "./theme.js"; // Import all themes

// Import button icons
import NextIcon from "/PlayerButtons/next.svg";
import PrevIcon from "/PlayerButtons/prev.svg";
import PlayIcon from "/PlayerButtons/play.svg";
import PauseIcon from "/PlayerButtons/pause.svg";
import RepeatIcon from "/PlayerButtons/repeat.svg";
import ShuffleIcon from "/PlayerButtons/shuffle.svg";

// Helper function to format time in m:ss format
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = availableTracks[currentTrackIndex]; // Get current track details
  const audioRef = useRef(new Audio(currentTrack.audioSrc));

  // Helper to change tracks and reset media loading state
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

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(0); // Reset time when changing song
    };

    audio.addEventListener("loadedmetadata", setAudioData);

    if (isPlaying) {
      audio
        .play()
        .catch((error) => console.error("Failed to play audio:", error));
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, [currentTrack, isLooping, isPlaying]);

  /** ⏳ Handle time updates **/
  useEffect(() => {
    const audio = audioRef.current;
    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("timeupdate", updateCurrentTime);
    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  /** 🎧 Handle end of track **/
  useEffect(() => {
    const audio = audioRef.current;
    const handleTrackEnd = () => {
      if (!isLooping) {
        nextTrack();
      }
    };
    audio.addEventListener("ended", handleTrackEnd);
    return () => audio.removeEventListener("ended", handleTrackEnd);
  }, [isLooping]);

  /** ▶️ Toggle Play/Pause **/
  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  /** ⏭ Next Track (Handles Repeat, Shuffle, and Normal modes) **/
  const nextTrack = () => {
    if (isLooping) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    } else if (isShuffling) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * availableTracks.length);
      } while (randomIndex === currentTrackIndex);
      changeTrack(randomIndex);
    } else {
      changeTrack((currentTrackIndex + 1) % availableTracks.length);
    }
  };

  /** ⏮ Previous Track **/
  const prevTrack = () => {
    changeTrack(
      currentTrackIndex === 0
        ? availableTracks.length - 1
        : currentTrackIndex - 1
    );
  };

  /** 🔁 Toggle Loop **/
  const toggleLoop = () => setIsLooping((prev) => !prev);

  /** 🔀 Toggle Shuffle **/
  const toggleShuffle = () => setIsShuffling((prev) => !prev);

  /** 🎚 Handle Progress Change **/
  const handleProgressChange = (event) => {
    const newTime = Number(event.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  return (
    <div
      className="w-[330px] h-[445px] bg-[#000]/[.7] rounded-[1rem] flex flex-col px-4 pt-4 pb-6"
      style={{ boxShadow: "rgba(255, 255, 255, 0.1) 0px 0px 10px 2px" }}
    >
      {/* Song Info */}
      <div className="w-auto h-full text-center">
        {currentTrack.bgImage ? (
          <>
            {/* Loader shown when media is not loaded */}
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

        {/* Song Details (only displayed after media is loaded) */}
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

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300"
          style={{
            backgroundColor: currentTrack.themeColor,
            width: `${(currentTime / (duration || 1)) * 100}%`,
            minWidth: "2px",
          }}
        />
        <input
          type="range"
          min="0"
          max={duration || 1}
          value={currentTime}
          onChange={handleProgressChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer"
        />
      </div>

      {/* Time Labels */}
      <div className="flex justify-between text-xs mt-1 text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>-{formatTime(duration - currentTime)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mt-2">
        <button
          onClick={toggleShuffle}
          className="w-10 h-10 transition-all duration-300 relative"
        >
          <img src={ShuffleIcon} alt="Shuffle" className="w-4 h-4 mx-auto" />
          {isShuffling && (
            <span
              className="absolute left-1/2 transform -translate-x-1/2 top-8 block w-1 h-1 rounded-full"
              style={{ backgroundColor: currentTrack.themeColor }}
            ></span>
          )}
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
        <button
          onClick={toggleLoop}
          className="w-10 h-10 transition-all duration-300 relative"
        >
          <img src={RepeatIcon} alt="Repeat" className="w-4 h-4 mx-auto" />
          {isLooping && (
            <span
              className="absolute left-1/2 transform -translate-x-1/2 top-8 block w-1 h-1 rounded-full"
              style={{ backgroundColor: currentTrack.themeColor }}
            ></span>
          )}
        </button>
      </div>
    </div>
  );
}

export default AudioPlayerLanding;
