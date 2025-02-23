import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroSpace(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/Space/BackgroundSpace.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/Space/AudioSpace.mp3"
        audioTitle="Reflection"
        audioArtist="Purrple Cat"
        themeColor="#f40ee7"
        audioTheme="Alone in Space"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroSpace;

// https://www.youtube.com/watch?v=BswAghW4930
// https://www.pinterest.com/pin/684336105888099480/
