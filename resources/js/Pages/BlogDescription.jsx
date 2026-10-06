import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import ImageModal from "@/Components/ImageModal";
import { 
    ZoomIn, 
    ArrowLeft, 
    ArrowRight, 
    ChevronRight, 
    Calendar, 
    User 
} from "lucide-react";

export default function BlogDescription({ events = {}, suggestions = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDisplayDate = () => {
        const dateStr = events?.start_time || events?.created_at;
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const dateFormatted = date.toLocaleDateString("en-US", { timeZone: 'Asia/Manila', month: "long", day: "numeric", year: "numeric" });
        const timeFormatted = date.toLocaleTimeString("en-US", { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: true });

        if (events?.category === 'Event' && events?.start_time && events?.end_time) {
            const endDate = new Date(events.end_time);
            const isSameDay = date.toLocaleDateString("en-US", { timeZone: 'Asia/Manila' }) === endDate.toLocaleDateString("en-US", { timeZone: 'Asia/Manila' });
            const endTimeFormatted = endDate.toLocaleTimeString("en-US", { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: true });

            if (isSameDay) {
                return `${dateFormatted} (${timeFormatted} - ${endTimeFormatted})`;
            } else {
                const endDateFormatted = endDate.toLocaleDateString("en-US", { timeZone: 'Asia/Manila', month: "long", day: "numeric", year: "numeric" });
                return `${dateFormatted} - ${endDateFormatted}`;
            }
        }

        // Check hour/minute in Manila timezone
        const manilaParts = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Manila',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        }).formatToParts(date);
        const hour = parseInt(manilaParts.find(p => p.type === 'hour')?.value || '0', 10);
        const minute = parseInt(manilaParts.find(p => p.type === 'minute')?.value || '0', 10);

        if (hour !== 0 || minute !== 0) {
            return `${dateFormatted} at ${timeFormatted}`;
        }
        return dateFormatted;
    };

    const formatItemDate = (item) => {
        const dateStr = item?.start_time || item?.created_at;
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { timeZone: 'Asia/Manila', month: "short", day: "numeric", year: "numeric" });
    };

    const resolveImageUrl = (image) => {
        if (!image) return null;
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return `/storage/${image}`;
    };

    // Filter out the current active event from database suggestions (real data only, no mockups)
    const realSuggestions = (suggestions || []).filter(s => s && s.id !== events?.id);

    // Right sidebar gets up to 5 real suggestions
    const sidebarSuggestions = realSuggestions.slice(0, 5);

    // End-of-story gets up to 2 real suggestions
    const bottomSuggestions = realSuggestions.slice(0, 2);

    const hasSidebar = sidebarSuggestions.length > 0;
    const mainImageUrl = resolveImageUrl(events?.image);

    return (
        <>
            <div className="bg-[#FDFDFC] dark:bg-[#080212] min-h-screen relative overflow-hidden pt-20 selection:bg-purple-500 selection:text-white">
                {/* Deep Purple Ambient Lighting */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
                    <div className="absolute top-1/2 left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 dark:bg-fuchsia-900/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-50"></div>
                </div>

                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                    
                    {/* Breadcrumbs / Back Navigation */}
                    <div className="mb-8">
                        <Link
                            href="/News&Events"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-purple dark:text-gray-400 dark:hover:text-purple-300 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                            <span>Back to News & Events</span>
                        </Link>
                    </div>

                    {/* Layout Grid */}
                    <div className={`grid grid-cols-1 ${hasSidebar ? 'lg:grid-cols-12 gap-12 lg:gap-16' : 'max-w-4xl mx-auto'} items-start`}>
                        
                        {/* Main Article Column */}
                        <div className={`${hasSidebar ? 'lg:col-span-8' : 'w-full'} flex flex-col`}>
                            
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-100 dark:border-white/10 shadow-sm mb-6 w-fit">
                                <span className="w-2 h-2 rounded-full bg-purple"></span>
                                <span className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase">
                                    {events?.category || 'Announcement'}
                                </span>
                            </div>

                            {/* Headline Title */}
                            <h1 className="font-extrabold text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight lg:leading-[1.15] mb-6 tracking-tight break-words">
                                {events?.name}
                            </h1>

                            {/* Author & Timestamp Bar */}
                            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200 dark:border-white/10 mb-10 text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-full bg-purple/10 text-purple">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-xs sm:text-sm">
                                        {formatDisplayDate()}
                                    </span>
                                </div>
                                {events?.user?.name && (
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-full bg-purple/10 text-purple">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-xs sm:text-sm">
                                            Posted by {events.user.name}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Hero Image with Zoom Modal Trigger */}
                            {mainImageUrl && (
                                <div className="mb-12">
                                    <div 
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#111] cursor-zoom-in group/img"
                                        title="Click to view full image"
                                    >
                                        <img
                                            className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 group-hover/img:scale-[1.02]"
                                            src={mainImageUrl}
                                            alt={events?.name || "Event Banner"}
                                        />
                                        {/* Hover overlay with zoom button */}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-[#111]/95 backdrop-blur-md text-gray-900 dark:text-white text-sm font-bold shadow-xl transform -translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                                                <ZoomIn className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                <span>Click to View Full Poster</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Article Body Content */}
                            <article className="prose prose-lg dark:prose-invert prose-purple max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-a:text-purple-600 hover:prose-a:text-purple-500 mb-12">
                                <div
                                    className="font-inter text-[1.1rem] leading-relaxed text-gray-700 dark:text-gray-300"
                                    dangerouslySetInnerHTML={{
                                        __html: (events?.content || "").replace(
                                            /(background(?:-color)?:\s*[^;]+;)|(color:\s*[^;]+;)/gi,
                                            "",
                                        ),
                                    }}
                                />
                            </article>

                            {/* Suggestions At The End Of The Story (Real Database Data) */}
                            {bottomSuggestions.length > 0 && (
                                <div className="pt-8 border-t border-gray-200 dark:border-white/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-purple">Related Updates</span>
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-1">
                                                More Stories You Might Like
                                            </h3>
                                        </div>
                                        <Link
                                            href="/News&Events"
                                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-purple hover:text-purple-dark transition-colors uppercase tracking-wider"
                                        >
                                            <span>See All</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {bottomSuggestions.map((item) => {
                                            const itemImage = resolveImageUrl(item.image);

                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={route('events.show', item.id)}
                                                    className="group flex flex-col bg-white dark:bg-[#0c0c0e] rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                                >
                                                    <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-white/5">
                                                        {itemImage ? (
                                                            <img
                                                                src={itemImage}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 dark:text-gray-600 text-sm">
                                                                No Image
                                                            </div>
                                                        )}
                                                        <div className="absolute top-3 left-3">
                                                            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
                                                                {item.category || 'News'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col flex-grow p-6">
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">
                                                            {formatItemDate(item)}
                                                        </span>
                                                        <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple transition-colors leading-snug line-clamp-2 mb-2">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
                                                            {(item.content || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')}
                                                        </p>
                                                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple group-hover:gap-2 transition-all mt-auto">
                                                            <span>Read Full Story</span>
                                                            <ArrowRight className="w-3.5 h-3.5" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Right Sidebar Column with Real Suggestions Only (No Mockups, No Banner) */}
                        {hasSidebar && (
                            <aside className="lg:col-span-4 w-full">
                                <div className="sticky top-28 space-y-8">
                                    
                                    {/* Real Database Stories Widget */}
                                    <div className="bg-white dark:bg-[#0c0c0e] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-white/5 shadow-xl shadow-purple-500/5">
                                        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10 mb-5">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-2.5 h-2.5 rounded-full bg-purple animate-pulse"></span>
                                                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight">
                                                    Other Stories
                                                </h3>
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple px-2.5 py-0.5 rounded-full bg-purple/10">
                                                Latest
                                            </span>
                                        </div>

                                        <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/5">
                                            {sidebarSuggestions.map((item, idx) => {
                                                const itemImage = resolveImageUrl(item.image);

                                                return (
                                                    <Link
                                                        key={item.id}
                                                        href={route('events.show', item.id)}
                                                        className="group py-4 first:pt-0 last:pb-0 flex items-start gap-4 transition-colors"
                                                    >
                                                        {/* Thumbnail */}
                                                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm">
                                                            {itemImage ? (
                                                                <img
                                                                    src={itemImage}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center font-black text-gray-400 dark:text-gray-600 text-lg">
                                                                    0{idx + 1}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Story Meta and Headline */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-purple mb-1">
                                                                <span>{item.category || 'News'}</span>
                                                                <span className="text-gray-400 dark:text-gray-600">•</span>
                                                                <span className="text-gray-500 dark:text-gray-400 font-normal">
                                                                    {formatItemDate(item)}
                                                                </span>
                                                            </div>
                                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-purple transition-colors leading-snug line-clamp-2">
                                                                {item.name}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </aside>
                        )}

                    </div>
                </div>

                {/* Lightbox Image Modal */}
                {mainImageUrl && (
                    <ImageModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        imageSrc={mainImageUrl}
                        title={events?.name}
                        category={events?.category || "News"}
                    />
                )}
            </div>
        </>
    );
}
