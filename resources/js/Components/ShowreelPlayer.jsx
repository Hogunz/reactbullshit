import React, { useRef, useState, useEffect } from "react";

export default function ShowreelPlayer({
    video,
    programTag = "FULL-STACK SHOWREEL",
    poster,
    onLoaded,
    autoPlay = false,
    defaultMuted = false
}) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(defaultMuted);
    const [isEnded, setIsEnded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setIsPlaying(autoPlay);
        setIsMuted(defaultMuted);
        setIsEnded(false);
        setCurrentTime(0);

        let cleanupListeners = null;

        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            if (autoPlay) {
                videoRef.current.muted = defaultMuted;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                        setIsMuted(videoRef.current ? videoRef.current.muted : defaultMuted);
                    }).catch(() => {
                        // Browser autoplay policy prevented unmuted playback.
                        // Fallback to muted playback so it plays visually, then unmute on first interaction.
                        if (videoRef.current) {
                            videoRef.current.muted = true;
                            setIsMuted(true);
                            videoRef.current.play().then(() => {
                                setIsPlaying(true);
                            }).catch(() => {
                                setIsPlaying(false);
                            });

                            if (!defaultMuted) {
                                const enableSoundOnInteraction = () => {
                                    if (videoRef.current) {
                                        videoRef.current.muted = false;
                                        setIsMuted(false);
                                    }
                                    cleanup();
                                };

                                const cleanup = () => {
                                    window.removeEventListener("click", enableSoundOnInteraction);
                                    window.removeEventListener("keydown", enableSoundOnInteraction);
                                    window.removeEventListener("touchstart", enableSoundOnInteraction);
                                };

                                window.addEventListener("click", enableSoundOnInteraction, { once: true });
                                window.addEventListener("keydown", enableSoundOnInteraction, { once: true });
                                window.addEventListener("touchstart", enableSoundOnInteraction, { once: true });
                                cleanupListeners = cleanup;
                            }
                        }
                    });
                }
            } else {
                videoRef.current.pause();
            }
        }

        return () => {
            if (cleanupListeners) {
                cleanupListeners();
            }
        };
    }, [video, autoPlay, defaultMuted]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isEnded) {
            videoRef.current.currentTime = 0;
            videoRef.current.muted = false;
            setIsMuted(false);
            videoRef.current.play().then(() => {
                setIsPlaying(true);
                setIsEnded(false);
            }).catch((err) => {
                console.error("Playback error:", err);
            });
            return;
        }

        // If video is playing while muted, clicking the player directly enables sound
        if (isPlaying && isMuted) {
            videoRef.current.muted = false;
            setIsMuted(false);
            return;
        }

        if (videoRef.current.paused) {
            videoRef.current.muted = false;
            setIsMuted(false);
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
            if (isEnded && newTime < duration) {
                setIsEnded(false);
            }
        }
    };

    const skip = (seconds, e) => {
        if (e) e.stopPropagation();
        if (!videoRef.current) return;
        const targetDuration = duration || 100;
        const newTime = Math.min(Math.max(0, videoRef.current.currentTime + seconds), targetDuration);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        if (isEnded && newTime < targetDuration) {
            setIsEnded(false);
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
                poster={poster}
                className="w-full h-full object-cover scale-[1.01] transition-transform duration-700"
                playsInline
                muted={isMuted}
                onLoadedData={() => onLoaded && onLoaded()}
                onError={() => onLoaded && onLoaded()}
                onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                onEnded={() => {
                    setIsPlaying(false);
                    setIsEnded(true);
                }}
            />

            {/* Dark vignette overlay when paused or ended */}
            <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-300 pointer-events-none ${
                    isPlaying ? "opacity-0" : "opacity-100"
                }`}
            />

            {/* Big Interactive Play/Replay Button in Center */}
            <div
                className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-300 ${
                    isPlaying ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
                }`}
            >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple/90 hover:bg-purple text-white backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.7)] transform transition-transform group-hover/player:scale-110">
                    {isEnded ? (
                        <svg className="w-9 h-9 md:w-11 md:h-11 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    ) : (
                        <svg className="w-9 h-9 md:w-11 md:h-11 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
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
                            : isEnded
                            ? "bg-purple-400"
                            : "bg-white/40"
                    }`}
                />
                {isPlaying ? "NOW PLAYING" : isEnded ? "REPLAY VIDEO" : "CLICK TO PLAY"}
            </div>

            <div
                className={`absolute top-6 right-6 z-20 text-white/70 font-mono text-[10px] md:text-xs tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-300 ${
                    isPlaying && !isHovered ? "opacity-0" : "opacity-100"
                }`}
            >
                {programTag}
            </div>

            {/* Quick Unmute Floating Button (visible when playing muted and not hovering bottom controls) */}
            {isMuted && isPlaying && !isHovered && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (videoRef.current) {
                            videoRef.current.muted = false;
                            setIsMuted(false);
                        }
                    }}
                    className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 hover:bg-purple-600 text-white text-xs md:text-sm font-semibold tracking-wide backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group/soundbtn"
                    title="Click to enable sound"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                    </span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <span>Click for Sound</span>
                </button>
            )}

            {/* Bottom Controls Bar (Shows on hover or when paused/ended) */}
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
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Rewind 10s Button */}
                        <button
                            type="button"
                            onClick={(e) => skip(-10, e)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Rewind 10s"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                            </svg>
                        </button>

                        {/* Play/Pause/Replay Button */}
                        <button
                            type="button"
                            onClick={togglePlay}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title={isPlaying ? "Pause" : isEnded ? "Replay" : "Play"}
                        >
                            {isPlaying ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : isEnded ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* Fast Forward 10s Button */}
                        <button
                            type="button"
                            onClick={(e) => skip(10, e)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Fast Forward 10s"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                            </svg>
                        </button>

                        {/* Mute/Unmute Button */}
                        <button
                            type="button"
                            onClick={toggleMute}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
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
