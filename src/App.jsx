import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroStudy from './components/HeroStudy.jsx';
import HeroFirstNight from './components/HeroFirstNight.jsx';
import HeroWork from './components/HeroWork.jsx';
import ReactGA from 'react-ga4';

export default function App() {
  const location = useLocation();
  const hostname = window.location.hostname;
  const port = window.location.port;

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return (
    <>
      {hostname === 'localhost' && port === '5173' && <HeroStudy />}
      {hostname === 'study.musicplayer.cloud' && <HeroStudy />}
      {hostname === 'firstnight.musicplayer.cloud' && <HeroFirstNight />}
      {hostname === 'work.musicplayer.cloud' && <HeroWork />}
    </>
  );
}
