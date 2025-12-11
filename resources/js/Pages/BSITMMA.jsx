import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Link } from "@inertiajs/react";

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

const TiltCard = ({ children, className, color }) => {
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

// --- Main Component ---

function BSITMMA() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    const careersList = [
        "Animator", "Graphic Designer", "Game Artist", "3D Modeler",
        "VFX Artist", "Storyboard Artist", "Web Designer", "Motion Graphics",
    ];

    const toolsList = [
        "Adobe Creative Cloud", "Maya", "Blender", "Toon Boom", "Cinema 4D", "Unreal Engine"
    ];

    const showcaseItems = [
        { title: "Character Design", category: "3D Art", color: "bg-rose-500", span: "md:col-span-2" },
        { title: "Motion Reel", category: "Animation", color: "bg-purple-600", span: "md:col-span-1" },
        { title: "UI Prototypes", category: "Interactive", color: "bg-blue-500", span: "md:col-span-1" },
        { title: "Concept Art", category: "Illustration", color: "bg-amber-500", span: "md:col-span-2" },
    ];

    return (
        <>
            <CustomCursor />
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden selection:bg-purple selection:text-white perspective-1000">

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
                <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-20">
                    <div className="max-w-[90rem] mx-auto w-full">
                        <div className="relative flex flex-col gap-2 md:gap-0">
                            <StaggerText
                                text="MULTIMEDIA"
                                className="text-[12vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-dark dark:text-light mix-blend-difference"
                            />
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
                                <StaggerText
                                    text="ARTS"
                                    delay={0.5}
                                    className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500"
                                />
                                <StaggerText
                                    text="&"
                                    delay={0.5}
                                    className="text-[12vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500"
                                />
                                <StaggerText
                                    text="ANIMATION"
                                    delay={0.5}
                                    className="text-[14vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500"
                                />
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1, duration: 1, ease: "circOut" }}
                                    className="h-[2px] bg-dark dark:bg-light flex-grow hidden md:block origin-left"
                                />

                            </div>
                        </div>

                        <motion.div
                            initial={{ scale: 1.1, opacity: 0, rotateX: 20 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
                            className="mt-8 md:mt-12 relative h-[50vh] md:h-[70vh] w-full rounded-[2rem] overflow-hidden perspective-1000 shadow-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10"
                        >
                            {/* Abstract Composition */}
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                {/* Grid Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                                {/* Floating Orb 1 */}
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 10, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple/30 rounded-full blur-[80px] mix-blend-screen"
                                />

                                {/* Floating Orb 2 */}
                                <motion.div
                                    animate={{
                                        y: [0, 30, 0],
                                        x: [0, 20, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-[100px] mix-blend-screen"
                                />

                                {/* Central Glass Element */}
                                <TiltCard className="relative z-10 w-64 h-64 md:w-96 md:h-96 bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center" color="">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />

                                    {/* Inner Geometric Shapes */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-32 h-32 md:w-48 md:h-48 border-2 border-white/30 rounded-full border-dashed"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-24 h-24 md:w-36 md:h-36 border border-purple/50 rounded-lg transform rotate-45"
                                    />
                                </TiltCard>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-20 right-20 md:top-32 md:right-32 w-16 h-16 bg-gradient-to-br from-purple to-fuchsia-500 rounded-2xl rotate-12 opacity-80 blur-sm"
                                />
                                <motion.div
                                    animate={{ y: [10, -10, 10] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute bottom-20 left-20 md:bottom-32 md:left-32 w-12 h-12 border-4 border-cyan-400/50 rounded-full"
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-24 h-24 md:w-48 md:h-48 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white/80 text-xs uppercase tracking-widest z-20"
                            >
                                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                    <text>
                                        <textPath href="#curve" className="fill-current text-[9px] font-bold">
                                            • CREATE • ANIMATE • INNOVATE • DESIGN
                                        </textPath>
                                    </text>
                                </svg>
                            </motion.div>
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
                {/* Showcase - 3D Tilt Grid */}
                <section className="relative z-10 py-16 md:py-24 bg-dark text-light perspective-1000">
                    <div className="max-w-[90rem] mx-auto px-4">
                        <div className="flex justify-between items-end mb-12 md:mb-16">
                            <StaggerText text="STUDENT GALLERY" className="text-3xl md:text-6xl font-black tracking-tighter" />
                            {/* <span className="text-sm md:text-xl font-mono text-purple block">
                                // STUDENT GALLERY
                            </span> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {showcaseItems.map((item, index) => (
                                <TiltCard
                                    key={index}
                                    className={`${item.span} aspect-[4/3] md:aspect-auto md:h-[500px]`}
                                    color={item.color}
                                >
                                    <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-all duration-500" />
                                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                        <p className="text-xs md:text-sm font-mono mb-2 opacity-70">{item.category}</p>
                                        <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                                        <div className="w-full h-[1px] bg-white/30 mt-4 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>



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

            </div>
        </>
    );
}

export default BSITMMA;

