import AudioPlayer from "./AudioPlayer.jsx";
import Note from "./Note.jsx";
import Menu from "./Menu.jsx";

function HeroRain(props) {
  return (
    <div className="relative min-h-screen h-[100dvh] flex">
      {/* Background GIF */}
      <img
        src="/Rain/BackgroundRain.gif"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      />

      {/* Audio Player */}
      <AudioPlayer
        audioSrc="/Rain/AudioRain.mp3"
        audioTitle="Of Frogs & Lilypads"
        audioArtist="Seycara"
        themeColor="#b3dedc"
        audioTheme="Rainy Reverie"
      />

      {/* Note Component */}
      <Note />

      {/* Menu Component */}
      <Menu />
    </div>
  );
}

export default HeroRain;

// https://www.youtube.com/watch?v=m1yShL2EORs
// https://media1.tenor.com/m/O5-9NwLytp4AAAAd/minimoss-pixel-art.gif
