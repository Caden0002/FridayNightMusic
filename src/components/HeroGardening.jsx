import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroGardening(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/Gardening/BackgroundGardening.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/Gardening/AudioGardening.mp3"
        audioTitle="Princess Mononoke"
        audioArtist="Lofi Lia"
        themeColor="#7bffd2"
        audioTheme="Gardening"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroGardening;

// https://www.deviantart.com/neko-kumicho-chan/art/Cibodas-garden-pixel-scenery-835242298
// https://www.youtube.com/watch?v=UcRbOdjHmrc
