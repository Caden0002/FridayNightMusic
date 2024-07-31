import { useState } from 'react';
import Yamiyo from '/Yamiyo.mp3';
import Background from '/BackgroundVideo.mp4';
import AudioPlayer from './AudioPlayer.jsx';

function Hero(props) {
    return (
        <div className={`relative min-h-screen flex`}>
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline                
                src={Background}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1 }}
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc={Yamiyo}
                audioTitle='Yamiyo Lo-fi'
                audioArtist='Kijugo'
            />
        </div>
    );
}

export default Hero;
