import React from 'react';

export default function Partnership({ partners = [] }) {

    return (
        <>
            <section className="relative py-16 bg-[#FDFDFC] dark:bg-[#0a0a0a] overflow-hidden border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Industry <span className="text-purple-600 dark:text-purple-500">Partners</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Collaborating with global leaders to shape the future of technology.
                    </p>
                </div>

                <div className="relative w-full">
                    {/* Gradient Masks for smooth fade effect at edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FDFDFC] dark:from-[#0a0a0a] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FDFDFC] dark:from-[#0a0a0a] to-transparent z-10"></div>

                    {/* Scrolling Track */}
                    <div className="flex overflow-hidden group">
                        <div className="flex space-x-24 animate-infinite-scroll group-hover:paused">
                            {/* First Set */}
                            {partners.map((partner, index) => (
                                <div
                                    key={`partner-1-${index}`}
                                    className="flex items-center justify-center w-72 h-40 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                            ))}
                            {/* Duplicate Set for seamless loop */}
                            {partners.map((partner, index) => (
                                <div
                                    key={`partner-2-${index}`}
                                    className="flex items-center justify-center w-72 h-40 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                            ))}
                            {/* Triplicate Set for wider screens to ensure no gaps */}
                            {partners.map((partner, index) => (
                                <div
                                    key={`partner-3-${index}`}
                                    className="flex items-center justify-center w-72 h-40 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 20s linear infinite;
                }
                .group-hover\\:paused:hover {
                    animation-play-state: paused;
                }
            `}</style>
            </section>

        </>
    );
}