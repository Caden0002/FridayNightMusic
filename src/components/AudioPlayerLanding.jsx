import { useState, useRef, useEffect } from "react";
import { themes } from "./theme.js"; // Import all themes

// Import button icons
import NextIcon from "/PlayerButtons/next.svg";
import PrevIcon from "/PlayerButtons/prev.svg";
import PlayIcon from "/PlayerButtons/play.svg";
import PauseIcon from "/PlayerButtons/pause.svg";
import RepeatIcon from "/PlayerButtons/repeat.svg";
import ShuffleIcon from "/PlayerButtons/shuffle.svg";
import PositionIcon from "/PlayerButtons/position.svg";

function AudioPlayerLanding({ className }) {
  // Extract audio tracks from `themes`, excluding hidden ones
  const availableTracks = Object.values(themes).filter(
    (theme) => !theme.hidden
  );
  // Helper function to format time in m:ss format

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const currentTrack = availableTracks[currentTrackIndex]; // Get current track details
  const audioRef = useRef(new Audio(currentTrack.audioSrc));

  const [imageLoading, setImageLoading] = useState(true);

  /** 🔄 Update audio source when track or play state changes **/
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.audioSrc;
    audio.loop = isLooping;
    audio.load();
    setCurrentTime(0);

    // If the track is supposed to be playing, play it after loading
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

  /** ⏳ Handle time updates **/
  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  /** 🎵 Handle play/pause and keyboard shortcuts **/
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio
        .play()
        .catch((error) => console.error("Failed to play audio:", error));
    } else {
      audio.pause();
    }

    const handleKeyPress = (event) => {
      if (event.code === "Space" || event.code === "MediaPlayPause") {
        event.preventDefault();
        togglePlayPause();
      } else if (event.code === "ArrowRight") {
        nextTrack();
      } else if (event.code === "ArrowLeft") {
        prevTrack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying]);

  /** 🎧 Handle end of track (Next if not looping) **/
  useEffect(() => {
    const audio = audioRef.current;

    const handleTrackEnd = () => {
      if (!isLooping) {
        nextTrack();
      }
    };

    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [isLooping]);

  /** ▶️ Toggle Play/Pause **/
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  /** ⏭ Next Track (With Repeat, Shuffle, and Normal modes) **/
  const nextTrack = () => {
    if (isLooping) {
      // If repeat is enabled, reset the current track's time to 0.
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
    } else if (isShuffling) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * availableTracks.length);
      } while (randomIndex === currentTrackIndex);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex(
        (prevIndex) => (prevIndex + 1) % availableTracks.length
      );
    }
  };

  /** 🎧 Handle end of track (use repeat mode if active) **/
  useEffect(() => {
    const audio = audioRef.current;
    const handleTrackEnd = () => {
      if (isLooping) {
        // Repeat current track on end
        audio.currentTime = 0;
        if (isPlaying) {
          audio.play();
        }
      } else {
        nextTrack();
      }
    };

    audio.addEventListener("ended", handleTrackEnd);
    return () => {
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [isLooping, isPlaying, currentTrackIndex]);

  /** ⏮ Previous Track **/
  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? availableTracks.length - 1 : prevIndex - 1
    );
    // Removed: setIsPlaying(true);
  };

  /** 🔁 Toggle Loop **/
  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  /** 🔀 Toggle Shuffle **/
  const toggleShuffle = () => {
    setIsShuffling((prev) => !prev);
  };

  /** 🎚 Handle Progress Change **/
  const handleProgressChange = (event) => {
    // const audio = audioRef.current;
    // const newTime = Number(event.target.value); // Use the value directly
    // audio.currentTime = newTime;
    // setCurrentTime(newTime);
  };

  return (
    <div
      className="w-[330px] h-[445px] bg-[#000]/[.7] rounded-[1rem] relative flex flex-col px-4 pt-4 pb-6"
      style={{
        boxShadow: "rgba(255, 255, 255, 0.1) 0px 0px 10px 2px",
      }}
    >
      {/* Song Info */}
      <div className="w-auto h-full text-center">
        {/* Display bgImage or bgVideo above audioTheme */}
        {currentTrack.bgImage ? (
          <>
            {imageLoading && (
              <div className="flex justify-center items-center w-[300px] h-[225px] bg-gray-800 rounded-[0.25rem]">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-[#fecc59] rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={currentTrack.bgImage}
              alt="Background"
              className={`mx-auto mb-4 w-[300px] h-[225px] rounded-[0.25rem] ${
                imageLoading ? "hidden" : "block"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)} // Fallback in case of an error
            />
          </>
        ) : currentTrack.bgVideo ? (
          <video
            src={currentTrack.bgVideo}
            className="mx-auto mb-1 w-[300px] h-[225px] rounded-[0.25rem]"
            muted
            loop
            playsInline
          />
        ) : null}
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
      </div>

      {/* Progress Bar with Time Labels Using Flex */}
      <div className="w-full mt-2 mb-4 flex flex-col">
        {/* Time Labels */}
        <div
          className="flex justify-between text-xs mb-1"
          style={{ color: currentTrack.themeColor }}
        >
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime(duration - currentTime)}</span>
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
            className="absolute top-0 left-0 w-full h-full opacity-0 z-10"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        {/* Shuffle */}
        <button
          onClick={toggleShuffle}
          className="w-4 h-4"
          style={{
            filter: isShuffling
              ? `drop-shadow(0 0 5px ${currentTrack.themeColor})`
              : "none",
          }}
        >
          <img src={ShuffleIcon} alt="Shuffle" className="w-4 h-4" />
        </button>

        {/* Previous */}
        <button onClick={prevTrack} className="w-6 h-6">
          <img src={PrevIcon} alt="Previous" className="w-6 h-6" />
        </button>

        {/* Play/Pause */}
        <button onClick={togglePlayPause} className="w-6 h-6">
          <img
            src={isPlaying ? PauseIcon : PlayIcon}
            alt="Play/Pause"
            className="w-6 h-6"
          />
        </button>

        {/* Next */}
        <button onClick={nextTrack} className="w-6 h-6">
          <img src={NextIcon} alt="Next" className="w-6 h-6" />
        </button>

        {/* Repeat */}
        <button
          onClick={toggleLoop}
          className="w-4 h-4"
          style={{
            filter: isLooping
              ? `drop-shadow(0 0 5px ${currentTrack.themeColor})`
              : "none",
          }}
        >
          <img src={RepeatIcon} alt="Repeat" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default AudioPlayerLanding;
