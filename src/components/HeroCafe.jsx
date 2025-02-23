import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroCafe(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/Cafe/BackgroundCafe.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/Cafe/AudioCafe.mp3"
        audioTitle="this is for you"
        audioArtist="LuKremBo"
        themeColor="#f1c276"
        audioTheme="Cafe Hustle"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroCafe;

// https://www.pinterest.com/pin/463378249170812680/
// https://www.youtube.com/watch?v=GC0AhsnDMfc
