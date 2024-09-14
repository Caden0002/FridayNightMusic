import AudioPlayer from './AudioPlayer.jsx';
import Note from './Note.jsx';
import Menu from './Menu.jsx';

function HeroGina(props) {
    return (
        <div className="relative h-screen flex">
            {/* Background Video */}
            <video
                src='/Gina/BackgroundGina.mp4'
                alt="Background"
                className="absolute inset-0 w-full h-full object-full"
                style={{ zIndex: -1 }}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc='/Gina/AudioGina.mp3'
                audioTitle="In A Manner Of Speaking"
                audioArtist='Nouvelle Vague'
                themeColor='#721A07'
                audioTheme='GINA'
            />

            {/* Note Component */}
            <Note />

            {/* Menu Component */}
            <Menu />
        </div>
    );
}

export default HeroGina;