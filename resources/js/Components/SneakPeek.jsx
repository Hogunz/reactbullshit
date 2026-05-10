import React from 'react';

export default function SneakPeek({ title, subtitle }) {
    return (
        <section className="relative py-24 bg-[#FDFDFC] dark:bg-[#0a0a0a] overflow-hidden border-t border-gray-100 dark:border-white/5">

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* The "Retro Window" Container */}
                <div className="relative bg-gray-900 rounded-xl border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden transform transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]">
                    
                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-purple-500/30 bg-gray-900/80 backdrop-blur-md">
                        <div className="flex items-center space-x-2">
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>

                    {/* Window Content */}
                    <div className="relative p-8 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden">
                        
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
