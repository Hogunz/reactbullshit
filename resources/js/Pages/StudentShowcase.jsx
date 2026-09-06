import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import CustomCursor from "@/Components/CustomCursor";
import { motion } from "framer-motion";
import GalleryModal from "@/Components/GalleryModal";
import { SakuraBackground } from "@/Components/SakuraBackground";

export default function StudentShowcase({ winners = [] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [galleryFilter, setGalleryFilter] = useState("ALL");

    const topGames = winners.filter(
        (w) => (w.is_top_30 === true || w.is_top_30 == 1) && w.top_30_category === "game"
    );
    const topWebsites = winners.filter(
        (w) => (w.is_top_30 === true || w.is_top_30 == 1) && w.top_30_category === "website"
    );
    const generalGallery = winners.filter(
        (w) => w.is_top_30 === false || w.is_top_30 == 0
    );
    const filteredGallery =
        galleryFilter === "ALL"
            ? generalGallery
            : generalGallery.filter(
                  (w) => w.top_30_category?.toLowerCase() === galleryFilter.toLowerCase()
              );

    const openModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const ProjectCard = ({ winner, isElite = false }) => {
        const firstImg =
            winner.images && winner.images.length > 0 ? winner.images[0] : null;

        return (
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-2xl"
                onClick={() => openModal(winner)}
            >
                {winner.creator_major && (
                    <div className="absolute top-5 right-5 z-30">
                        <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                            {winner.creator_major}
                        </div>
                    </div>
                )}

                {winner.images && winner.images.length > 1 && (
                    <div className="absolute top-5 left-5 z-30 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold">
                        {winner.images.length} files
                    </div>
                )}

                <div className="absolute inset-0 z-0">
                    {firstImg ? (
                        <>
                            {firstImg.media_type === "video" ? (
                                <video
                                    src={firstImg.media_path}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    muted
                                    loop
                                    playsInline
                                    onMouseOver={(e) => e.target.play()}
                                    onMouseOut={(e) => e.target.pause()}
                                />
                            ) : (
                                <img
                                    src={firstImg.media_path}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                    alt={winner.title}
                                />
                            )}
                        </>
                    ) : (
                        <div className="w-full h-full bg-zinc-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent group-hover:via-transparent transition-all duration-700" />
                </div>

                <div className="absolute bottom-0 left-0 p-7 w-full z-20">
                    <p
                        className={`font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2 ${
                            isElite ? "text-yellow-400" : "text-purple-400"
                        }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                isElite ? "bg-yellow-400" : "bg-purple-400"
                            }`}
                        />
                        {isElite ? "TOP PICK" : "STUDENT WORK"}
                    </p>
                    <h3
                        className={`text-2xl font-black text-white leading-snug transition-colors ${
                            isElite
                                ? "group-hover:text-yellow-400"
                                : "group-hover:text-purple-300"
                        }`}
                    >
                        {winner.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            View Details
                        </span>
                        <svg
                            className="w-4 h-4 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
        );
    };

    const Section = ({ items, title, accentColor = "bg-purple", isElite = false }) => {
        if (items.length === 0) return null;
        return (
            <div className="mb-24 md:mb-40">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 px-4 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-3 uppercase text-white">
                            {title}
                        </h2>
                        <div className={`w-16 md:w-24 h-1.5 md:h-2 ${accentColor}`} />
                    </div>

                    {!isElite && generalGallery.length > 0 && (
                        <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-white/5 backdrop-blur-xl w-fit">
                            {["ALL", "GAME", "WEBSITE"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setGalleryFilter(type)}
                                    className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                        galleryFilter === type
                                            ? "bg-purple text-white shadow-md"
                                            : "text-gray-500 hover:text-white"
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {items.map((winner) => (
                        <ProjectCard key={winner.id} winner={winner} isElite={isElite} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <Head title="Student Showcase | Hall of Fame" />
            <CustomCursor />

            <div className="min-h-screen bg-[#070708] text-white selection:bg-purple selection:text-white relative overflow-x-hidden">
                <NavBar />
                <SakuraBackground petalCount={20} />

                <section className="relative pt-36 pb-16 px-4 overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-fuchsia-900/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-purple mb-5">
                                Hall of Fame
                            </p>
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-5">
                                STUDENT{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-purple/60 to-white">
                                    SHOWCASE
                                </span>
                            </h1>
                            <p className="text-gray-500 text-sm md:text-base font-medium tracking-widest uppercase">
                                Games · Websites · Student Creations
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="pb-20 px-0">
                    <div className="max-w-7xl mx-auto">
                        <Section
                            items={topGames}
                            title="Top Games"
                            accentColor="bg-yellow-400"
                            isElite={true}
                        />
                        <Section
                            items={topWebsites}
                            title="Top Websites"
                            accentColor="bg-yellow-400"
                            isElite={true}
                        />
                        <Section
                            items={filteredGallery}
                            title="Student Gallery"
                            accentColor="bg-white/20"
                            isElite={false}
                        />

                        {winners.length === 0 && (
                            <div className="py-40 text-center px-4">
                                <div className="inline-block p-10 rounded-[2rem] bg-zinc-900 border border-white/5">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        No entries yet
                                    </h3>
                                    <p className="text-gray-500 text-sm">Check back soon.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <GalleryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    initialItem={selectedItem}
                    allItems={winners}
                />
            </div>
        </>
    );
}
