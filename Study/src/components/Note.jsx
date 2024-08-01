import { useState } from 'react';
import Lottie from 'lottie-react';
import Astronaut from '../../Lottie/AstronautMusic.json';
import { motion, AnimatePresence } from 'framer-motion';

function Note() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="hidden sm:block fixed bottom-2 right-2 z-20">
            {/* Astronaut Animation */}
            <div
                onClick={handleClick}
                className="transition-transform duration-300 ease-in-out w-28 h-28 flex items-center justify-center cursor-pointer rounded-lg shadow-lg"
            >
                <Lottie animationData={Astronaut} loop={true} style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Dialog Box */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -50 }}
                        exit={{ opacity: 0, scale: 0.5, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                        className="absolute bottom-14 right-4 mb-2 p-3 shadow-lg w-44 bg-[#000]/[.7] rounded"
                        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}
                    >
                        <p className="text-xs text-white">
                            Turn off sleep mode,<br />
                            Fullscreen your browser,<br />
                            And enjoy the vibe.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Note;
