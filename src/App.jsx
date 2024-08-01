import React from 'react';
import HeroStudy from "./components/HeroStudy.jsx";
import HeroFirstNight from "./components/HeroFirstNight.jsx";

export default function App() {
const hostname = window.location.hostname;
const port = window.location.port;
    return (
   <>
        {hostname === 'localhost' && port === '5173' && <HeroStudy />}
        {hostname === 'study.musicplayer.cloud' && <HeroStudy />}
        {hostname === 'firstnight.musicplayer.cloud' && <HeroFirstNight />}
    </>
    );
}
