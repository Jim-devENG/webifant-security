import React from "react";
import { motion } from "framer-motion";

const Logo = ( { className = "", size = "text-2xl" } ) => {
    return (
        <motion.div
            className={`font-bold ${size} ${className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <span className="text-cyan-400">Webifant</span>
            <span className="text-white"> Security</span>
        </motion.div>
    );
};

export default Logo; 