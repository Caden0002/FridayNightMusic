import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuLogo from '/MenuLogo.gif'; // Import the GIF image

const slideVariants = {
    hidden: {
        x: '100%', // Start position off the right side of the screen
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    visible: {
        x: '0%', // Slide in to the viewport
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    },
    exit: {
        x: '100%', // Slide out to the right side of the screen
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1, // Adjust delay for stagger effect
        }
    }
};

function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            {/* Burger Icon (Replaced with Image) */}
            <div
                className="fixed top-4 right-4 z-30 cursor-pointer text-white"
                onClick={toggleMenu}
            >
                <img src={MenuLogo} alt="Menu" width={50} height={50} /> {/* Use the image as a button */}
            </div>

            {/* Slide-in Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 bg-[#000]/[.7] rounded-lg shadow-lg"
                        style={{ width: '300px' }}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="flex flex-col items-center space-y-6 mt-24 text-white text-md font-bold"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.a
                                href="https://study.musicplayer.cloud"
                                rel="noopener noreferrer"
                                className=""
                                variants={linkVariants}
                            >
                                STUDY
                            </motion.a>
                            <motion.a
                                href="https://work.musicplayer.cloud"
                                rel="noopener noreferrer"
                                className=""
                                variants={linkVariants}
                            >
                                WORK
                            </motion.a>
                            <motion.a
                                href="https://firstnight.musicplayer.cloud"
                                rel="noopener noreferrer"
                                className=""
                                variants={linkVariants}
                            >
                                FIRST NIGHT
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Menu;
