import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ZoomIn } from "lucide-react";

export default function ImageModal({ isOpen, onClose, imageSrc, title, category }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !imageSrc) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                {/* Top Bar Controls */}
                <div 
                    className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-20 pointer-events-none"
                >
                    <div className="flex flex-col gap-1 max-w-[70%] pointer-events-auto">
                        {category && (
                            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                                {category}
                            </span>
                        )}
                        {title && (
                            <h3 className="text-sm sm:text-base font-semibold text-gray-200 truncate">
                                {title}
                            </h3>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pointer-events-auto">
                        <a
                            href={imageSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
                            title="Open full image in new tab"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
                            title="Close (Esc)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Modal Image Box */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative max-w-[94vw] max-h-[85vh] flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={imageSrc}
                        alt={title || "Full image view"}
                        className="max-w-[94vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] select-none"
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
