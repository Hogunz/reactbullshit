import React from "react";
import { Link } from "@inertiajs/react";

export default function Instructors({ faculties = [] }) {
    return (
        <>
            <section className="relative overflow-hidden bg-light dark:bg-dark py-20 lg:py-32">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="text-center mb-16 lg:mb-24"
                    >
                        <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-4">
                            Faculty
                        </h3>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-dark dark:text-light">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Instructors</span>
                        </h1>
                    </div>

                    {/* Faculty Grid by Rows */}
                    <div className="space-y-12 lg:space-y-16">
                        {Array.from(new Set(faculties.map(f => f.row_number || 1))).sort((a, b) => a - b).map(rowNum => {
                            const rowItems = faculties.filter(f => (f.row_number || 1) === rowNum);
                            return (
                                <div
                                    key={rowNum}
                                    data-aos="fade-up"
                                    data-aos-duration="600"
                                    className="flex flex-wrap justify-center gap-8 lg:gap-10"
                                >
                                    {rowItems.map((faculty, index) => (
                                        <div
                                            key={faculty.id}
                                            className="group relative w-full sm:w-[280px] max-w-[300px]"
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                            <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 group-hover:-translate-y-1">
                                                <Link
                                                    href={route("faculties.show", {
                                                        id: faculty.id,
                                                    })}
                                                    className="block relative aspect-[5/7] w-full mb-6 overflow-hidden dark:border-white/10 shadow-md group-hover:shadow-xl transition-all duration-300 rounded-xl"
                                                >
                                                    <img
                                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                        src={"/storage/" + faculty.image}
                                                        alt={faculty.name}
                                                        loading="lazy"
                                                    />
                                                </Link>

                                                <div className="flex-grow flex flex-col justify-between w-full">
                                                    <div>
                                                        <Link
                                                            href={route("faculties.show", {
                                                                id: faculty.id,
                                                            })}
                                                            className="block text-xl font-bold text-dark dark:text-light mb-2 hover:text-purple dark:hover:text-purple transition-colors"
                                                        >
                                                            {faculty.name}
                                                        </Link>
                                                        <p className="text-sm font-medium text-purple uppercase tracking-wider mb-4">
                                                            {faculty.position}
                                                        </p>
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
            </section>
        </>
    );
}
