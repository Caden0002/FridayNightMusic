import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function AudioPlayer({ audioSrc, audioTitle, audioArtist, themeColor, audioTheme }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio(audioSrc));

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true; // Enable looping

        const updateCurrentTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', setAudioData);

        if (isPlaying) {
            audio.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
        } else {
            audio.pause();
        }

        const handleKeyPress = (event) => {
            if (event.code === 'Space') {
                event.preventDefault(); // Prevent default spacebar scroll behavior
                togglePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('loadedmetadata', setAudioData);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        audio.src = audioSrc; // Update audio source if it changes
        audio.load();
        setCurrentTime(0); // Reset current time when source changes

        // Cleanup on unmount or when `audioSrc` changes
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [audioSrc]);

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleProgressChange = (event) => {
        const audio = audioRef.current;
        const newTime = (event.target.value / 100) * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // SVG Icons
    const PlayIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" style={{ transform: 'translateX(1px)' }}>
            <path d="M3 22v-20l18 10-18 10z" />
        </svg>
    );

    const PauseIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M6 22h4v-20h-4v20zm8-20v20h4v-20h-4z" />
        </svg>
    );

    return (
        <div className="fixed left-4 bottom-4 z-10">
            <div className="w-80 h-32 bg-[#000]/[.7] rounded relative flex items-center p-4" style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}>
                <div className="flex-grow">
                    <div className="flex items-end justify-between ">
                        <div className="flex flex-col">
                            <div className="text-md font-bold mb-2" style={{ color: themeColor }}>{audioTheme}</div>
                            <div className="text-white text-base font-semibold">{audioTitle}</div>
                            <div className="text-gray-500 text-sm mb-4">{audioArtist}</div>
                        </div>
                        <button onClick={togglePlayPause} className="w-8 h-8 items-center justify-center flex rounded-full mb-5" style={{ backgroundColor: themeColor, border: '1px #ffffff solid', cursor: 'pointer' }}>
                            {isPlaying ? PauseIcon : PlayIcon}
                        </button>
                    </div>
                    <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full"
                            style={{ backgroundColor: themeColor, width: `${(currentTime / duration) * 100}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={(currentTime / duration) * 100}
                            onChange={handleProgressChange}
                            className="absolute top-0 left-0 w-full h-full opacity-0 z-10"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

AudioPlayer.propTypes = {
    audioSrc: PropTypes.string.isRequired,
    audioTitle: PropTypes.string.isRequired,
    audioArtist: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
    audioTheme: PropTypes.string.isRequired,
};

export default AudioPlayer;
