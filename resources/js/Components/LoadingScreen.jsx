import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function LoadingScreen({ onFinished }) {
    const container = useRef(null);
    const [isComplete, setIsComplete] = useState(false);

    // Ensure scroll lock is cleaned up on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

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

        // Initial setup - hidden
        gsap.set(words, { opacity: 0, scale: 0.85 });

        // Fast, punchy flash sequence without long delays
        words.forEach((word, index) => {
            if (index < words.length - 1) {
                tl.to(word, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" })
                  .to(word, { opacity: 0, scale: 1.05, duration: 0.15, ease: "power2.in" }, "+=0.12");
            } else {
                // Final Word "SITE."
                tl.to(word, { opacity: 1, scale: 1.15, duration: 0.3, ease: "back.out(1.2)" });
            }
        });

        // Instant curtain reveal - smooth and cinematic with no waiting delay
        tl.to('.curtain-top', { yPercent: -100, duration: 0.65, ease: "power4.inOut" }, "+=0.15")
          .to('.curtain-bottom', { yPercent: 100, duration: 0.65, ease: "power4.inOut" }, "<")
          .to('.flash-word-final', { opacity: 0, scale: 1.4, duration: 0.35, ease: "power2.in" }, "<");

    }, { scope: container });

    if (isComplete) return null; // Remove entirely from DOM

    const wordsList = ["BSIT.", "BSCS.", "#SITEtakesCTRL", "SITE."];

    return (
        <div ref={container} className="preloader-container fixed inset-0 z-[99999] pointer-events-none flex flex-col">
            {/* Split Curtains */}
            <div className="curtain-top w-full h-[50vh] bg-gray-950 relative overflow-hidden pointer-events-auto">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            </div>

            <div className="curtain-bottom w-full h-[50vh] bg-gray-950 relative overflow-hidden pointer-events-auto">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            </div>

            {/* Centered Flashing Words */}
            <div className="absolute inset-0 flex items-center justify-center">
                {wordsList.map((word, index) => (
                    <span
                        key={index}
                        className={`flash-word absolute text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white ${
                            index === wordsList.length - 1
                                ? 'flash-word-final text-transparent bg-clip-text bg-white shadow-xl drop-shadow-2xl'
                                : ''
                        }`}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
}
