import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShowreelPlayer from "@/Components/ShowreelPlayer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection({ onHeroLoaded }) {
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline();

        // Background shapes animation
        gsap.to(".bg-shape-1", {
            scale: 1.2,
            opacity: 0.5,
            duration: 4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        gsap.to(".bg-shape-2", {
            scale: 1.5,
            opacity: 0.3,
            duration: 5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1
        });

        // Initialize elements
        gsap.set(".hero-image-container", { opacity: 0, scale: 0.95, y: 30 });

        tl.to(".hero-image-container", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Hover effect for video container
        const imageContainer = document.querySelector(".hero-image-container");
        if (imageContainer) {
            imageContainer.addEventListener("mouseenter", () => {
                gsap.to(imageContainer, { scale: 1.01, duration: 0.4, ease: "power2.out" });
            });
            imageContainer.addEventListener("mouseleave", () => {
                gsap.to(imageContainer, { scale: 1, duration: 0.4, ease: "power2.out" });
            });
        }

        // --- Scroll Parallax Effects ---
        gsap.to(".hero-image-container", {
            y: 60, // Gentle parallax push
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".bg-shape-1", {
            y: 150,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.to(".bg-shape-2", {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative bg-[#FDFDFC] dark:bg-[#0a0a0a] w-full pt-24 pb-6 sm:pt-28 sm:pb-8 flex flex-col items-center overflow-hidden"
        >
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="bg-shape-1 absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-600/10 rounded-full blur-[130px]"></div>
                <div className="bg-shape-2 absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-fuchsia-500/10 rounded-full blur-[110px]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
                {/* Centered Massive Showreel Video Player (matches MMA/WMAD design) */}
                <div className="w-full max-w-5xl relative">
                    <div className="hero-image-container relative w-full aspect-video rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-600/25 border-2 border-white/20 dark:border-white/10 bg-black group">
                        <ShowreelPlayer
                            video="/assets/CTA_video.mp4"
                            poster="/assets/hero_section.jpg"
                            programTag="SITE"
                            autoPlay={true}
                            onLoaded={() => {
                                if (onHeroLoaded) onHeroLoaded();
                            }}
                        />
                    </div>

                    {/* Decorative Ambient Elements */}
                    <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 bg-purple-600/30 rounded-full blur-[90px]"></div>
                    <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[90px]"></div>
                </div>
            </div>
        </section>
    );
}
