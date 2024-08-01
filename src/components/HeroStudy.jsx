import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer.jsx';
import Note from './Note.jsx';

function HeroStudy(props) {
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
    const objectPosition = windowSize.width < 540 ? 'left ' : 'center'; // Adjusted position

    return (
        <div className="relative h-screen flex">
            {/* Background GIF */}
            <img
                src='/Study/BackgroundStudy.gif'
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1, objectPosition: objectPosition }}
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc='/Study/AudioStudy.mp3'
                audioTitle='Yamiyo Lo-fi'
                audioArtist='Kijugo'
                themeColor='#d15f50'
                audioTheme='STUDY'
            />

            {/* Note Component */}
            <Note />
        </div>
    );
}

export default HeroStudy;
