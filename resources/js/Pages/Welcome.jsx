import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger);
import { NavBar } from "@/Components/NavBar";
import HeroSection from "@/Components/HeroSection";
import AboutUs from "@/Components/AboutUs";
import Academics from "@/Components/Academics";
import Instructors from "@/Components/Instructors";
import Blogs from "@/Components/Blogs";
import EnrollSpin from "@/Components/EnrollSpin";
import Partnership from "@/Pages/Partnership";
import Highlights from "@/Components/Highlights";
import { Head } from "@inertiajs/react";
import { SakuraBackground } from "@/Components/SakuraBackground";

export default function Welcome({
    auth,
    bscstestimonials,
    events,
    faculties,
    partners,
    siteSettings,
}) {
    const [isScrolling, setIsScrolling] = useState(false);
    const [owlFacing, setOwlFacing] = useState('right');
    const container = useRef(null);
    const scrollTimeout = useRef(null);
    const lastOwlX = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150); // After 150ms of no scrolling, revert to static
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    useGSAP(() => {
        // Scroll-Driven Letter 'Z' Owl Animation
        gsap.to(".global-flying-owl", {
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1 // Smooth scrolling link
            },
            ease: "none", // Linear movement looks best for scroll
            motionPath: {
                path: [
                    { x: window.innerWidth * 0.1, y: window.innerHeight * 0.2 }, // Top Left
                    { x: window.innerWidth * 0.9, y: window.innerHeight * 0.2 }, // Top Right (Horizontal stroke)
                    { x: window.innerWidth * 0.1, y: window.innerHeight * 0.8 }, // Bottom Left (Diagonal slash)
                    { x: window.innerWidth * 0.9, y: window.innerHeight * 0.8 }, // Bottom Right (Bottom horizontal)
                    { x: window.innerWidth * 0.5 - 48, y: window.innerHeight * 0.9 }  // Bottom-center of screen at the end
                ],
                curviness: 0 // 0 creates sharp, straight lines exactly like a 'Z'
            },
            onUpdate: function() {
                const owlEl = document.querySelector('.global-flying-owl');
                if (owlEl) {
                    const currentX = owlEl.getBoundingClientRect().left;
                    if (currentX > lastOwlX.current + 0.5) {
                        setOwlFacing('right');
                    } else if (currentX < lastOwlX.current - 0.5) {
                        setOwlFacing('left');
                    }
                    lastOwlX.current = currentX;
                }
            }
        });
    }, { scope: container });

    return (
        <>
            <Head title="School of Information Technology Education | Universidad de Dagupan" />
            <div ref={container} className="bg-[#FDFDFC] dark:bg-[#0a0a0a] min-h-screen scroll-smooth relative overflow-x-hidden">
                <SakuraBackground petalCount={20} />

                {/* Global Flying Owl Asset */}
                <img
                    src={isScrolling ? (owlFacing === 'left' ? "/assets/owl-walking-left.gif" : "/assets/owl-walking-right.gif") : "/assets/idle.png"}
                    alt="Flying Owl"
                    className="global-flying-owl fixed top-0 left-0 w-24 md:w-32 z-50 pointer-events-none opacity-80"
                    style={{ 
                        filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))",
                        transform: (!isScrolling && owlFacing === 'left') ? "scaleX(-1)" : "none"
                    }}
                />

                <NavBar isWelcomePage={true} />
                <HeroSection />

                {(siteSettings?.show_highlights === 'true' || siteSettings?.show_sneak_peek === 'true') && (
                    <Highlights
                        badge={siteSettings?.highlight_badge !== undefined ? siteSettings.highlight_badge : 'FEATURED SPOTLIGHT'}
                        title={siteSettings?.highlight_title || siteSettings?.sneak_peek_title || 'Hall of Fame Showcase'}
                        subtitle={siteSettings?.highlight_subtitle || siteSettings?.sneak_peek_subtitle || 'The results are in! Explore the elite game and web applications developed by our talented IT students.'}
                        buttonText={siteSettings?.highlight_button_text || 'Enter the Showcase'}
                        buttonLink={siteSettings?.highlight_button_link || '/HallOfFame'}
                        mediaPath={siteSettings?.highlight_media_path || siteSettings?.sneak_peek_video || null}
                        mediaType={siteSettings?.highlight_media_type || 'video'}
                    />
                )}

                <Partnership partners={partners} />
                <AboutUs bscstestimonials={bscstestimonials} />
                <Academics />
                <Instructors faculties={faculties} />
                <Blogs events={events} />
                <EnrollSpin />
            </div>
        </>
    );
}
