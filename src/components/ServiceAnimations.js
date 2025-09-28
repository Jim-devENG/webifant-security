import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaSearch, FaCogs, FaGraduationCap, FaTools } from "react-icons/fa";

const ServiceAnimations = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Rotating Security Icons */}
            <motion.div
                className="absolute top-10 left-1/4 text-cyan-400 opacity-30"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <FaShieldAlt size={50} />
            </motion.div>

            <motion.div
                className="absolute top-20 right-1/4 text-cyan-400 opacity-25"
                animate={{
                    rotate: [360, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <FaSearch size={40} />
            </motion.div>

            <motion.div
                className="absolute bottom-20 left-1/3 text-cyan-400 opacity-20"
                animate={{
                    rotate: [0, -360],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <FaCogs size={45} />
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-1/3 text-cyan-400 opacity-30"
                animate={{
                    rotate: [360, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <FaGraduationCap size={35} />
            </motion.div>

            <motion.div
                className="absolute top-1/2 left-10 text-cyan-400 opacity-25"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <FaTools size={40} />
            </motion.div>

            {/* Floating Data Points */}
            {[...Array( 12 )].map( ( _, i ) => (
                <motion.div
                    key={`data-${i}`}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                        left: `${10 + ( i * 7 ) % 80}%`,
                        top: `${20 + ( i * 5 ) % 60}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                />
            ) )}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path
                    d="M 100 200 Q 300 100 500 200"
                    stroke="rgba(34, 211, 238, 0.2)"
                    strokeWidth="1"
                    fill="none"
                    animate={{
                        pathLength: [0, 1, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.path
                    d="M 200 300 Q 400 200 600 300"
                    stroke="rgba(34, 211, 238, 0.15)"
                    strokeWidth="1"
                    fill="none"
                    animate={{
                        pathLength: [0, 1, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </svg>

            {/* Scanning Grid */}
            <div className="absolute inset-0 opacity-5">
                {[...Array( 20 )].map( ( _, i ) => (
                    <motion.div
                        key={`grid-${i}`}
                        className="absolute w-1 h-1 bg-cyan-400"
                        style={{
                            left: `${( i * 5 ) % 100}%`,
                            top: `${( i * 3 ) % 100}%`,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ) )}
            </div>
        </div>
    );
};

export default ServiceAnimations; 