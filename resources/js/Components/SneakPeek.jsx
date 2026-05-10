import React, { useState, useEffect, useRef } from 'react';

export default function SneakPeek({ title, subtitle, videoPath }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [hasVideoFinished, setHasVideoFinished] = useState(!videoPath);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (!videoPath || hasVideoFinished) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && videoRef.current) {
                    // Play when in sight
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            setIsVideoPlaying(true);
                        }).catch(e => {
                            console.log("Autoplay with sound prevented, trying muted...", e);
                            videoRef.current.muted = true;
                            setIsMuted(true);
                            videoRef.current.play().then(() => {
                                setIsVideoPlaying(true);
                            }).catch(err => console.log("Muted autoplay also prevented", err));
                        });
                    }
                } else if (!entry.isIntersecting && videoRef.current) {
                    // Pause when out of sight
                    videoRef.current.pause();
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [videoPath, hasVideoFinished]);

    return (
        <section className="relative py-24 bg-[#FDFDFC] dark:bg-[#0a0a0a] overflow-hidden border-t border-gray-100 dark:border-white/5">

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* The "Retro Window" Container */}
                <div 
                    ref={containerRef}
                    className="relative bg-gray-900 rounded-xl border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden transform transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] min-h-[400px] flex flex-col"
                >
                    
                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/30 bg-gray-900/80 backdrop-blur-md z-30">
                        <div className="flex items-center space-x-2">
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>

                    {/* Window Content */}
                    <div className="relative flex-1 flex flex-col items-center justify-center text-center overflow-hidden p-8 md:p-16">
                        
                        {/* Video Layer */}
                        {videoPath && !hasVideoFinished && (
                            <div className={`absolute inset-0 z-20 transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}>
                                <video 
                                    ref={videoRef}
                                    src={videoPath}
                                    className="w-full h-full object-cover"
                                    playsInline
                                    onEnded={() => {
                                        setIsVideoPlaying(false);
                                        setTimeout(() => setHasVideoFinished(true), 1000); // Wait for fade out
                                    }}
                                />
                                {/* Optional dark overlay to make it fit the aesthetic */}
                                <div className="absolute inset-0 bg-purple-900/10 pointer-events-none"></div>

                                {isMuted && (
                                    <button 
                                        onClick={() => {
                                            if (videoRef.current) {
                                                videoRef.current.muted = false;
                                                setIsMuted(false);
                                            }
                                        }}
                                        title="Unmute Video"
                                        className="absolute bottom-4 right-4 z-30 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full backdrop-blur transition border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Text Layer */}
                        <div className={`relative z-10 transition-all duration-1000 flex flex-col items-center justify-center ${(videoPath && !hasVideoFinished) ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                            <h2 className="relative text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-widest uppercase mb-6" style={{ textShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
                                {title}
                            </h2>
                            
                            <p className="relative mt-4 text-lg md:text-xl text-purple-100/80 font-medium max-w-2xl mx-auto mb-12 tracking-wide">
                                {subtitle}
                            </p>
                            
                            {/* Neon Action Buttons */}
                            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                                <a 
                                    href="#" 
                                    className="group relative px-6 py-3 font-bold text-white uppercase tracking-wider text-sm transition-all duration-300"
                                >
                                    <span className="absolute inset-0 w-full h-full border-2 border-purple-500 rounded bg-transparent group-hover:bg-purple-500/10 transition-all shadow-[0_0_10px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"></span>
                                    <span className="relative">Visit Showcase</span>
                                </a>

                                {videoPath && hasVideoFinished && (
                                    <button 
                                        onClick={() => setHasVideoFinished(false)}
                                        className="group relative px-6 py-3 font-bold text-white uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center"
                                    >
                                        <span className="absolute inset-0 w-full h-full border-2 border-gray-600 rounded bg-transparent group-hover:bg-gray-800/50 transition-all"></span>
                                        <span className="relative flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Replay Video
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
