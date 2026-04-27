import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
    {
        name: "Christopher D. Ocillos",
        initials: "CO",
        role: "Businessman",
        text: "Being a BSIT student can be an exciting and challenging experience. The program provides students with a comprehensive understanding of various aspects of information technology, including programming languages, software development, database management, networking, cybersecurity, and web design. BSIT students frequently get the chance to take classes from seasoned instructors who have practical knowledge in the subject and may offer insightful commentary. They also participate in practical, hands-on learning activities that let them put the academic theories they have learned to use in actual situations. Furthermore, BSIT students frequently engage in groups with their classmates on projects, which helps them build leadership and collaboration skills and gives them networking chances. The curriculum also encourages students to participate in extracurricular activities like tech clubs, hackathons, and coding contests, which may further their professional growth and keep them up to speed with the most recent developments in the industry."
    },
    {
        name: "Vanessa Eliscupides Yambao",
        initials: "VY",
        role: "Bank Officer IV",
        text: "My journey in college is one of the best things that happened in my life. As a person who values high-quality education and someone who believes that God's given talent should be used to glorify His Name, Colegio de Dagupan was my best partner then. CdD has not only helped me succeed me to become a well-rounded person and to thrive in an ever-changing environment. I am honored to be part of a supportive environment where talents and skills are valued through curricular and extracurricular programs. I am also thankful for my outstanding collegues, who have shared experiences with me in my adventure. I extend my gratitude to the Arzadon family, especially to my mentor, Sir Voltaire. His support and kindness will always stay in my heart. This proud Dagupeña will be forever grateful to my alma mater."
    },
    {
        name: "Rex Añonuevo",
        initials: "RA",
        role: "CISCO Design Engineer",
        text: "\"In any field of expertise, success is built upon a solid foundation, you'll have trouble creating anything of value.\" A sturdy foundation is acquired by starting with the right learning institution that gives an environment that pushes you beyond your limits, provides a venue where you apply what you have learned, and where educators exemplify an unparalleled commitment to help others become the best version of themselves. All these summarize my journey in Colegio de Dagupan. To the Colegio de Dagupan community, especially to the Arzadon Family, thank you for helping and guiding me during my undergraduate studies. It is such an honor to carry our school's name."
    },
    {
        name: "Jan Julliene Samson Narvasa",
        initials: "JN",
        role: "Alumni",
        text: "I give my highest respect to this institution, Universidad de Dagupan, that honed me to be a professional. I belong to the first batch of K-12 graduates and one who pursued my senior high school and tertiary education in this institution because I know, I am destined to be successful in their hands. I have witnessed how UdD changed lives not only of their students but also the City of Dagupan as a community and its nearby municipalities. Its vision “to create a community that is responsive to the challenges of the changing world” motivated every member of this institution to Unite, Discover, Develop and work towards its fulfilment.”"
    }
];

// Inner component to handle individual "Read More" state cleanly
const TestimonialItem = ({ t }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Normalize data structure between DB and hardcoded
    const name = t.student_name || t.name || "Student";
    const role = t.position || t.program || t.role || "Alumni";
    const text = t.content || t.message || t.text || "";
    const initials = t.initials || name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div className="testim-card relative flex flex-col group p-6 lg:p-8 rounded-3xl bg-gray-50/50 dark:bg-white/[0.03] border border-transparent dark:border-white/[0.05] hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-500 shadow-sm hover:shadow-xl">
            {/* Minimal Author Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#080212] flex items-center justify-center text-xs text-gray-900 dark:text-white font-bold tracking-wider select-none">
                        {initials}
                    </div>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{name}</h4>
                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1">{role}</p>
                </div>
            </div>

            {/* Typography-focused Quote block */}
            <div className="relative pl-6 border-l-2 border-blue-600/20 dark:border-purple-500/20">
                <p className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium transition-all duration-500
                    ${isExpanded ? '' : 'line-clamp-4'}
                `}>
                    {text.replace(/^"|"$/g, '')}
                </p>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 font-bold text-sm tracking-wide text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 uppercase flex items-center gap-2 transition-colors"
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default function Testimonials({ bscstestimonials = [] }) {
    const sectionRef = useRef(null);
    const gridContainerRef = useRef(null);
    
    // Use dynamic testimonials if provided, otherwise fallback
    const displayTestimonials = bscstestimonials.length > 0 
        ? bscstestimonials 
        : testimonials;

    useGSAP(() => {
        // Fade up lines for headers
        gsap.from(".testim-header", {
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

        // Simple elegant fade-up for each card
        const cards = gsap.utils.toArray(".testim-card");
        cards.forEach((card) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#FDFDFC] dark:bg-[#080212] overflow-hidden">
            {/* Deep Purple Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
                <div className="absolute bottom-1/4 right-[-5%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24 space-y-6">
                    <h2 className="testim-header text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Testimonials
                    </h2>
                </div>

                {/* Read-Optimized Masonry Grid */}
                <div
                    ref={gridContainerRef}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 w-full"
                >
                    {displayTestimonials.map((t, i) => (
                        <TestimonialItem key={i} t={t} />
                    ))}
                </div>

            </div>
        </section>
    );
}
