import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryModal({ isOpen, onClose, initialItem, initialCategory, allItems }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (isOpen && allItems) {
            let categoryItems = [];
            let startIdx = 0;

            if (initialItem) {
                categoryItems = allItems.filter(item => item.category === initialItem.category);
                startIdx = categoryItems.findIndex(item => item.id === initialItem.id);
            } else if (initialCategory) {
                categoryItems = allItems.filter(item => item.category === initialCategory);
                startIdx = 0;
            }

            setFilteredItems(categoryItems);
            setCurrentIndex(startIdx >= 0 ? startIdx : 0);
            setCurrentImageIndex(0);
        }
    }, [isOpen, initialItem, initialCategory, allItems]);

    const currentEntry = filteredItems[currentIndex];
    const entryImages = currentEntry?.images || [];
    const currentMedia = entryImages[currentImageIndex] || null;

    // Fallback: if no images relation, try legacy media_path
    const fallbackMedia = !currentMedia && currentEntry ? {
        media_path: currentEntry.media_path,
        media_type: currentEntry.media_type,
    } : null;
    const displayMedia = currentMedia || fallbackMedia;

    const handleNextEntry = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
        setCurrentImageIndex(0);
    };

    const handlePrevEntry = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        setCurrentImageIndex(0);
    };

    const handleNextImage = () => {
        if (entryImages.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % entryImages.length);
        }
    };

    const handlePrevImage = () => {
        if (entryImages.length > 1) {
            setCurrentImageIndex((prev) => (prev - 1 + entryImages.length) % entryImages.length);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") {
                if (entryImages.length > 1) {
                    handleNextImage();
                } else {
                    handleNextEntry();
                }
            }
            if (e.key === "ArrowLeft") {
                if (entryImages.length > 1) {
                    handlePrevImage();
                } else {
                    handlePrevEntry();
                }
            }
            if (e.key === "ArrowUp") handlePrevEntry();
            if (e.key === "ArrowDown") handleNextEntry();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredItems, entryImages.length, currentImageIndex]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {/* Content Container */}
                    <div className="w-full max-w-7xl h-full flex flex-col md:flex-row gap-8 items-center justify-center">

                        {/* Image Section */}
                        <div className="relative w-full md:w-3/4 h-[50vh] md:h-[80vh] flex items-center justify-center">

                            {/* Entry Navigation Arrows (outside the image, for switching between entries) */}
                            {filteredItems.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevEntry}
                                        className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-purple hover:scale-110 transition-all z-20 hidden md:block"
                                    >
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button
                                        onClick={handleNextEntry}
                                        className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-purple hover:scale-110 transition-all z-20 hidden md:block"
                                    >
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </>
                            )}

                            <motion.div
                                key={`${currentEntry?.id}-${currentImageIndex}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-dark flex items-center justify-center p-2"
                            >
                                {displayMedia?.media_type === 'video' ? (
                                    <video
                                        src={displayMedia?.media_path}
                                        className="w-full h-full object-contain"
                                        controls
                                        autoPlay
                                        controlsList="nodownload"
                                    />
                                ) : (
                                    <img
                                        src={displayMedia?.media_path}
                                        alt={currentEntry?.title}
                                        className="w-full h-full object-contain"
                                    />
                                )}

                                {/* Image counter overlay (within-entry) */}
                                {entryImages.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                                        <button onClick={handlePrevImage} className="p-1.5 rounded-full bg-black/60 text-white hover:bg-purple/80 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <span className="text-white/70 text-xs font-mono bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                                            {currentImageIndex + 1} / {entryImages.length}
                                        </span>
                                        <button onClick={handleNextImage} className="p-1.5 rounded-full bg-black/60 text-white hover:bg-purple/80 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-1/4 flex flex-col justify-end md:justify-center text-white space-y-4 md:space-y-6">
                            <motion.div
                                key={`info-${currentEntry?.id}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="inline-block px-3 py-1 rounded-full bg-purple/20 text-purple text-xs md:text-sm font-mono mb-2">
                                    {currentEntry?.category}
                                </span>
                                {currentEntry?.is_top_30 && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                            Hall of Fame
                                        </div>
                                    </div>
                                )}
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                    {currentEntry?.title}
                                </h2>
                                <div className="h-1 w-20 bg-purple mt-4 rounded-full" />

                                <div className="mt-8 text-white/50 text-sm font-mono">
                                    Entry {currentIndex + 1} / {filteredItems.length}
                                    {entryImages.length > 1 && (
                                        <span className="ml-3 text-purple/70">• {entryImages.length} images</span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Thumbnail Strip — shows images within the current entry */}
                            {entryImages.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto py-2 mt-4 mask-fade-right">
                                    {entryImages.map((img, idx) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${idx === currentImageIndex ? "ring-2 ring-purple opacity-100" : "opacity-50 hover:opacity-100"
                                                }`}
                                        >
                                            {img.media_type === 'video' ? (
                                                <video src={img.media_path} className="w-full h-full object-cover" muted />
                                            ) : (
                                                <img src={img.media_path} alt={currentEntry?.title} className="w-full h-full object-cover" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Entry thumbnails — for navigating between entries (show only if >1 entry) */}
                            {filteredItems.length > 1 && (
                                <div>
                                    <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest mb-2">All Entries</p>
                                    <div className="flex gap-2 overflow-x-auto py-2">
                                        {filteredItems.map((item, idx) => {
                                            const thumb = item.images && item.images.length > 0 ? item.images[0] : null;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => { setCurrentIndex(idx); setCurrentImageIndex(0); }}
                                                    className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${idx === currentIndex ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-80"}`}
                                                >
                                                    {thumb ? (
                                                        thumb.media_type === 'video' ? (
                                                            <video src={thumb.media_path} className="w-full h-full object-cover" muted />
                                                        ) : (
                                                            <img src={thumb.media_path} alt={item.title} className="w-full h-full object-cover" />
                                                        )
                                                    ) : (
                                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/30 text-[8px]">N/A</div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
