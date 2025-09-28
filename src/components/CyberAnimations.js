import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaEye, FaNetworkWired } from "react-icons/fa";

const CyberAnimations = () => {
    return (
        <>
            {/* Floating Shields */}
            <motion.div
                className="absolute top-20 left-10 text-cyan-400 opacity-20"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <FaShieldAlt size={40} />
            </motion.div>

            <motion.div
                className="absolute top-40 right-20 text-cyan-400 opacity-30"
                animate={{
                    y: [0, 15, 0],
                    rotate: [0, -3, 3, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                <FaLock size={35} />
            </motion.div>

            <motion.div
                className="absolute bottom-40 left-20 text-cyan-400 opacity-25"
                animate={{
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            >
                <FaEye size={30} />
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-10 text-cyan-400 opacity-20"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            >
                <FaNetworkWired size={45} />
            </motion.div>

            {/* Scanning Lines */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{
                    y: [0, "100vh"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                animate={{
                    x: [0, "-100vw"],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                }}
            />

            {/* Digital Particles */}
            {[...Array( 20 )].map( ( _, i ) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                    }}
                />
            ) )}

            {/* Matrix-style Code Rain */}
            {[...Array( 15 )].map( ( _, i ) => (
                <motion.div
                    key={`matrix-${i}`}
                    className="absolute text-cyan-400 text-xs font-mono opacity-30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: "-20px",
                    }}
                    animate={{
                        y: ["-20px", "100vh"],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                >
                    {String.fromCharCode( 0x30A0 + Math.random() * 96 )}
                </motion.div>
            ) )}

            {/* Pulse Rings */}
            <motion.div
                className="absolute top-1/2 left-1/4 w-32 h-32 border border-cyan-400 rounded-full"
                animate={{
                    scale: [0, 2],
                    opacity: [1, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />

            <motion.div
                className="absolute top-1/3 right-1/3 w-24 h-24 border border-cyan-400 rounded-full"
                animate={{
                    scale: [0, 1.5],
                    opacity: [1, 0],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1,
                }}
            />

            {/* Hexagon Grid */}
            <div className="absolute inset-0 opacity-10">
                {[...Array( 8 )].map( ( _, i ) => (
                    <motion.div
                        key={`hex-${i}`}
                        className="absolute w-8 h-8 border border-cyan-400"
                        style={{
                            left: `${20 + i * 10}%`,
                            top: `${30 + ( i % 3 ) * 20}%`,
                            transform: "rotate(45deg)",
                        }}
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ) )}
            </div>
        </>
    );
};

export default CyberAnimations; 