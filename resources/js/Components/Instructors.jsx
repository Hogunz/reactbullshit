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

                    {/* Faculty Grid */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="600"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
                    >
                        {faculties.map((faculty, index) => (
                            <div
                                key={index}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                                <div className="relative h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col items-center text-center transform transition-all duration-300 group-hover:-translate-y-2">
                                    <Link
                                        href={route("faculties.show", {
                                            id: faculty.id,
                                        })}
                                        className="block relative  mb-6  overflow-hidden dark:border-white/10 shadow-lg group-hover:border-purple transition-colors duration-300"
                                    >
                                        <img
                                            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                            src={"/storage/" + faculty.image}
                                            alt={faculty.name}
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
                </div>
            </section>
        </>
    );
}
