import Yamiyo from '/Yamiyo.mp3';
import Background from '/BackgroundStudy.gif';
import AudioPlayer from './AudioPlayer.jsx';
import Note from './Note.jsx';

function Hero(props) {

    return (
        <div className="relative h-screen flex">
            {/* Background GIF */}
            <img
                src={Background}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: -1 }}
            />

            {/* Audio Player */}
            <AudioPlayer
                audioSrc={Yamiyo}
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

export default Hero;
