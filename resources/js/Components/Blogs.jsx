import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@inertiajs/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Blogs({ events = [] }) {
    const sectionRef = useRef(null);

    // Dummy data for the editorial layout fallback
    const featuredArticle = {
        category: "Achievements",
        date: "October 15, 2026",
        title: "SITE Students Sweep National Cybersecurity Hackathon",
        excerpt: "Our senior IT students took home the grand prize at the annual CyberDefend Philippines competition, showcasing advanced penetration testing and network defense techniques.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", 
    };

    const newsList = [
        {
            category: "Events",
            date: "October 10, 2026",
            title: "Annual Global Tech Symposium Returns to Universidad de Dagupan",
        },
        {
            category: "Partnerships",
            date: "September 28, 2026",
            title: "SITE Announces New Cloud Computing Curriculum with Industry Leaders",
        },
        {
            category: "Student Life",
            date: "September 15, 2026",
            title: "Exploring the New State-of-the-Art Mac Laboratories",
        }
    ];

    const displayFeatured = events.length > 0 ? {
        category: events[0].category,
        date: new Date(events[0].created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        title: events[0].name,
        excerpt: (events[0].content || '').replace(/<[^>]+>/g, '').substring(0, 150) + '...',
        imageUrl: events[0].image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
        id: events[0].id
    } : featuredArticle;

    const displayNewsList = events.length > 1 
        ? events.slice(1, 4).map(e => ({
            category: e.category,
            date: new Date(e.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            title: e.name,
            id: e.id
        }))
        : newsList;

    useGSAP(() => {
        // Section Header Animation
        gsap.from(".news-header", {
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

        // Featured Article (Left Side) slides up
        gsap.from(".news-featured", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".news-grid",
                start: "top 75%",
            }
        });

        // News List (Right Side) staggers in
        gsap.from(".news-list-item", {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".news-grid",
                start: "top 70%",
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#FDFDFC] dark:bg-[#080212] overflow-hidden selection:bg-purple-500 selection:text-white border-t border-gray-100 dark:border-white/5">

            {/* Deep Purple Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 dark:bg-fuchsia-900/30 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
            </div>

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-6">
                    <div className="max-w-2xl">
                        <div className="news-header inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-100 dark:border-white/10 shadow-sm mb-6">
                            <span className="text-sm font-bold text-purple-600 tracking-widest uppercase">The Latest</span>
                        </div>
                        <h2 className="news-header text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            News & <span className="text-purple-600 dark:text-purple-500">Stories</span>
                        </h2>
                    </div>
                    <div className="news-header">
                        <Link href="/News&Events" className="inline-flex items-center gap-2 group font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                            View All Articles
                            <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Asymmetrical Editorial Grid */}
                <div className="news-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column: Featured Hero Article (60% width) */}
                    <Link href={`/events/${displayFeatured.id}`} className="news-featured lg:col-span-7 group block">
                        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-8 shadow-2xl border border-gray-100 dark:border-white/5">
                            <div className="absolute inset-0 bg-gray-900/10 dark:bg-black/20 mix-blend-color group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src={displayFeatured.imageUrl}
                                alt={displayFeatured.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                                <span className="text-purple-600 dark:text-purple-400">{displayFeatured.category}</span>
                                <span className="text-gray-400 dark:text-gray-500">&bull;</span>
                                <span className="text-gray-500 dark:text-gray-400">{displayFeatured.date}</span>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 break-words">
                                {displayFeatured.title}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed md:max-w-2xl break-words">
                                {displayFeatured.excerpt}
                            </p>
                            <div className="pt-4 inline-flex items-center gap-2 font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                Read Full Story
                                <span className="transform transition-transform group-hover:translate-x-2">→</span>
                            </div>
                        </div>
                    </Link>

                    {/* Right Column: Sleek Vertical List (40% width) */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                        <div className="border-t-2 border-gray-900 dark:border-white mb-2"></div>

                        {displayNewsList.map((news, i) => (
                            <Link href={`/events/${news.id || 1}`} key={i} className="news-list-item group flex flex-col py-8 border-b border-gray-200 dark:border-white/10 block">
                                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
                                    <span className="text-blue-600 dark:text-blue-400">{news.category}</span>
                                    <span className="text-gray-400 dark:text-gray-500">&bull;</span>
                                    <span className="text-gray-500 dark:text-gray-400">{news.date}</span>
                                </div>

                                <div className="flex items-start justify-between gap-4 w-full">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 pr-4 sm:pr-8 break-words flex-1">
                                        {news.title}
                                    </h3>

                                    {/* Animated Arrow */}
                                    <div className="mt-1 shrink-0 w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:border-blue-600 group-hover:bg-blue-600 dark:group-hover:text-white group-hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}



                    </div>

                </div>
            </div>
        </section>
    );
}
