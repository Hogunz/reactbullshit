import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sampleImages = [
    '/img/faculties/KDP03699.jpg',
    '/img/faculties/KDP03974.jpg'
];

// Generate exactly 1 Dean, 1 Program Head, 23 Instructors (25 unique people)
const baseFacultiesData = Array.from({ length: 25 }).map((_, i) => {
    if (i === 0) {
        return { name: "Dr. Jane Doe", role: "Dean of SITE", isDean: true, isProgramHead: false, imageUrl: sampleImages[0] };
    } else if (i === 1) {
        return { name: "Prof. John Smith", role: "Program Head", isDean: false, isProgramHead: true, imageUrl: sampleImages[1] };
    } else {
        return { name: `Faculty Member ${i - 1}`, role: "Instructor", isDean: false, isProgramHead: false, imageUrl: sampleImages[(i) % sampleImages.length] };
    }
});

// Create a fallback reel array by duplicating the Dean at the absolute end. 
// Total length: 26 items. 
const fallbackReelData = [...baseFacultiesData, { ...baseFacultiesData[0] }];

export default function Instructors({ faculties = [] }) {
    const displayFaculties = faculties.length > 0 
        ? faculties.map(f => ({
            name: f.name,
            role: f.position,
            isDean: f.position.toLowerCase().includes('dean'),
            isProgramHead: f.position.toLowerCase().includes('program head'),
            imageUrl: f.image && f.image.startsWith('/') ? f.image : `/storage/${f.image}`
        }))
        : baseFacultiesData;

    const reelData = displayFaculties.length > 0 ? [...displayFaculties, { ...displayFaculties[0] }] : fallbackReelData;
    const sectionRef = useRef(null);
    const sliderContainerRef = useRef(null);

    useGSAP(() => {
        // Standard header entrance
        gsap.from(".fac-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

        // Horizontal Reel Scroll Animation
        const section = sectionRef.current;
        const slider = sliderContainerRef.current;

        if (section && slider) {

            // Calculate precisely how far the container needs to travel horizontally 
            // to reach the exact right edge of the screen
            const getScrollDistance = () => slider.scrollWidth - window.innerWidth;

            gsap.to(slider, {
                x: () => -getScrollDistance(),
                ease: "none", // Linear movement locked perfectly to the scroll position
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    scrub: 1.5, // Butter smooth momentum
                    start: "top top",
                    end: () => "+=" + (slider.scrollWidth / 1.5), // The scroll duration scales naturally with the amount of cards
                    invalidateOnRefresh: true, // Auto-recalculates if window is resized
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative bg-[#FDFDFC] dark:bg-[#080212] min-h-screen overflow-hidden selection:bg-purple-500 selection:text-white flex flex-col justify-center">

            {/* Deep Purple Ambient Lighting Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 dark:bg-fuchsia-900/30 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
            </div>

            {/* Header - Standard document flow to prevent overlap */}
            <div className="text-center w-full max-w-3xl mx-auto px-4 relative z-40 mb-8 md:mb-16">
                <div className="fac-header inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 shadow-sm mb-4">
                    <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Faculty</span>
                </div>
                <h2 className="fac-header text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Our <span className="text-purple-600 dark:text-purple-500">Instructors</span>
                </h2>
            </div>
            
            {/* The Horizontal Reel Window */}
            <div className="w-full relative z-30">

                {/* 
                    The Scroll Container: 
                    Padding aligns the first and last slides mathematically into the exact visual center! 
                    Mobile cards are 85vw -> Padding is 7.5vw 
                    Tablet cards are 50vw -> Padding is 25vw
                    Desktop cards are 33.33vw -> Padding is 33.33vw
                */}
                <div
                    ref={sliderContainerRef}
                    className="flex items-center w-max pl-[7.5vw] sm:pl-[25vw] lg:pl-[33.3333vw] pr-[7.5vw] sm:pr-[25vw] lg:pr-[33.3333vw] will-change-transform"
                >
                    {reelData.map((f, i) => (
                        <div
                            key={i}
                            // Card slots mathematically matched to the padding
                            className="w-[85vw] sm:w-[50vw] lg:w-[33.3333vw] shrink-0 px-3 lg:px-6 flex flex-col items-center justify-center transition-transform duration-700 hover:scale-105"
                        >

                            <div className={`relative group cursor-pointer aspect-[3/4] w-full max-w-[260px] md:max-w-[320px] rounded-2xl overflow-hidden transition-all duration-500
                                ${f.isDean
                                    ? 'shadow-[0_0_50px_rgba(37,99,235,0.4)] border-[3px] border-blue-500'
                                    : f.isProgramHead
                                        ? 'shadow-[0_0_30px_rgba(168,85,247,0.3)] border-2 border-purple-500'
                                        : 'shadow-2xl border border-gray-200 dark:border-white/10 group-hover:border-blue-400/50'
                                }
                            `}>
                                <img
                                    src={f.imageUrl}
                                    alt={f.name}
                                    className={`w-full h-full object-cover object-top transition-transform duration-700
                                        ${f.isDean ? '' : 'group-hover:scale-110'}
                                    `}
                                />

                                {/* Static Floating Overlay Panel in the bottom of each card natively */}
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 md:p-8 pt-12 z-20">
                                    <h4 className="font-bold text-white leading-tight mb-1
                                        text-xl md:text-2xl
                                    ">
                                        {f.name}
                                    </h4>
                                    <p className={`font-bold uppercase tracking-wider
                                        text-xs md:text-sm
                                        ${f.isDean ? 'text-blue-400' : f.isProgramHead ? 'text-purple-400' : 'text-gray-300'}
                                    `}>
                                        {f.role}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}
