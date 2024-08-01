import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer.jsx';
import Note from './Note.jsx';

function HeroWork(props) {
    // Hook to get the window size
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine the object position based on screen size
const objectPosition = windowSize.width < 540 ? '20% 0' : 'left';

    return (
        <div className="relative h-screen flex">
            {/* Background GIF */}
            <img
                src='/Work/BackgroundWork.gif'
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1, objectPosition: objectPosition }}
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc='/Work/AudioWork.mp3'
                audioTitle='Show Me How'
                audioArtist='Men I Trust'
                themeColor='#e5d6ae'
                audioTheme='0530PM'
            />

            {/* Note Component */}
            <Note />
        </div>
    );
}

export default HeroWork;
