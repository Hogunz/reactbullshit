import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import CustomCursor from "@/Components/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import GalleryModal from "@/Components/GalleryModal";

export default function Top30Results({ winners }) {
    const [selectedMajor, setSelectedMajor] = useState("ALL");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const majors = [
        { id: "ALL", name: "All Projects", color: "bg-purple" },
        { id: "MMA", name: "Multimedia (ITEM)", color: "bg-rose-500" },
        { id: "WMAD", name: "Web Dev (ITEW)", color: "bg-blue-500" },
        { id: "NICS", name: "Networking (ITEN)", color: "bg-emerald-500" },
        { id: "CSE", name: "Comp Science (CSE)", color: "bg-amber-500" },
    ];

    const filteredWinners = selectedMajor === "ALL"
        ? winners
        : winners.filter(w => w.program === selectedMajor);

    return (
        <>
            <Head title="Top 30 Showcase | Hall of Fame" />
            <CustomCursor />
            <NavBar />

            <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500 selection:text-black">
                {/* Hero / Header */}
                <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple/20 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
                                TOP 30 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-purple-500">
                                    HALL OF FAME
                                </span>
                            </h1>

                        </motion.div>
                    </div>
                </section>

                {/* Filter Controls */}
                <section className="sticky top-[72px] z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-y border-white/5 py-4">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {majors.map((major) => (
                                <button
                                    key={major.id}
                                    onClick={() => setSelectedMajor(major.id)}
                                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${selectedMajor === major.id
                                        ? `${major.color} border-transparent text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] scale-105`
                                        : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                                        }`}
                                >
                                    {major.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Winners Grid */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="popLayout">
                            {filteredWinners.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {filteredWinners.map((winner, index) => (
                                        <motion.div
                                            key={winner.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer"
                                            onClick={() => {
                                                setSelectedItem(winner);
                                                setModalOpen(true);
                                            }}
                                        >
                                            {/* Rank Badge */}
                                            <div className="absolute top-6 left-6 z-30">
                                                <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                                                    {index + 1}
                                                </div>
                                            </div>

                                            {/* Major Label */}
                                            <div className="absolute top-6 right-6 z-30">
                                                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest">
                                                    {winner.program}
                                                </div>
                                            </div>

                                            {/* Media Preview */}
                                            {(() => {
                                                const firstImg = winner.images && winner.images.length > 0 ? winner.images[0] : null;
                                                if (!firstImg) return <div className="absolute inset-0 z-0 bg-zinc-900" />;
                                                return (
                                                    <div className="absolute inset-0 z-0">
                                                        {firstImg.media_type === 'video' ? (
                                                            <video
                                                                src={firstImg.media_path}
                                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                                                muted loop playsInline onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()}
                                                            />
                                                        ) : (
                                                            <img
                                                                src={firstImg.media_path}
                                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                                                alt={winner.title}
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent group-hover:via-transparent transition-all duration-700"></div>
                                                        {winner.images && winner.images.length > 1 && (
                                                            <div className="absolute top-6 left-20 z-30 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
                                                                {winner.images.length} images
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })()}

                                            {/* Info */}
                                            <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                                                <p className="text-yellow-500 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                                    AWARD WINNER
                                                </p>
                                                <h3 className="text-3xl font-black text-white leading-tight group-hover:text-yellow-400 transition-colors">
                                                    {winner.title}
                                                </h3>
                                                <div className="mt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">View Project Details</span>
                                                    <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="py-40 text-center">
                                    <div className="inline-block p-8 rounded-[3rem] bg-zinc-900 border border-white/5">
                                        <svg className="w-16 h-16 mx-auto text-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <h3 className="text-2xl font-bold text-white mb-2">No Winners Revealed Yet</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto">Selected category hasn't had its winners listed on the portal. Check back later!</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* Gallery Modal for Detail View */}
                <GalleryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    initialItem={selectedItem}
                    allItems={winners}
                />

                {/* Footer CTA */}
                <section className="py-32 px-4 text-center bg-[#0d0d0d] border-t border-white/5">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">INSPIRED BY <span className="text-purple">EXCELLENCE?</span></h2>
                        <p className="text-gray-400 text-lg mb-12">Your project could be here next year. Join our program today.</p>
                        <Link
                            href="/Contact"
                            className="inline-block px-12 py-5 rounded-full bg-white text-black font-black text-lg hover:bg-yellow-500 hover:scale-105 transition-all"
                        >
                            ENROLL NOW
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
