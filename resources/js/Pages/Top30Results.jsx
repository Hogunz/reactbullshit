import React, { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import CustomCursor from "@/Components/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import GalleryModal from "@/Components/GalleryModal";
import { SakuraBackground } from "@/Components/SakuraBackground";

export default function Top30Results({ winners }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [galleryFilter, setGalleryFilter] = useState("ALL"); // ALL, GAME, WEBSITE

    // Elite Top 30 Sections
    const eliteGames = winners.filter(w => (w.is_top_30 === true || w.is_top_30 == 1) && w.top_30_category === 'game');
    const eliteWebsites = winners.filter(w => (w.is_top_30 === true || w.is_top_30 == 1) && w.top_30_category === 'website');

    // General Student Gallery (Non-Top 30)
    const generalGallery = winners.filter(w => (w.is_top_30 === false || w.is_top_30 == 0));
    const filteredGallery = galleryFilter === "ALL" 
        ? generalGallery 
        : generalGallery.filter(w => w.top_30_category?.toLowerCase() === galleryFilter.toLowerCase());

    const ProjectGrid = ({ items, title, subtitle, color = "bg-purple", isElite = false }) => (
        <div className="mb-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4 gap-8">
                <div className="flex flex-col">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
                        {title}
                    </h2>
                    <div className={`w-24 h-2 ${color} mb-6`}></div>
                    <p className="text-gray-500 text-lg max-w-2xl">{subtitle}</p>
                </div>
                
                {/* Filter Buttons for General Gallery */}
                {!isElite && generalGallery.length > 0 && (
                    <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
                        {["ALL", "GAME", "WEBSITE"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setGalleryFilter(type)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                    galleryFilter === type 
                                    ? 'bg-purple text-white shadow-lg scale-105' 
                                    : 'text-gray-500 hover:text-white'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                )}
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
                        {isElite && (
                            <div className="absolute top-6 left-6 z-30">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-500/90 backdrop-blur-md flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(234,179,8,0.3)] border border-white/20">
                                    {index + 1}
                                </div>
                            </div>
                        )}

                        {/* Creator Label (Optional) */}
                        {winner.creator_major && (
                            <div className="absolute top-6 right-6 z-30">
                                <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                                    {winner.creator_major}
                                </div>
                            </div>
                        )}

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
                            <p className={`font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2 ${isElite ? 'text-yellow-500' : 'text-purple-400'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isElite ? 'bg-yellow-500' : 'bg-purple-400'}`}></span>
                                {isElite ? 'TOP 30 ELITE' : 'STUDENT CREATION'}
                            </p>
                            <h3 className={`text-3xl font-black text-white leading-tight transition-colors ${isElite ? 'group-hover:text-yellow-400' : 'group-hover:text-purple-300'}`}>
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

            <div className="min-h-screen bg-[#070708] text-white selection:bg-purple selection:text-white relative overflow-x-hidden">
                {/* Sakura Background Layer */}
                <SakuraBackground petalCount={25} />

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
                        {eliteGames.length > 0 && (
                            <ProjectGrid 
                                items={eliteGames} 
                                title="TOP GAMES" 
                                subtitle="Celebrating the most innovative and immersive game developments from our talented student developers."
                                isElite={true}
                            />
                        )}

                        {eliteWebsites.length > 0 && (
                            <ProjectGrid 
                                items={eliteWebsites} 
                                title="TOP WEBSITES" 
                                subtitle="Showcasing high-end web applications and digital platforms that push the boundaries of design and functionality."
                                isElite={true}
                            />
                        )}

                        <ProjectGrid 
                            items={filteredGallery} 
                            title="STUDENT GALLERY" 
                            subtitle="A showcase of digital creativity and technical skill from our entire student body."
                            color="bg-white/20"
                            isElite={false}
                        />

                        {winners.length === 0 && (
                            <div className="py-40 text-center">
                                <div className="inline-block p-8 rounded-[3rem] bg-zinc-900 border border-white/5">
                                    <h3 className="text-2xl font-bold text-white mb-2">No Projects Uploaded Yet</h3>
                                    <p className="text-gray-500 max-w-sm mx-auto">The digital showcase is currently being curated. Check back soon!</p>
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
