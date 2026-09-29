import { NavBar } from "@/Components/NavBar";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Head, Link } from "@inertiajs/react";
import GalleryModal from "@/Components/GalleryModal";
import ShowreelPlayer from "@/Components/ShowreelPlayer";

// --- Custom Icons ---
const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

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

function BSITWMAD({ video, galleryItems, categories }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const careersList = [
        "Frontend Developer", "Backend Developer", "Full-Stack Engineer",
        "Mobile App Developer", "UI/UX Designer", "DevOps Engineer",
        "QA Engineer", "Cloud Architect", "API Specialist"
    ];

    const toolsList = [
        "React", "React Native", "Flutter", "Laravel", "Node.js", "Next.js", "Tailwind CSS", "TypeScript"
    ];

    const allItems = galleryItems || [];
    const categoryList = categories || [];

    const handleCategoryClick = (catName) => {
        setSelectedCategory(catName);
        const entry = allItems.find(item => item.category === catName) || null;
        setSelectedItem(entry);
        setModalOpen(true);
    };

    return (
        <>
            <Head title="BSIT WMAD" />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden selection:bg-purple selection:text-white perspective-1000">
                <NavBar isWelcomePage={true} />

                {/* Dynamic Ambient Background */}
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
                                text="WEB & MOBILE"
                                className="text-[14vw] md:text-[10vw] lg:text-[9vw] leading-[0.8] font-black tracking-tighter text-dark dark:text-light mix-blend-difference"
                            />
                            <div className="flex items-center justify-center gap-3 md:gap-6 mt-3 md:mt-2 flex-wrap">
                                <StaggerText
                                    text="APPLICATION"
                                    delay={0.2}
                                    className="text-[11vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500 py-2 pr-2"
                                />
                                <StaggerText
                                    text="DEVELOPMENT"
                                    delay={0.4}
                                    className="text-[11vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple py-2 pr-2"
                                />
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="mt-8 text-lg md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl font-light text-center leading-relaxed"
                            >
                                Building modern web and mobile applications for the real world.
                            </motion.p>
                        </div>

                        {/* Centered Massive Showreel */}
                        <div className="w-full max-w-5xl relative perspective-1000 z-10 mt-4 md:mt-8">
                            <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-black group">
                                <ShowreelPlayer video={video} programTag="RESPONSIVE • FULL-STACK" />
                            </div>

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
                                            • WEB & MOBILE • APP DEV •
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-purple shadow-[0_0_15px_rgba(99,48,125,0.8)]"></div>
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
                            {toolsList.map((tool, i) => (
                                <p key={i} className="font-mono text-xs md:text-sm font-bold tracking-widest text-dark dark:text-light uppercase">{tool}</p>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Content Grid / Overview */}
                <section className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="gap-12 items-start">
                            <div className="lg:col-span-8 space-y-12 md:space-y-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="prose prose-lg dark:prose-invert max-w-none"
                                >
                                    <p className="text-xl md:text-3xl font-light leading-relaxed text-dark dark:text-light text-justify md:text-left">
                                        The <span className="font-bold text-purple">Web and Mobile Application Development Specialization</span> equips students with the technical expertise and software engineering foundation needed to build modern digital products. Learners gain hands-on proficiency in <span className="font-bold text-purple">full-stack web development, cross-platform mobile apps, cloud backends, and responsive UI/UX</span>. Graduates are prepared to architect scalable applications and solve real-world challenges in the tech industry.
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

                {/* Student Showcase Section */}
                <section className="relative z-10 py-16 md:py-32 bg-dark text-light">
                    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 md:mb-16 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <StaggerText text="STUDENT SHOWCASE" className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-2" />
                                <p className="text-sm md:text-base text-gray-400 font-mono">
                                    Interactive Web Platforms & Mobile Applications engineered by WMAD
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                                <span className="w-2 h-2 rounded-full bg-purple animate-pulse"></span>
                                Click any category to explore
                            </div>
                        </div>

                        {/* Interactive List Showcase */}
                        <div className="relative flex flex-col md:flex-row items-start gap-8 lg:gap-16">
                            {/* Left List: User Categories */}
                            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col relative z-20 pb-20">
                                {categoryList && categoryList.length > 0 ? (
                                    categoryList.map((cat, index) => {
                                        const isHovered = (hoveredCategory === cat.name) || (!hoveredCategory && index === 0);
                                        const count = allItems.filter(item => item.category === cat.name).length;

                                        return (
                                            <div
                                                key={cat.id}
                                                className={`group relative py-8 md:py-12 border-b border-white/5 cursor-pointer flex justify-between items-center transition-all duration-500 ${
                                                    isHovered ? 'border-purple/40 pl-3 md:pl-6' : 'hover:pl-2'
                                                }`}
                                                onMouseEnter={() => setHoveredCategory(cat.name)}
                                                onClick={() => handleCategoryClick(cat.name)}
                                            >
                                                <div className="flex items-center gap-6 md:gap-10 relative z-10 w-full pr-4">
                                                    <span className={`font-mono text-sm md:text-xl font-bold transition-colors duration-500 ${
                                                        isHovered ? 'text-purple-300' : 'text-gray-700'
                                                    }`}>
                                                        {(index + 1).toString().padStart(2, '0')}
                                                    </span>

                                                    <div className="flex flex-col">
                                                        {count > 0 && (
                                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10 w-fit mb-1">
                                                                {count} {count === 1 ? 'project' : 'projects'}
                                                            </span>
                                                        )}

                                                        <h3 className={`text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-black tracking-tighter transition-all duration-700 break-words ${
                                                            isHovered
                                                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500 translate-x-2 md:translate-x-4'
                                                                : 'text-gray-600 group-hover:text-gray-300'
                                                        }`}>
                                                            {cat.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className={`hidden md:flex items-center gap-4 transition-all duration-500 relative z-10 flex-shrink-0 ${
                                                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                                }`}>
                                                    <p className="font-mono text-xs tracking-widest uppercase text-purple-300 whitespace-nowrap">
                                                        Explore
                                                    </p>
                                                    <svg className="w-5 h-5 text-fuchsia-500 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="w-full py-20 text-center text-gray-500 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-sm">
                                        <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="font-mono uppercase tracking-widest">No Categories Found.</p>
                                    </div>
                                )}
                            </div>

                            {/* Right Sticky Preview: Real Project Media */}
                            <div className="w-full md:w-1/2 lg:w-2/5 sticky top-32 h-[50vh] md:h-[60vh] z-10 perspective-1000">
                                <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a0a]">
                                    {categoryList && categoryList.length > 0 && categoryList.map((cat, index) => {
                                        const entry = allItems.find(item => item.category === cat.name);
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
                                                className="absolute inset-0 cursor-pointer"
                                                onClick={() => handleCategoryClick(cat.name)}
                                            >
                                                {firstImg.media_type === 'video' ? (
                                                    <>
                                                        <video
                                                            src={firstImg.media_path}
                                                            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-3xl scale-110"
                                                            muted
                                                            loop
                                                            playsInline
                                                        />
                                                        <video
                                                            src={firstImg.media_path}
                                                            className="absolute inset-0 w-full h-full object-contain opacity-90"
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <img
                                                            src={firstImg.media_path}
                                                            alt=""
                                                            className="absolute inset-0 w-full h-full object-cover opacity-25 blur-2xl scale-110"
                                                        />
                                                        <img
                                                            src={firstImg.media_path}
                                                            alt={entry.title}
                                                            className="relative z-10 w-full h-full object-contain p-4"
                                                        />
                                                    </>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/30 to-transparent flex flex-col justify-end p-8 z-20">
                                                    <span className="text-xs font-mono text-purple-400 font-bold tracking-widest uppercase mb-1">
                                                        {entry.category}
                                                    </span>
                                                    <h4 className="text-2xl md:text-3xl font-black text-light leading-tight mb-3">
                                                        {entry.title}
                                                    </h4>
                                                    {Boolean(entry.project_url && entry.project_url.trim()) && (
                                                        <a
                                                            href={entry.project_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-fit inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple hover:bg-purple/80 text-white text-xs font-bold transition-all shadow-lg shadow-purple/40"
                                                        >
                                                            <span>Visit Project</span>
                                                            <ExternalLinkIcon className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                    {(!categoryList || categoryList.length === 0 || !allItems.some(item => categoryList.some(cat => cat.name === item.category))) && (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-gray-600 font-mono text-xs uppercase tracking-widest">
                                            Select a category to preview
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
                    initialItem={selectedItem}
                    initialCategory={selectedCategory}
                    allItems={allItems}
                />

                {/* CTA & Contact Footer */}
                <section className="relative z-10 py-24 md:py-32 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-7xl font-bold text-dark dark:text-light mb-6 md:mb-8"
                        >
                            READY TO <span className="text-purple">DEVELOP?</span>
                        </motion.h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto">
                            Join the next generation of software engineers and tech innovators. Your journey starts here.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-16 md:mb-24">
                            <Magnetic>
                                <Link href="/Contact">
                                    <button className="w-full md:w-auto px-12 py-5 rounded-full bg-dark dark:bg-light text-light dark:text-dark font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl">
                                        Enroll Now
                                    </button>
                                </Link>
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
            </div>
        </>
    );
}

export default BSITWMAD;
