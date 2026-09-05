import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function Highlights({
    badge = 'FEATURED SPOTLIGHT',
    title = 'Hall of Fame Showcase',
    subtitle = 'The results are in! Explore the elite game and web applications developed by our talented IT students.',
    buttonText = 'Enter the Showcase',
    buttonLink = '/HallOfFame',
    mediaPath = null,
    mediaType = 'video',
}) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const isVideo = mediaPath && (mediaType === 'video' || /\.(mp4|webm|ogg)$/i.test(mediaPath));
    const isImage = mediaPath && !isVideo;

    useEffect(() => {
        if (!isVideo || !videoRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.muted = isMuted;
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => setIsPlaying(true))
                            .catch((e) => console.log('Autoplay prevented:', e));
                    }
                } else if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVideo, isMuted, mediaPath]);

    const isExternalLink = buttonLink?.startsWith('http://') || buttonLink?.startsWith('https://');

    return (
        <section className="relative py-20 lg:py-28 bg-[#FDFDFC] dark:bg-[#0a0a0a] overflow-hidden border-t border-gray-100 dark:border-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-0" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={containerRef}
                    className="relative rounded-3xl border border-purple-500/20 dark:border-purple-500/30 bg-white/80 dark:bg-[#121218]/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 dark:shadow-purple-950/30 overflow-hidden transition-all duration-500 hover:border-purple-500/40"
                >
                    {/* Top Subtle Gradient Accent Line */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80" />

                    <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-center text-center">
                        {/* Optional Eyebrow / Badge */}
                        {badge && (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                <span>{badge}</span>
                            </div>
                        )}

                        {/* Title */}
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight uppercase mb-5 leading-tight">
                            {title}
                        </h2>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
                                {subtitle}
                            </p>
                        )}

                        {/* Flexible Media Section (Supports any aspect ratio: landscape, portrait, square) */}
                        {mediaPath && (
                            <div className="w-full max-w-4xl mb-10 rounded-2xl overflow-hidden border border-purple-500/20 dark:border-purple-500/30 shadow-xl relative group bg-black/60 min-h-[220px] max-h-[520px] flex items-center justify-center">
                                {isVideo ? (
                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[260px] max-h-[520px]">
                                        {/* Ambient Blurred Background Layer */}
                                        <video
                                            src={mediaPath}
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                                            playsInline
                                            loop
                                            muted
                                            autoPlay
                                        />

                                        {/* Main Foreground Video */}
                                        <video
                                            ref={videoRef}
                                            src={mediaPath}
                                            className="relative z-10 max-h-[500px] w-auto max-w-full object-contain mx-auto"
                                            playsInline
                                            loop
                                            muted={isMuted}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                        />

                                        {/* Video Sound Toggle */}
                                        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (videoRef.current) {
                                                        const newMuted = !isMuted;
                                                        videoRef.current.muted = newMuted;
                                                        setIsMuted(newMuted);
                                                    }
                                                }}
                                                className="p-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-900 text-white backdrop-blur border border-white/10 transition-all shadow-md hover:scale-105 active:scale-95"
                                                title={isMuted ? "Unmute" : "Mute"}
                                            >
                                                {isMuted ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ) : isImage ? (
                                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[260px] max-h-[520px]">
                                        {/* Ambient Blurred Background Layer */}
                                        <img
                                            src={mediaPath}
                                            alt=""
                                            aria-hidden="true"
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                                        />

                                        {/* Main Foreground Image */}
                                        <img
                                            src={mediaPath}
                                            alt={title}
                                            className="relative z-10 max-h-[500px] w-auto max-w-full object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {/* Call to Action Button */}
                        {buttonText && buttonLink && (
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {isExternalLink ? (
                                    <a
                                        href={buttonLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wider bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                    >
                                        <span>{buttonText}</span>
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                ) : (
                                    <Link
                                        href={buttonLink}
                                        className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wider bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                                    >
                                        <span>{buttonText}</span>
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
