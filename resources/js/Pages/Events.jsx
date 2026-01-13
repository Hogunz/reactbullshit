import { NavBar } from "@/Components/NavBar";
import React from "react";
import ButtonLink from "@/Components/ButtonLink";
import CustomCursor from "@/Components/CustomCursor";
import { Link } from "@inertiajs/react";



export default function Events({ events = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example formatting: YYYY-MM-DD HH:MM:SS
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };
    return (
        <>
            <CustomCursor />
            <div className="dark:bg-dark w-full min-h-screen relative overflow-hidden">
                <NavBar />

                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 pt-32 pb-20 lg:pt-52 lg:pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16 lg:mb-24">
                            <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-4">
                                Updated Content
                            </h3>
                            <h1 className="text-4xl lg:text-7xl font-extrabold text-dark dark:text-light mb-6">
                                News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Events</span>
                            </h1>
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="group relative flex flex-col h-full"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                                    <div className="relative flex flex-col h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl transform transition-all duration-300 group-hover:-translate-y-2">
                                        {/* Image */}
                                        <Link
                                            href={route("events.show", {
                                                id: event.id,
                                            })}
                                            className="relative block h-64 overflow-hidden"
                                        >
                                            <img
                                                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                                src={"/storage/" + event.image}
                                                alt={event.name}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </Link>

                                        {/* Content */}
                                        <div className="flex flex-col flex-grow p-6 sm:p-8">
                                            <div className="flex-grow">
                                                <p className="text-sm font-medium text-purple mb-3">
                                                    {formatDate(event.created_at)}
                                                </p>
                                                <Link
                                                    href={route("events.show", {
                                                        id: event.id,
                                                    })}
                                                    className="block"
                                                >
                                                    <h3 className="text-xl font-bold text-dark dark:text-light mb-4 line-clamp-2 hover:text-purple dark:hover:text-purple transition-colors">
                                                        {event.name}
                                                    </h3>
                                                </Link>
                                                <div className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed mb-6">
                                                    <p dangerouslySetInnerHTML={{
                                                        __html: event.content,
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                                <Link
                                                    href={route("events.show", {
                                                        id: event.id,
                                                    })}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-purple hover:text-fuchsia-600 transition-colors"
                                                >
                                                    Read More
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
