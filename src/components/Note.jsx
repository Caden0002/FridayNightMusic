import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoteInactiveLogo from '/NoteInactiveLogo.jpg'; // Import the inactive logo
import NoteActiveLogo from '/NoteActiveLogo.jpg'; // Import the active logo

function Note() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="hidden sm:block fixed bottom-2 right-2 z-20">
            {/* Note Logo */}
            <div
                onClick={handleClick}
                className="flex items-center justify-center cursor-pointer"
            >
                <img
                    src={isExpanded ? NoteActiveLogo : NoteInactiveLogo}
                    alt="Note"
                    className="w-16 h-16  rounded-lg"
                />
            </div>

            {/* Dialog Box */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -50 }}
                        exit={{ opacity: 0, scale: 0.5, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                        className="absolute bottom-4 right-1 mb-2 p-3 shadow-lg w-56 bg-[#000]/[.5] rounded"
                        style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset" }}
                    >
<p className="text-xs text-white">
  Deactivate Sleep Mode (★ω★)<br />
  Turn on Fullscreen (っ◕‿◕)っ<br />
  Sync with the Vibes ^__^
</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Note;
