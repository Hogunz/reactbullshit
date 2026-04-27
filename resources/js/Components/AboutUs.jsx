import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const paragraph1 = "The School of Information Technology Education (SITE) at Universidad de Dagupan in Dagupan City, Pangasinan, Philippines, offers undergraduate and graduate programs in Information Technology. Undergraduate programs include Bachelor of Science in Information Technology (BSIT) and Bachelor of Science in Computer Science (BSCS), providing a strong foundation in IT principles such as programming, software development, database management, and networking.".split(" ");

const paragraph2 = "The graduate program is the Master of Information Technology (MIT), catering to professionals seeking advanced knowledge in system analysis, information security, and database administration. SITE's faculty comprises experienced IT professionals dedicated to providing quality education and practical experience through local and international industry partnerships, internships, and hands-on learning opportunities. SITE aims to equip students with the necessary knowledge and skills for successful careers in the fast-paced and ever-evolving IT industry.".split(" ");

import Testimonials from "@/Components/Testimonials";

export default function AboutUs({ bscstestimonials = [] }) {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Parallax Effects
        gsap.to(".parallax-img-1", {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.to(".parallax-img-2", {
            y: 80,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });

        // "Reading" Illumination Text Effect
        gsap.to(".word-illuminated-1", {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: ".text-container-1",
                start: "top 75%",
                end: "bottom 50%",
                scrub: true
            }
        });

        // "Reading" Illumination Text Effect (Paragraph 2)
        gsap.to(".word-illuminated-2", {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: ".text-container-2",
                start: "top 80%",
                end: "bottom 55%",
                scrub: true
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-40 bg-[#FDFDFC] dark:bg-[#080212] overflow-hidden border-t border-gray-100 dark:border-white/5">
            {/* Deep Purple Ambient Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/30 dark:bg-purple-800/40 blur-[140px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-600/20 dark:bg-purple-900/40 blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/10 dark:bg-fuchsia-900/20 blur-[160px] rounded-full opacity-50 mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left Typography & Content Side */}
                    <div className="col-span-1 lg:col-span-6 space-y-10">
                        <div>
                            <h3 className="font-sans text-sm font-bold text-purple-600 tracking-[0.25em] uppercase mb-4 flex items-center gap-4">
                                <span className="w-16 h-[2px] bg-purple-600 dark:bg-purple-500"></span>
                                About Us
                            </h3>
                        </div>

                        {/* Interactive Reading Layout */}
                        <div className="relative pt-4 text-container-1">
                            <p className="text-2xl sm:text-3xl leading-snug font-extrabold tracking-tight">
                                {paragraph1.map((word, i) => (
                                    <span key={i} className="word-illuminated-1 opacity-20 text-gray-900 dark:text-white transition-colors duration-200 inline-block mr-[0.3em]">{word}</span>
                                ))}
                            </p>
                        </div>

                        <div className="relative mt-8 lg:ml-12 pl-6 lg:pl-10 border-l-4 border-fuchsia-500/20 text-container-2">
                            <p className="text-xl sm:text-2xl leading-relaxed font-semibold tracking-wide">
                                {paragraph2.map((word, i) => (
                                    <span key={i} className="word-illuminated-2 opacity-20 text-gray-800 dark:text-gray-300 transition-colors duration-200 inline-block mr-[0.3em]">{word}</span>
                                ))}
                            </p>
                        </div>
                    </div>

                    {/* Right Visual Image Composition Side */}
                    <div className="col-span-1 lg:col-span-6 relative h-[700px] hidden lg:block">
                        <div className="parallax-img-1 absolute right-0 top-[10%] w-[80%] h-[60%] z-10 rounded-3xl overflow-hidden border-4 border-white dark:border-[#1a1a1a] shadow-2xl">
                            <img src="/img/pic2.jpg" alt="Campus Life" className="w-full h-full object-cover" />
                        </div>
                        <div className="parallax-img-2 absolute left-0 bottom-[10%] w-[60%] h-[45%] z-20 rounded-3xl overflow-hidden border-8 border-[#FDFDFC] dark:border-[#0a0a0a] shadow-2xl">
                            <img src="/img/pic3.jpg" alt="Student Collaboration" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-transparent mix-blend-multiply opacity-50 z-30"></div>
                        </div>
                    </div>
                    
                    {/* Mobile Only Image Fallback */}
                    <div className="col-span-1 block lg:hidden w-full space-y-6 mt-8">
                        <div className="w-full rounded-3xl overflow-hidden shadow-lg border-2 border-white dark:border-[#1a1a1a]">
                            <img src="/img/pic2.jpg" alt="Campus Life" className="w-full h-64 object-cover" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-20 relative z-20">
                <Testimonials bscstestimonials={bscstestimonials} />
            </div>
        </section>
    );
}
