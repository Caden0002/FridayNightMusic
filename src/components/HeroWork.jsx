import AudioPlayer from './AudioPlayer.jsx';
import Note from './Note.jsx';

function HeroWork(props) {

    return (
        <div className="relative h-screen flex">
            {/* Background GIF */}
            <img
                src='/Work/BackgroundWork.gif'
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover object-left"
                style={{ zIndex: -1 }}
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc='/Work/AudioWork.mp3'
                audioTitle='Show Me How'
                audioArtist='Men I Trust'
                themeColor='#e5d6ae'
                audioTheme='0530PM'
            />

            {/* Note Component */}
            <Note />
        </div>
    );
}

export default HeroWork;
