import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import CustomCursor from "@/Components/CustomCursor";
import { SakuraBackground } from "@/Components/SakuraBackground";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Trophy,
    Medal,
    Award,
    Calendar,
    Users,
    UserCheck,
    Play,
    Video,
    Image as ImageIcon,
    Search,
    ChevronRight,
    X,
    ExternalLink
} from "lucide-react";

export default function HallOfFame({ competitions = [] }) {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-out-cubic",
        });
    }, []);

    const categories = [
        "ALL",
        "Hackathon",
        "Cybersecurity",
        "Game Development",
        "Web & Mobile Development",
        "Data Science & AI",
        "Programming Competition",
        "Robotics & IoT"
    ];

    // Filter competitions
    const filteredCompetitions = competitions.filter((comp) => {
        const matchesCategory =
            selectedCategory === "ALL" ||
            comp.category?.toLowerCase() === selectedCategory.toLowerCase();
        
        const matchesSearch =
            searchQuery === "" ||
            comp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.competition_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.award?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.team_members?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.coach?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const getAwardStyle = (award) => {
        if (!award) return null;
        const low = award.toLowerCase();
        if (low.includes("1st") || low.includes("champion") || low.includes("gold")) {
            return {
                bg: "bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 shadow-amber-500/20",
                icon: Trophy,
                border: "border-amber-400/40",
            };
        } else if (low.includes("2nd") || low.includes("silver") || low.includes("runner up")) {
            return {
                bg: "bg-gradient-to-r from-slate-300 to-gray-200 text-gray-900 shadow-slate-400/20 dark:from-slate-700 dark:to-slate-600 dark:text-white",
                icon: Medal,
                border: "border-slate-300 dark:border-slate-600",
            };
        } else if (low.includes("3rd") || low.includes("bronze")) {
            return {
                bg: "bg-gradient-to-r from-amber-700 to-orange-600 text-white shadow-orange-700/20",
                icon: Medal,
                border: "border-orange-600/40",
            };
        }
        return {
            bg: "bg-gradient-to-r from-purple to-fuchsia-600 text-white shadow-purple/20",
            icon: Award,
            border: "border-purple/30",
        };
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <>
            <Head title="Hall of Fame | Competitions & Achievements" />
            <CustomCursor />
            <NavBar />

            <div className="relative min-h-screen bg-[#FDFDFC] dark:bg-[#080212] overflow-hidden font-sans selection:bg-purple selection:text-white">
                <SakuraBackground petalCount={15} />

                {/* Deep Ambient Background Lighting */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-purple-600/15 dark:bg-purple-600/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 dark:bg-fuchsia-900/15 rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen opacity-50"></div>
                </div>

                <div className="relative z-10 pt-32 pb-24 lg:pt-48 lg:pb-36 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                    
                    {/* Clean Minimal Header Section */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="text-center mb-16 lg:mb-20"
                    >
                        <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-3">
                            Competitions & Achievements
                        </h3>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-dark dark:text-light">
                            Hall of <span className="text-purple">Fame</span>
                        </h1>
                        <p className="mt-4 text-base text-gray-600 dark:text-gray-400 font-normal max-w-xl mx-auto">
                            Student and faculty achievements in competitions and hackathons.
                        </p>
                    </div>

                    {/* Filter Pills & Search */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12"
                    >
                        {/* Segmented Category Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-gray-100/90 dark:bg-[#140e24] border border-gray-200/80 dark:border-white/10 shadow-sm w-full md:w-auto overflow-x-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                                        selectedCategory === cat
                                            ? "bg-white dark:bg-purple text-gray-900 dark:text-white shadow-sm border border-gray-200/60 dark:border-purple/40 font-bold"
                                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search competitions, teams..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#140e24] border border-gray-200/80 dark:border-white/10 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple/50 transition-all shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Competitions Grid */}
                    {filteredCompetitions.length === 0 ? (
                        <div className="text-center py-24 bg-white/50 dark:bg-[#140e24]/60 rounded-2xl border border-gray-200/60 dark:border-white/5 p-12">
                            <Trophy className="w-14 h-14 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">No competition stories found</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search query or selecting a different category filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {filteredCompetitions.map((item, index) => {
                                const awardInfo = getAwardStyle(item.award);
                                const AwardIcon = awardInfo ? awardInfo.icon : null;

                                return (
                                    <div
                                        key={item.id}
                                        data-aos="fade-up"
                                        data-aos-duration="800"
                                        data-aos-delay={(index % 3) * 100}
                                        className="group relative flex flex-col bg-white dark:bg-[#120b20] rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:shadow-xl hover:border-purple/40 dark:hover:border-purple/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        {/* Media Preview Area - Adaptive for all orientations (Portrait, Landscape, Square) */}
                                        <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-zinc-950 dark:bg-black flex items-center justify-center border-b border-gray-100 dark:border-white/5">
                                            {item.media_path ? (
                                                <>
                                                    {/* Ambient Blurred Backdrop for seamless aspect ratio adaptation */}
                                                    {item.media_type === "image" ? (
                                                        <img
                                                            src={item.media_path}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                                                        />
                                                    ) : (
                                                        <video
                                                            src={item.media_path}
                                                            aria-hidden="true"
                                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 pointer-events-none"
                                                            muted
                                                            loop
                                                            playsInline
                                                        />
                                                    )}

                                                    {/* Foreground Main Media */}
                                                    {item.media_type === "video" ? (
                                                        <div className="relative z-10 w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                                            <video
                                                                src={item.media_path}
                                                                className="max-h-full max-w-full object-contain drop-shadow-md"
                                                                muted
                                                                loop
                                                                playsInline
                                                                onMouseOver={(e) => e.target.play()}
                                                                onMouseOut={(e) => e.target.pause()}
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                                                                <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-purple dark:text-white shadow-lg group-hover:scale-110 transition-transform">
                                                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                                                </div>
                                                            </div>
                                                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                                                <Video className="w-3 h-3" />
                                                                Video
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={item.media_path}
                                                            alt={item.title}
                                                            className="relative z-10 max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-700 drop-shadow-md"
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple/10 to-indigo-600/10 p-6 text-center">
                                                    <Trophy className="w-12 h-12 text-purple/40 group-hover:scale-110 transition-transform" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                            
                                            {/* Meta Tags: Award & Category */}
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                {item.award && awardInfo && (
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm border ${awardInfo.bg} ${awardInfo.border}`}>
                                                        <AwardIcon className="w-3.5 h-3.5" />
                                                        {item.award}
                                                    </span>
                                                )}
                                                {item.category && (
                                                    <span className="px-2.5 py-1 rounded-full bg-purple/10 dark:bg-white/10 text-purple dark:text-purple-300 text-[11px] font-bold">
                                                        {item.category}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Competition Name Subtitle */}
                                            <p className="text-xs font-bold text-purple dark:text-purple-300 uppercase tracking-wider mb-1.5">
                                                {item.competition_name}
                                            </p>

                                            {/* Headline Title */}
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-purple dark:group-hover:text-purple-300 transition-colors mb-3 line-clamp-2">
                                                {item.title}
                                            </h3>

                                            {/* Brief Content Preview */}
                                            {item.content && (
                                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-4 line-clamp-3 flex-grow">
                                                    {item.content.replace(/<[^>]+>/g, '')}
                                                </p>
                                            )}

                                            {/* Team Members Chips */}
                                            {item.team_members && (
                                                <div className="pt-3 border-t border-gray-100 dark:border-white/5 mb-4">
                                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
                                                        <Users className="w-3.5 h-3.5 text-purple" />
                                                        <span>Team:</span>
                                                    </div>
                                                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1">
                                                        {item.team_members}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Footer Info: Date & Action */}
                                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
                                                <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(item.event_date || item.created_at)}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-purple dark:text-purple-300 group-hover:translate-x-1 transition-transform font-bold">
                                                    Read Story
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>

            {/* Interactive Story Modal Reader */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#120a22] border border-gray-200 dark:border-white/15 shadow-2xl text-gray-900 dark:text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top Header Bar with Separate Close Button */}
                        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#120a22]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-purple" />
                                <span className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
                                    {selectedItem.competition_name}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors shadow-sm"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Media Showcase Header - Adaptive for Landscape, Portrait & Square Media */}
                        {selectedItem.media_path && (
                            <div className="relative w-full bg-zinc-950 flex items-center justify-center min-h-[280px] max-h-[70vh] overflow-hidden p-2 sm:p-4">
                                {/* Ambient Backdrop */}
                                {selectedItem.media_type === "image" ? (
                                    <img
                                        src={selectedItem.media_path}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-150 pointer-events-none"
                                    />
                                ) : (
                                    <video
                                        src={selectedItem.media_path}
                                        aria-hidden="true"
                                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-150 pointer-events-none"
                                        muted
                                        loop
                                        playsInline
                                    />
                                )}

                                {selectedItem.media_type === "video" ? (
                                    <video
                                        src={selectedItem.media_path}
                                        controls
                                        autoPlay
                                        className="relative z-10 max-h-[66vh] max-w-full w-auto object-contain rounded-xl shadow-2xl"
                                    />
                                ) : (
                                    <a
                                        href={selectedItem.media_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Click to view full resolution image"
                                        className="relative z-10 flex items-center justify-center group/view"
                                    >
                                        <img
                                            src={selectedItem.media_path}
                                            alt={selectedItem.title}
                                            className="max-h-[66vh] max-w-full w-auto object-contain rounded-xl shadow-2xl transition-transform group-hover/view:scale-[1.01]"
                                        />
                                        <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold opacity-0 group-hover/view:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg pointer-events-none">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            View Full Image
                                        </span>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Story Content Body */}
                        <div className="p-6 sm:p-10 space-y-6">
                            
                            {/* Meta Badges */}
                            <div className="flex flex-wrap items-center gap-2.5">
                                {selectedItem.award && (
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                                        <Trophy className="w-3.5 h-3.5" />
                                        {selectedItem.award}
                                    </span>
                                )}
                                {selectedItem.category && (
                                    <span className="px-3 py-1 rounded-full bg-purple/10 dark:bg-white/10 text-purple dark:text-purple-300 text-xs font-bold">
                                        {selectedItem.category}
                                    </span>
                                )}
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDate(selectedItem.event_date || selectedItem.created_at)}
                                </span>
                            </div>

                            {/* Headline */}
                            <div>
                                <p className="text-xs font-bold text-purple uppercase tracking-widest mb-1">
                                    {selectedItem.competition_name}
                                </p>
                                <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                    {selectedItem.title}
                                </h2>
                            </div>

                            {/* Team Roster & Mentor Grid */}
                            {(selectedItem.team_members || selectedItem.coach) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10">
                                    {selectedItem.team_members && (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                <Users className="w-3.5 h-3.5 text-purple" />
                                                <span>Participants / Team</span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {selectedItem.team_members}
                                            </p>
                                        </div>
                                    )}

                                    {selectedItem.coach && (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                <UserCheck className="w-3.5 h-3.5 text-purple" />
                                                <span>Coach / Mentor</span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                {selectedItem.coach}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Story Text */}
                            {selectedItem.content ? (
                                <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line">
                                    {selectedItem.content}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">
                                    No full write-up provided for this competition.
                                </p>
                            )}

                            {/* Footer Action */}
                            <div className="pt-6 border-t border-gray-100 dark:border-white/10 flex justify-end">
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="px-6 py-2.5 rounded-full bg-purple hover:bg-purple-dark text-white font-bold text-sm transition-colors"
                                >
                                    Close Story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
