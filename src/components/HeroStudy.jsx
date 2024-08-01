import AudioPlayer from './AudioPlayer.jsx';
import Note from './Note.jsx';

function HeroStudy(props) {

    return (
        <div className="relative h-screen flex">
            {/* Background GIF */}
            <img
                src='/Study/BackgroundStudy.gif'
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1 }}
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc='/Study/AudioStudy.mp3'
                audioTitle='Yamiyo Lo-fi'
                audioArtist='Kijugo'
                themeColor='#d15f50'
                audioTheme='STUDY'

            />

            {/* Note Component */}
            <Note />
        </div>
    );
}

export default HeroStudy;
