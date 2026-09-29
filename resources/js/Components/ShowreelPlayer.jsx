import React, { useRef, useState, useEffect } from "react";

export default function ShowreelPlayer({ video, programTag = "FULL-STACK SHOWREEL" }) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Reset playback when video prop changes
        setIsPlaying(false);
        setCurrentTime(0);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [video]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((err) => {
                console.error("Playback error:", err);
            });
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const toggleFullscreen = (e) => {
        e.stopPropagation();
        const container = containerRef.current;
        if (!container) return;
        if (!document.fullscreenElement) {
            container.requestFullscreen?.().catch(() => {});
        } else {
            document.exitFullscreen?.().catch(() => {});
        }
    };

    const handleSeek = (e) => {
        e.stopPropagation();
        const newTime = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    if (!video) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
                <svg className="w-12 h-12 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Showreel Coming Soon</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full cursor-pointer select-none group/player overflow-hidden bg-black flex items-center justify-center"
            onClick={togglePlay}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                ref={videoRef}
                src={video}
                className="w-full h-full object-cover scale-[1.01] transition-transform duration-700"
                playsInline
                loop
                onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Dark vignette overlay when paused */}
            <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? "opacity-0" : "opacity-100"
                }`}
            />

            {/* Big Interactive Play Button in Center */}
            <div
                className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${
                    isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
            >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple/90 hover:bg-purple text-white backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.7)] transform transition-transform group-hover/player:scale-110">
                    <svg className="w-9 h-9 md:w-11 md:h-11 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Corner Status Badges */}
            <div
                className={`absolute top-6 left-6 z-20 text-white/90 font-mono text-[10px] md:text-xs tracking-widest flex items-center gap-2 pointer-events-none transition-opacity duration-300 ${
                    isPlaying && !isHovered ? "opacity-0" : "opacity-100"
                }`}
            >
                <span
                    className={`w-2 h-2 rounded-full ${
                        isPlaying
                            ? "bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                            : "bg-white/40"
                    }`}
                />
                {isPlaying ? "NOW PLAYING" : "CLICK TO PLAY"}
            </div>

            <div
                className={`absolute top-6 right-6 z-20 text-white/70 font-mono text-[10px] md:text-xs tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-300 ${
                    isPlaying && !isHovered ? "opacity-0" : "opacity-100"
                }`}
            >
                {programTag}
            </div>

            {/* Bottom Controls Bar (Shows on hover or when paused) */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-30 transition-all duration-300 flex flex-col gap-2 ${
                    isHovered || !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            >
                {/* Timeline Scrubber */}
                <div className="w-full flex items-center gap-3">
                    <span className="text-[11px] font-mono text-white/70 min-w-[35px]">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple hover:h-2 transition-all"
                    />
                    <span className="text-[11px] font-mono text-white/70 min-w-[35px]">
                        {formatTime(duration)}
                    </span>
                </div>

                {/* Buttons row */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                        {/* Play/Pause Button */}
                        <button
                            type="button"
                            onClick={togglePlay}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* Mute/Unmute Button */}
                        <button
                            type="button"
                            onClick={toggleMute}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Fullscreen"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
