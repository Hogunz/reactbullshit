import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function LoadingScreen({ onFinished }) {
    const container = useRef(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        // Lock scrolling while preloader runs
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "unset";
                setIsComplete(true);
                if (onFinished) onFinished();
            }
        });

        const words = gsap.utils.toArray('.flash-word');

        // Initial setup
        gsap.set(words, { opacity: 0, scale: 0.8 });

        // Flash sequence
        words.forEach((word, index) => {
            if (index < words.length - 1) {
                // Flash in faster
                tl.to(word, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" })
                    // Slightly shorter hold time
                    .to(word, { opacity: 0, scale: 1.05, duration: 0.2, ease: "power2.in" }, "+=0.35");
            } else {
                // Final Word "SITE." - Snappier
                tl.to(word, { opacity: 1, scale: 1.2, duration: 0.5, ease: "back.out(1.5)" });
            }
        });

        // The Curtain Reveal - Faster slide out
        tl.to('.curtain-top', { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "+=0.4")
            .to('.curtain-bottom', { yPercent: 100, duration: 0.8, ease: "power4.inOut" }, "<")
            .to('.flash-word-final', { opacity: 0, scale: 1.8, duration: 0.4, ease: "power2.in" }, "<");

    }, { scope: container });

    if (isComplete) return null; // Remove entirely from DOM

    const wordsList = ["BSIT.", "BSCS.", "#SITEtakesCTRL", "SITE."];

    return (
        <div ref={container} className="preloader-container fixed inset-0 z-[99999] pointer-events-none flex flex-col">

            {/* Split Curtains - sleek high-end dark background */}
            <div className="curtain-top w-full h-[50vh] bg-gray-950 relative overflow-hidden pointer-events-auto">
                {/* Subtle gradient overlay to make it look premium */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            </div>

            <div className="curtain-bottom w-full h-[50vh] bg-gray-950 relative overflow-hidden pointer-events-auto">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            </div>

            {/* Centered Flashing Wrapper */}
            <div className="absolute inset-0 flex items-center justify-center">
                {wordsList.map((word, index) => (
                    <span
                        key={index}
                        className={`flash-word absolute text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white ${index === wordsList.length - 1 ? 'flash-word-final text-transparent bg-clip-text bg-white shadow-xl drop-shadow-2xl' : ''}`}
                    >
                        {word}
                    </span>
                ))}
            </div>

        </div>
    );
}
