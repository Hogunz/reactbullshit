import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryModal({ isOpen, onClose, initialItem, initialCategory, allItems }) {
    const [currentIndex, setCurrentIndex] = useState(0);
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
        }
    }, [isOpen, initialItem, initialCategory, allItems]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredItems]);

    if (!isOpen) return null;

    const currentItem = filteredItems[currentIndex];

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

                            {/* Navigation Arrows (Desktop) */}
                            {filteredItems.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-purple hover:scale-110 transition-all z-20 hidden md:block"
                                    >
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-purple hover:scale-110 transition-all z-20 hidden md:block"
                                    >
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </>
                            )}

                            <motion.div
                                key={currentItem?.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-dark"
                            >
                                <img
                                    src={currentItem?.image_path}
                                    alt={currentItem?.title}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-1/4 flex flex-col justify-end md:justify-center text-white space-y-4 md:space-y-6">
                            <motion.div
                                key={`info-${currentItem?.id}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="inline-block px-3 py-1 rounded-full bg-purple/20 text-purple text-xs md:text-sm font-mono mb-2">
                                    {currentItem?.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                    {currentItem?.title}
                                </h2>
                                <div className="h-1 w-20 bg-purple mt-4 rounded-full" />

                                <div className="mt-8 text-white/50 text-sm font-mono">
                                    {currentIndex + 1} / {filteredItems.length}
                                </div>
                            </motion.div>

                            {/* Thumbnail Strip (Optional, for context) */}
                            {filteredItems.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto py-2 mt-4 mask-fade-right">
                                    {filteredItems.map((item, idx) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setCurrentIndex(idx)}
                                            className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${idx === currentIndex ? "ring-2 ring-purple opacity-100" : "opacity-50 hover:opacity-100"
                                                }`}
                                        >
                                            <img src={item.image_path} alt={item.title} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
