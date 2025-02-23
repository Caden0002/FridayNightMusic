import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroAmandaT(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/AmandaT/BackgroundAmandaT.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          zIndex: -1,
          objectPosition: "center bottom", // Moves the image upwards to reveal the bottom
        }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/AmandaT/AudioAmandaT.mp3"
        audioTitle="Tokyo Atmosphere"
        audioArtist="Lofi Tokyo"
        themeColor="#f1c276"
        audioTheme="Amanda T"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroAmandaT;

// https://www.pinterest.com/pin/7036943162032386/
// https://www.youtube.com/watch?v=aFfEHBH5e_0
