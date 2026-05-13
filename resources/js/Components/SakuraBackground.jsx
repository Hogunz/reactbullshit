import React from "react";
import { motion } from "framer-motion";

const SakuraPetal = () => {
    const startX = Math.random() * 100;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * -20; 
    const size = 6 + Math.random() * 12;
    const rotate = Math.random() * 360;

    return (
        <motion.div
            initial={{ y: "-10vh", x: `${startX}vw`, rotate: rotate, opacity: 0 }}
            animate={{ 
                y: "110vh",
                x: [`${startX}vw`, `${startX + 10}vw`, `${startX - 5}vw`],
                rotate: rotate + 360,
                opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{ 
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
            }}
            style={{
                position: "fixed",
                width: size,
                height: size,
                backgroundColor: "#ffd1dc", // Soft Sakura Pink
                borderRadius: "100% 0% 100% 0%", // Petal Shape
                zIndex: 1,
                pointerEvents: "none",
                filter: "blur(0.5px)",
                boxShadow: "0 0 8px rgba(255, 209, 220, 0.4)"
            }}
        />
    );
};

export const SakuraBackground = ({ petalCount = 25 }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Atmospheric Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(255,183,197,0.03),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.03),transparent_50%)]"></div>
            
            {/* Falling Petals */}
            {[...Array(petalCount)].map((_, i) => (
                <SakuraPetal key={i} />
            ))}
        </div>
    );
};
