import React from "react";
import { CalendarIcon, UserIcon } from "../Components/svg/SVGicon";
import CustomCursor from "@/Components/CustomCursor";

export default function BlogDescription({ events = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example formatting: YYYY-MM-DD HH:MM:SS
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(
                    2,
                    "0",
                )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    return (
        <>
            <CustomCursor />
            <div className="bg-[#FDFDFC] dark:bg-[#080212] min-h-screen relative overflow-hidden pt-20">
                {/* Deep Purple Ambient Lighting */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
                    <div className="absolute top-1/2 left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 dark:bg-fuchsia-900/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-50"></div>
                </div>

                <div className="max-w-4xl flex flex-col mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-100 dark:border-white/10 shadow-sm mb-8 w-fit">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400 tracking-widest uppercase">{events.category || 'Article'}</span>
                    </div>

                    <h1 className="font-extrabold text-dark dark:text-light text-4xl lg:text-5xl xl:text-6xl leading-tight lg:leading-[1.1] mb-8 tracking-tight">
                        {events.name}
                    </h1>

                    <div className="flex flex-wrap gap-6 pb-10 border-b border-gray-200 dark:border-white/10 mb-12">
                        <div className="flex space-x-3 items-center group">
                            <div className="p-2.5 rounded-full bg-purple/10 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                                <CalendarIcon className="w-5 h-5" />
                            </div>
                            <h2 className="font-semibold text-sm md:text-base text-gray-600 dark:text-gray-300">
                                {formatDate(events.created_at)}
                            </h2>
                        </div>
                        <div className="flex space-x-3 items-center group">
                            <div className="p-2.5 rounded-full bg-purple/10 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                                <UserIcon className="w-5 h-5" />
                            </div>
                            <h2 className="font-semibold text-sm md:text-base text-gray-600 dark:text-gray-300">
                                {events.user.name}
                            </h2>
                        </div>
                    </div>

                    <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5 mb-12 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                        <img
                            className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 hover:scale-[1.02]"
                            src={events.image?.startsWith('http') || events.image?.startsWith('/storage') ? events.image : "/storage/" + events.image}
                            alt={events.name}
                        />
                    </div>

                    <article className="prose prose-lg dark:prose-invert prose-purple max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-a:text-purple-600 hover:prose-a:text-purple-500">
                        <div
                            className="font-inter text-[1.1rem] leading-relaxed text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                                __html: events.content.replace(
                                    /(background(?:-color)?:\s*[^;]+;)|(color:\s*[^;]+;)/gi,
                                    "",
                                ), // Removes inline background and text colors
                            }}
                        />
                    </article>
                </div>
            </div>
        </>
    );
}
