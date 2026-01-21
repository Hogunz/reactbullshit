import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import React from "react";
import { Link } from "@inertiajs/react";

export default function FacultyPage({ faculties = [] }) {
    return (
        <>
            <CustomCursor />
            <div className="dark:bg-dark w-full min-h-screen relative">
                <NavBar />

                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 pt-32 pb-20 lg:pt-52 lg:pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16 lg:mb-24">
                            <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-4">
                                Meet Our
                            </h3>
                            <h1 className="text-4xl lg:text-7xl font-extrabold text-dark dark:text-light mb-6">
                                Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Instructors</span>
                            </h1>
                        </div>

                        {/* Faculty Grid by Rows */}
                        <div className="space-y-12 lg:space-y-16">
                            {/* Grouping Logic */}
                            {Array.from(new Set(faculties.map(f => f.row_number || 1))).sort((a, b) => a - b).map(rowNum => {
                                const rowItems = faculties.filter(f => (f.row_number || 1) === rowNum);
                                return (
                                    <div key={rowNum} className="flex flex-wrap justify-center gap-8 lg:gap-10">
                                        {rowItems.map((faculty, index) => (
                                            <div
                                                key={faculty.id}
                                                className="group relative flex flex-col h-full w-full sm:w-[320px] max-w-[320px]"
                                            >
                                                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                                <div className="relative flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1">
                                                    {/* Image */}
                                                    <Link
                                                        href={route("faculties.show", {
                                                            id: faculty.id,
                                                        })}
                                                        className="relative block aspect-[5/7] overflow-hidden"
                                                    >
                                                        <img
                                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                            src={"/storage/" + faculty.image}
                                                            alt={faculty.name}
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </Link>

                                                    {/* Content */}
                                                    <div className="flex flex-col flex-grow p-6 sm:p-8">
                                                        <div className="flex-grow text-center">
                                                            <Link
                                                                href={route("faculties.show", {
                                                                    id: faculty.id,
                                                                })}
                                                                className="block"
                                                            >
                                                                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2 hover:text-purple dark:hover:text-purple transition-colors">
                                                                    {faculty.name}
                                                                </h3>
                                                            </Link>
                                                            <p className="text-purple font-medium tracking-wide uppercase text-sm mb-4">
                                                                {faculty.position}
                                                            </p>
                                                        </div>

                                                        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                                            <Link
                                                                href={route("faculties.show", {
                                                                    id: faculty.id,
                                                                })}
                                                                className="inline-flex items-center gap-2 text-sm font-bold text-purple hover:text-fuchsia-600 transition-colors"
                                                            >
                                                                View Profile
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
