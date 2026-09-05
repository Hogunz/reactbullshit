import React, { useState, useEffect } from "react";
import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import { Head } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, X } from "lucide-react";

export default function Recognitions() {
    const [activeModalItem, setActiveModalItem] = useState(null);

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-out-cubic",
        });
    }, []);

    const recognitions = [
        {
            id: "ched",
            logo: (
                <img
                    src="/assets/CHED.svg.webp"
                    alt="Commission on Higher Education"
                    className="max-h-36 sm:max-h-40 max-w-[200px] object-contain drop-shadow-sm"
                />
            ),
            header: "CHED Recognized Program",
            subHeader: "Information Technology Education",
            programs: [
                "Computer Science",
                "Information Technology"
            ],
            details: "The Commission on Higher Education (CHED) recognizes the institution's computing programs under Information Technology Education, ensuring compliance with CHED standards for faculty qualifications, curriculum development, and laboratory facilities."
        },
        {
            id: "picab",
            logo: (
                <img
                    src="/assets/picab.png"
                    alt="PICAB - PCS Information and Computing Accreditation Board"
                    className="max-h-24 sm:max-h-28 max-w-[240px] sm:max-w-[280px] object-contain rounded-md"
                />
            ),
            header: "PICAB-Accredited Program",
            subHeader: null,
            programs: [
                "Information Technology"
            ],
            details: "Accredited by the Philippine Computing Accreditation Board (PICAB) under the Computing Accreditation Commission. PICAB accreditation aligns with the Seoul Accord, recognizing the substantial equivalence of computing degree programs internationally."
        }
    ];

    return (
        <>
            <Head title="Recognitions | SITE" />
            <CustomCursor />
            <NavBar />

            <div className="relative min-h-screen bg-[#FDFDFC] dark:bg-dark overflow-hidden font-sans">
                {/* Subtle Ambient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                    
                    {/* Clean Header */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="text-center mb-16 lg:mb-20"
                    >
                        <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-3">
                            Academics
                        </h3>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-dark dark:text-light">
                            Recognitions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Accreditations</span>
                        </h1>
                    </div>

                    {/* Recognition Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-stretch">
                        {recognitions.map((item, index) => (
                            <div
                                key={item.id}
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay={index * 150}
                                className="relative flex flex-col bg-white dark:bg-[#111111] rounded-2xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-gray-100 dark:border-white/5 min-h-[460px] transition-transform duration-300 hover:-translate-y-1"
                            >
                                {/* Fixed-height Logo Container */}
                                <div className="flex items-center justify-center h-44 w-full mb-6 shrink-0">
                                    {item.logo}
                                </div>

                                {/* Text Content Container - Aligned to the top of this section */}
                                <div className="flex flex-col items-center text-center flex-grow">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {item.header}
                                    </h3>
                                    
                                    {/* Subheader slot with fixed minimum height for consistent alignment */}
                                    <div className="min-h-[24px] flex items-center justify-center mb-3">
                                        {item.subHeader ? (
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {item.subHeader}
                                            </p>
                                        ) : null}
                                    </div>

                                    {/* Programs list */}
                                    <div className="space-y-1.5 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-normal">
                                        {item.programs.map((prog, pIdx) => (
                                            <p key={pIdx}>{prog}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Learn More - Pinned to bottom */}
                                <div className="pt-6 mt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-start shrink-0">
                                    <button
                                        onClick={() => setActiveModalItem(item)}
                                        className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#D9291C] dark:text-[#E85D3F] hover:opacity-80 transition-opacity uppercase tracking-wider cursor-pointer"
                                    >
                                        <span>LEARN MORE</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Modal */}
            {activeModalItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#161616] p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white">
                        <button
                            onClick={() => setActiveModalItem(null)}
                            className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-bold mb-1">
                            {activeModalItem.header}
                        </h3>
                        {activeModalItem.subHeader && (
                            <p className="text-sm font-medium text-purple dark:text-purple-300 mb-4">
                                {activeModalItem.subHeader}
                            </p>
                        )}

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {activeModalItem.details}
                        </p>

                        <div className="mb-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                Accredited Programs
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {activeModalItem.programs.map((prog, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        {prog}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/10">
                            <button
                                onClick={() => setActiveModalItem(null)}
                                className="px-5 py-2 rounded-xl bg-purple hover:bg-purple-dark text-white text-sm font-semibold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
