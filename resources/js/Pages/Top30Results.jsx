import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import CustomCursor from "@/Components/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import GalleryModal from "@/Components/GalleryModal";

export default function Top30Results({ winners }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const games = winners.filter(w => w.top_30_category === 'game');
    const websites = winners.filter(w => w.top_30_category === 'website');

    const ProjectGrid = ({ items, title, subtitle }) => (
        <div className="mb-32">
            <div className="flex flex-col mb-16 px-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                    {title}
                </h2>
                <div className="w-24 h-2 bg-purple mb-6"></div>
                <p className="text-gray-500 text-lg max-w-2xl">{subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {items.map((winner, index) => (
                    <motion.div
                        key={winner.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-2xl"
                        onClick={() => {
                            setSelectedItem(winner);
                            setModalOpen(true);
                        }}
                    >
                        {/* Rank Badge */}
                        <div className="absolute top-6 left-6 z-30">
                            <div className="w-12 h-12 rounded-2xl bg-purple/90 backdrop-blur-md flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] border border-white/20">
                                {index + 1}
                            </div>
                        </div>

                        {/* Major Label */}
                        <div className="absolute top-6 right-6 z-30">
                            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent group-hover:via-transparent transition-all duration-700"></div>
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
                            <p className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                                PROJECT WINNER
                            </p>
                            <h3 className="text-3xl font-black text-white leading-tight group-hover:text-purple-300 transition-colors">
                                {winner.title}
                            </h3>
                            <div className="mt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">View Project Details</span>
                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <Head title="Top 30 Showcase | Hall of Fame" />
            <CustomCursor />
            <NavBar />

            <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple selection:text-white">
                {/* Hero / Header */}
                <section className="relative pt-32 pb-12 px-4 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[120px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 leading-none">
                                TOP 30 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple/50 to-white">
                                    HALL OF FAME
                                </span>
                            </h1>
                            <p className="text-gray-500 text-lg md:text-xl font-medium tracking-widest uppercase mb-12">Recognizing Student Excellence in Technology</p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="pb-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        {games.length > 0 && (
                            <ProjectGrid 
                                items={games} 
                                title="TOP GAMES" 
                                subtitle="Celebrating the most innovative and immersive game developments from our talented student developers."
                            />
                        )}

                        {websites.length > 0 && (
                            <ProjectGrid 
                                items={websites} 
                                title="TOP WEBSITES" 
                                subtitle="Showcasing high-end web applications and digital platforms that push the boundaries of design and functionality."
                            />
                        )}

                        {winners.length === 0 && (
                            <div className="py-40 text-center">
                                <div className="inline-block p-8 rounded-[3rem] bg-zinc-900 border border-white/5">
                                    <h3 className="text-2xl font-bold text-white mb-2">No Winners Revealed Yet</h3>
                                    <p className="text-gray-500 max-w-sm mx-auto">The Hall of Fame is currently being curated. Check back soon!</p>
                                </div>
                            </div>
                        )}
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
