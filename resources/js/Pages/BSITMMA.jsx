import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Head, Link } from "@inertiajs/react";
import GalleryModal from "@/Components/GalleryModal";

// --- Animation Components ---

const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouse = (e) => {
        if (isMobile) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        position.x.set(middleX * 0.2);
        position.y.set(middleY * 0.2);
    };

    const reset = () => {
        position.x.set(0);
        position.y.set(0);
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ x, y }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
};


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
            <div style={{ transform: isMobile ? "none" : "translateZ(50px)", transformStyle: "preserve-3d" }} className="relative z-10 h-full w-full">
                {children}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30" />
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
            style={{ display: "flex", flexWrap: "nowrap" }}
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

// --- Main Component ---

function BSITMMA({ video, galleryItems, categories }) {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const careersList = [
        "Animator", "Graphic Designer", "Game Artist", "3D Modeler",
        "VFX Artist", "Storyboard Artist", "Web Designer", "Motion Graphics", "Filmmaker", "Photography",
        "Layout Artist",
    ];

    const toolsList = [
        "Adobe Creative Cloud", "Autodesk Maya", "Blender", "Unity"
    ];

    // Fallback if no dynamic items
    const staticShowcaseItems = [
        { title: "Character Design", category: "3D Art", color: "bg-rose-500", span: "md:col-span-2" },
        { title: "Motion Reel", category: "Animation", color: "bg-purple-600", span: "md:col-span-1" },
        { title: "UI Prototypes", category: "Interactive", color: "bg-blue-500", span: "md:col-span-1" },
        { title: " Storyboard", category: "Illustration", color: "bg-amber-500", span: "md:col-span-2" },
    ];

    const itemsToDisplay = galleryItems && galleryItems.length > 0 ? galleryItems : staticShowcaseItems;

    return (
        <>
            <Head title="BSIT MMA" />
            <CustomCursor />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden selection:bg-purple selection:text-white perspective-1000">
                <NavBar isWelcomePage={true} />

                {/* Dynamic Background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] bg-gradient-to-b from-purple/20 to-transparent rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[20%] -left-[20%] w-[80vw] h-[80vw] bg-gradient-to-t from-fuchsia-500/10 to-transparent rounded-full blur-[100px]"
                    />
                </div>

                {/* Hero Section */}
                <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
                    <div className="max-w-[90rem] mx-auto w-full flex flex-col items-center">

                        {/* Massive Centered Typography */}
                        <div className="relative flex flex-col items-center text-center mb-12 z-20 w-full">
                            <StaggerText
                                text="MULTIMEDIA"
                                className="text-[15vw] md:text-[11vw] lg:text-[10vw] leading-[0.8] font-black tracking-tighter text-dark dark:text-light mix-blend-difference"
                            />
                            <div className="flex items-center justify-center gap-3 md:gap-6 mt-3 md:mt-0 flex-wrap">
                                <StaggerText
                                    text="ARTS"
                                    delay={0.2}
                                    className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500 py-2 pr-2"
                                />
                                <StaggerText
                                    text="&"
                                    delay={0.3}
                                    className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] font-black tracking-tighter text-dark dark:text-light py-2 opacity-30 pr-2"
                                />
                                <StaggerText
                                    text="ANIMATION"
                                    delay={0.4}
                                    className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple py-2 pr-2"
                                />
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="mt-8 text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl font-light text-center leading-relaxed"
                            >
                                Where imagination meets technology. Create stunning visual narratives through 2D/3D animation, VFX, and interactive media.
                            </motion.p>
                        </div>

                        {/* Centered Massive Showreel */}
                        <div className="w-full max-w-5xl relative perspective-1000 z-10 mt-4 md:mt-8">
                            <TiltCard className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black group" color="">
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center z-20 pointer-events-none">
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>

                                {video ? (
                                    <video
                                        src={video}
                                        className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-700"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900">
                                        <svg className="w-12 h-12 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Showreel Coming Soon</p>
                                    </div>
                                )}

                                {/* UI Accents on the video container */}
                                <div className="absolute top-6 left-6 z-30 text-white/90 font-mono text-[10px] md:text-xs tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span> REC
                                </div>
                                <div className="absolute bottom-6 right-6 z-30 text-white/70 font-mono text-[10px] md:text-xs tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                    4K • 60FPS
                                </div>
                            </TiltCard>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-10 -right-4 md:-bottom-16 md:-right-16 w-28 h-28 md:w-40 md:h-40 rounded-full border border-white/20 bg-dark/50 backdrop-blur-md flex items-center justify-center text-white/80 text-xs uppercase tracking-widest z-40 shadow-2xl"
                            >
                                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                    <path id="curve-hero" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                    <text>
                                        <textPath href="#curve-hero" className="fill-current text-[10px] font-bold">
                                            • MULTIMEDIA ARTS • ANIMATION
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.8)]"></div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Minimalist Toolkit below Video */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-16 md:mt-24 flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                        >
                            {["Adobe CC", "Autodesk Maya", "Blender", "Unity"].map((tool, i) => (
                                <p key={i} className="font-mono text-xs md:text-sm font-bold tracking-widest text-dark dark:text-light uppercase">{tool}</p>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Content Grid */}
                <section className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className=" gap-12 items-start">


                            {/* Description & Stats */}
                            <div className="lg:col-span-8 space-y-12 md:space-y-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="prose prose-lg dark:prose-invert max-w-none"
                                >
                                    <p className="text-xl md:text-3xl font-light leading-relaxed text-dark dark:text-light text-justify md:text-left">
                                        The <span className="font-bold text-purple">Multimedia Arts and Animation Specialization</span> is designed to blend Information Technology with creative design that focuses on the creation of interactive and visually compelling digital content. Learners gain skills in <span className="font-bold text-purple">graphic design, 2D and 3D Animation, video editing, and interactive multimedia</span> . Graduates will be able to have careers in animation and multimedia production combining technical knowledge with artistic innovation.

                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Career Ticker */}
                <section className="py-16 md:py-20 overflow-hidden bg-purple text-white">
                    <div className="flex whitespace-nowrap">
                        <motion.div
                            animate={{ x: "-50%" }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="flex gap-8 md:gap-12 text-4xl md:text-8xl font-black uppercase tracking-tight"
                        >
                            {careersList.map((career, i) => (
                                <span key={i} className="flex items-center gap-8 md:gap-12">
                                    {career} <span className="text-white/30">•</span>
                                </span>
                            ))}
                            {careersList.map((career, i) => (
                                <span key={`dup-${i}`} className="flex items-center gap-8 md:gap-12">
                                    {career} <span className="text-white/30">•</span>
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </section>
                {/* Showcase - Minimalist Hover Reveal */}
                <section className="relative z-10 py-16 md:py-32 bg-dark text-light">
                    <div className="max-w-[90rem] mx-auto px-4">
                        <div className="mb-8 md:mb-16 border-b border-white/10 pb-6">
                            <StaggerText text="STUDENT SHOWCASE" className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-2" />

                        </div>

                        {/* Interactive List Showcase */}
                        <div className="relative flex flex-col md:flex-row items-start gap-8 lg:gap-16">
                            {/* Left List */}
                            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col relative z-20 pb-20">
                                {categories && categories.length > 0 ? (
                                    categories.map((cat, index) => {
                                        const isHovered = hoveredCategory === cat.name || (!hoveredCategory && index === 0); // Default to first if none hovered

                                        return (
                                            <div
                                                key={cat.id}
                                                className={`group relative py-8 md:py-12 border-b border-white/5 cursor-pointer flex justify-between items-center transition-all duration-500 ${isHovered ? 'border-cyan-500/30' : ''}`}
                                                onMouseEnter={() => setHoveredCategory(cat.name)}
                                                onClick={() => {
                                                    setSelectedCategory(cat.name);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                <div className="flex items-center gap-6 md:gap-10 relative z-10 w-full pr-4">
                                                    <span className={`font-mono text-sm md:text-xl font-bold transition-colors duration-500 ${isHovered ? 'text-cyan-400' : 'text-gray-700'}`}>
                                                        {(index + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <h3 className={`text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-black tracking-tighter transition-all duration-700 break-words ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 translate-x-2 md:translate-x-6' : 'text-gray-600 group-hover:text-gray-300'}`}>
                                                        {cat.name}
                                                    </h3>
                                                </div>

                                                <div className={`hidden md:flex items-center gap-4 transition-all duration-500 relative z-10 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                    <p className="font-mono text-xs tracking-widest uppercase text-cyan-400 whitespace-nowrap">View</p>
                                                    <svg className="w-5 h-5 text-fuchsia-500 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="w-full py-20 text-center text-gray-500 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-sm">
                                        <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <p className="font-mono uppercase tracking-widest">No Projects Found.</p>
                                    </div>
                                )}
                            </div>

                            {/* Right Sticky Preview */}
                            <div className="w-full md:w-1/2 lg:w-2/5 sticky top-32 h-[50vh] md:h-[60vh] z-10 perspective-1000">
                                <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a]">
                                    {categories && categories.length > 0 && categories.map((cat, index) => {
                                        const entry = galleryItems?.find(item => item.category === cat.name);
                                        const isHovered = hoveredCategory === cat.name || (!hoveredCategory && index === 0);

                                        if (!entry) return null;
                                        const firstImg = entry.images && entry.images.length > 0 ? entry.images[0] : null;
                                        if (!firstImg) return null;

                                        return (
                                            <motion.div
                                                key={`preview-${cat.id}`}
                                                initial={false}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0,
                                                    scale: isHovered ? 1 : 1.05,
                                                    zIndex: isHovered ? 20 : 0
                                                }}
                                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                                className="absolute inset-0 pointer-events-none"
                                            >
                                                {firstImg.media_type === 'video' ? (
                                                    <>
                                                        {/* Blurred background for letterboxing */}
                                                        <video
                                                            src={firstImg.media_path}
                                                            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-3xl scale-110"
                                                            muted loop playsInline
                                                        />
                                                        {/* Actual uncropped video */}
                                                        <video
                                                            src={firstImg.media_path}
                                                            className="absolute inset-0 w-full h-full object-contain opacity-90"
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                        />
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                                                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Blurred background for letterboxing */}
                                                        <img
                                                            src={firstImg.media_path}
                                                            alt=""
                                                            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-3xl scale-110"
                                                        />
                                                        {/* Actual uncropped image */}
                                                        <img
                                                            src={firstImg.media_path}
                                                            alt={cat.name}
                                                            className="absolute inset-0 w-full h-full object-contain opacity-90"
                                                        />
                                                    </>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                                {/* Image Accents */}
                                                <div className="absolute inset-y-0 left-2 w-2 flex flex-col justify-between py-4 opacity-10">
                                                    {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-3 bg-white rounded-sm" />)}
                                                </div>
                                                <div className="absolute inset-y-0 right-2 w-2 flex flex-col justify-between py-4 opacity-10">
                                                    {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-3 bg-white rounded-sm" />)}
                                                </div>

                                                <motion.div
                                                    initial={false}
                                                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                                                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                                    className="absolute bottom-8 left-8 right-8"
                                                >
                                                    {entry.is_top_30 && (
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_20px_rgba(234,179,8,0.6)]">
                                                                Hall of Fame
                                                            </div>
                                                        </div>
                                                    )}
                                                    <p className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                                                        {cat.program} Spec
                                                    </p>
                                                    <p className="text-2xl lg:text-3xl font-black text-white leading-tight break-words">{cat.name}</p>
                                                </motion.div>
                                            </motion.div>
                                        );
                                    })}

                                    {/* Fallback if no media exists at all */}
                                    {(!categories || categories.length === 0 || !galleryItems || galleryItems.length === 0) && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
                                            <p className="text-gray-600 font-mono text-sm tracking-widest uppercase">Preview Area</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <GalleryModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    initialCategory={selectedCategory}
                    allItems={galleryItems}
                />



                {/* CTA & Contact */}
                <section className="relative z-10 py-24 md:py-32 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-7xl font-bold text-dark dark:text-light mb-6 md:mb-8"
                        >
                            READY TO <span className="text-purple">CREATE?</span>
                        </motion.h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto">
                            Join the next generation of digital artists and innovators. Your journey starts here.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-16 md:mb-24">
                            <Magnetic >
                                <Link href="/Contact"><button className="w-full md:w-auto px-12 py-5 rounded-full bg-dark dark:bg-light text-light dark:text-dark font-bold text-lg hover:scale-105 transition-transform active:scale-95">
                                    Enroll Now
                                </button></Link>

                            </Magnetic>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto text-left">
                            {[
                                { icon: LocationIcon, label: "Visit Us", value: "Arellano St, Dagupan City" },
                                { icon: MessageIcon, label: "Email Us", value: "udd_site@cdd.edu.ph" },
                                { icon: PhoneIcon, label: "Call Us", value: "(075) 522 2405" },
                            ].map((contact, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10"
                                >
                                    <div className="p-3 rounded-full bg-purple/10 text-purple">
                                        <contact.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{contact.label}</p>
                                        <p className="font-medium text-dark dark:text-light">{contact.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </div >
        </>
    );
}

export default BSITMMA;

