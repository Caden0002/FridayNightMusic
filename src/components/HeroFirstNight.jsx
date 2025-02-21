import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroFirstNight(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/FirstNight/BackgroundFirstNight.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/FirstNight/AudioFirstNight.mp3"
        audioTitle="Stranger's Sweater"
        audioArtist="Emi Choi"
        themeColor="#ad86c7"
        audioTheme="FIRST NIGHT"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroFirstNight;
