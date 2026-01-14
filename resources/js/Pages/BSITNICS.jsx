import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import React, { useRef, useState, useEffect } from "react";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import GalleryModal from "@/Components/GalleryModal";

// --- Animation Components ---
const TiltCard = ({ children, className, color, onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (isMobile) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateY: isMobile ? 0 : rotateY,
                rotateX: isMobile ? 0 : rotateX,
                transformStyle: "preserve-3d",
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-3xl ${className} ${color}`}
        >
            <div style={{ transform: isMobile ? "none" : "translateZ(50px)", transformStyle: "preserve-3d" }} className="relative z-10 h-full">
                {children}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

const StaggerText = ({ text, className, delay = 0 }) => {
    const letters = Array.from(text);
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay },
        }),
    };
    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: {
            opacity: 0,
            y: 50,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <motion.div
            style={{ display: "flex", flexWrap: "wrap" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};

function BSITNICS({ video, galleryItems, categories }) {
    const itemsToDisplay = galleryItems || [];
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <>
            <CustomCursor />
            <NavBar />
            <div className="dark:bg-dark w-full">
                {" "}
                <div className="text-dark dark:text-light text-center font-inter font-bold lg:text-[90px] text-[40px] leading-[108px] relative">
                    <div className="relative w-full lg:block hidden">
                        <img
                            className="w-full rounded-lg shadow-lg  object-cover object-center bg-auto"
                            src="/img/nic.png"
                        ></img>
                    </div>
                </div>
            </div>
            <section className="dark:bg-[#232323] bg-light  ">
                <div className="mx-auto w-full max-w-5xl grid grid-cols-1 pt-[60px]">
                    <div className="border dark:border-0 shadow-2xl dark:shadow-none dark:bg-dark bg-light  relative  ">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div>
                                    <h2 className="font-inter leading-[33.6px] font-semibold text-[28px] text-dark dark:text-light">
                                        Our Contacts
                                    </h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-8">
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <LocationIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-dark/75 dark:text-light/75 text-[18px] ">
                                            Arellano St, Dagupan City,
                                            Philippines
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <MessageIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-dark/75 dark:text-light/75 text-[18px] ">
                                            udd_site@cdd.edu.ph
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <PhoneIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-dark/75 dark:text-light/75 text-[18px] ">
                                            (075) 522 2405
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl">
                    <p className="dark:text-light text-dark font-inter leading-[30px] lg:text-[24px] text-[18px] text-justify lg:text-left">
                        The Network Infrastructure with Cybersecurity
                        Specialization is designed to create a strong foundation
                        in designing, deploying, and managing secure and
                        efficient network infrastructure. Leaners will gain
                        knowledge in networking concepts, systems
                        administration, and cybersecurity practices to ensure
                        the protection of digital assets and organizational
                        systems. This will allow graduates to be prepared to
                        address modern network challenges and cybersecurity
                        threats.
                    </p>
                    <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px] pt-[50px]">
                        Career Opportunities:
                    </h1>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Administrator
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cybersecurity Analyst
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Security Engineer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                IT Infrastructure Manager
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Ethical Hacker
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cloud Security Specialist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Architect
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cybersecurity Consultant
                            </li>
                        </ul>
                    </div>

                    {/* Dynamic Showcase & Video Section */}
                    {(video || itemsToDisplay.length > 0) && (
                        <div className="mt-24">
                            {/* Video Section */}
                            {video && (
                                <div className="mb-12 shadow-2xl border border-white/10 group aspect-video rounded-3xl overflow-hidden bg-black relative">
                                    <video
                                        src={video}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        controls
                                    />
                                </div>
                            )}

                            {/* Gallery Section */}
                            {itemsToDisplay.length > 0 && (
                                <>
                                    <StaggerText text="STUDENT GALLERY" className="text-3xl md:text-6xl font-black tracking-tighter mb-12" />

                                    {/* Categories Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        {categories && categories.length > 0 ? (
                                            categories.map((cat, index) => {
                                                // Assign a color based on index or hash
                                                const colors = ["bg-rose-500", "bg-purple", "bg-blue-500", "bg-amber-500", "bg-emerald-500", "bg-indigo-500"];
                                                const cardColor = colors[index % colors.length];

                                                return (
                                                    <TiltCard
                                                        key={cat.id}
                                                        className="aspect-[16/9] md:h-[400px] group cursor-pointer"
                                                        color={cardColor}
                                                        onClick={() => {
                                                            setSelectedCategory(cat.name);
                                                            setModalOpen(true);
                                                        }}
                                                    >
                                                        <div className="absolute inset-0 flex items-end p-8 md:p-12 z-20">
                                                            <div>
                                                                <p className="text-xs md:text-sm font-mono mb-2 opacity-70 text-white tracking-widest uppercase">{cat.program} Specialization</p>
                                                                <h3 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">{cat.name}</h3>
                                                            </div>
                                                        </div>
                                                    </TiltCard>
                                                );
                                            })
                                        ) : (
                                            <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-700 rounded-3xl">
                                                <p>No categories found.</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <GalleryModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        initialCategory={selectedCategory}
                        allItems={itemsToDisplay}
                    />

                </div>
            </section>
        </>
    );
}

export default BSITNICS;
