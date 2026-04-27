import React, { useState } from "react";
import { NavBar } from "@/Components/NavBar";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnersPage({ partners }) {
    const [selectedId, setSelectedId] = useState(null);
    const selectedPartner = partners.find(p => p.id === selectedId);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 },
        },
    };

    return (
        <div className="bg-light dark:bg-dark min-h-screen scroll-smooth relative overflow-hidden">
            <NavBar />
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple/20 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />

            <div className="pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-purple/10 border border-purple/20 text-purple text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            Global Network
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-dark dark:text-light tracking-tight mb-6 leading-tight">
                            Our Industry <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500 drop-shadow-sm">Partners</span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                            We collaborate with global technology leaders to provide our students with the best tools, resources, and opportunities to shape the future.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                        {partners.map((partner) => (
                            <motion.div 
                                key={partner.id} 
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                onClick={() => setSelectedId(partner.id)}
                                className="group relative flex flex-col items-center justify-center p-10 h-64 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden transition-all duration-500 cursor-pointer"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple/0 via-purple/0 to-purple/0 group-hover:from-purple/10 group-hover:via-fuchsia-500/5 group-hover:to-purple/10 transition-all duration-500" />
                                
                                {/* Border gradient on hover */}
                                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple/30 transition-all duration-500" />

                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-28 w-auto object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-110 relative z-10 drop-shadow-md"
                                />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-white/90 dark:from-black/80 to-transparent flex justify-center items-end pb-6">
                                    <span className="text-xs font-bold text-dark dark:text-light tracking-wide bg-white/50 dark:bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">Click for details</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedId && selectedPartner && (
                    <motion.div 
                        className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div 
                            className="bg-white/90 dark:bg-dark/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl max-w-2xl w-full relative border border-white/20 dark:border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedId(null)} 
                                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-purple dark:hover:text-purple hover:bg-purple/10 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="h-48 md:h-56 w-full mb-8 flex items-center justify-center">
                                    <img src={selectedPartner.logo} alt={selectedPartner.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-lg" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-dark dark:text-light mb-6 text-center tracking-tight">
                                    {selectedPartner.name}
                                </h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-purple to-fuchsia-500 rounded-full mb-6"></div>
                                <p className="text-gray-600 dark:text-gray-300 text-center text-lg leading-relaxed max-w-xl mx-auto">
                                    {selectedPartner.description ? (
                                        <span dangerouslySetInnerHTML={{ __html: selectedPartner.description.replace(/\n/g, '<br />') }} />
                                    ) : (
                                        <span className="italic text-gray-400">Partner details coming soon.</span>
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
