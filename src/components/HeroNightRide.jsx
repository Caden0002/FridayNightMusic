import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroNightRide(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/NightRide/BackgroundNightRide.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/NightRide/AudioNightRide.mp3"
        audioTitle="Here With Me"
        audioArtist="d4vd"
        themeColor="#ad86c7"
        audioTheme="Night Ride"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroNightRide;

// https://dribbble.com/shots/23636366-Bike-Couple-Animated-pixel-art
// https://www.youtube.com/watch?v=q_Y5dr-3HOQ
