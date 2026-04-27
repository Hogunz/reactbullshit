import React from "react";
import ButtonLink from "./ButtonLink";
import CustomCursor from "./CustomCursor";
import { Link } from "@inertiajs/react";
export const Description = ({ name = "SITE", props }) => (
    <div className="relative w-full overflow-hidden bg-[#FDFDFC] dark:bg-[#080212] pt-[160px] pb-[100px] border-b border-gray-100 dark:border-white/5">
        {/* Deep Purple Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
        </div>

        <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-extrabold tracking-tight text-dark dark:text-light drop-shadow-lg">
                {name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Specializations</span>
            </h1>
        </div>
    </div>
);

export default function Academics() {
    return (
        <>
            <CustomCursor />
            <section className="relative overflow-hidden bg-[#FDFDFC] dark:bg-[#080212] pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-screen">
                {/* Deep Purple Ambient Lighting */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-1/4 left-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen opacity-60"></div>
                    <div className="absolute bottom-1/4 right-[-5%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen opacity-70"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="text-center mb-16 lg:mb-24"
                    >
                        <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-4">
                            Academics
                        </h3>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-dark dark:text-light">
                            Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Description</span>
                        </h1>
                    </div>

                    {/* BSIT Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
                        {/* 3D Image */}
                        <div className="relative perspective-1000 group order-2 lg:order-1" data-aos="fade-right" data-aos-duration="800">
                            <div className="relative transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-6">
                                <div className="absolute inset-0 bg-purple/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
                                <img
                                    className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-2xl border-2 border-white dark:border-gray-800"
                                    src="/img/pic4.jpg"
                                    alt="BSIT"
                                />
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="order-1 lg:order-2" data-aos="fade-left" data-aos-duration="800">
                            <div className="relative p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
                                <h2 className="text-3xl font-bold text-purple mb-6">BSIT</h2>
                                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light">
                                    <p>
                                        The information technology curriculum
                                        prepares students for a career,
                                        postsecondary education, and lifetime
                                        professional development in the program's
                                        computer field by integrating technical,
                                        professional, and general education
                                        components. Additionally, the curriculum
                                        offers both foundational and advanced
                                        courses on information technology planning,
                                        development, integration, and management.
                                    </p>
                                    <p>
                                        The curriculum for BSIT includes the
                                        required GE courses, six (6) core courses
                                        common to all ITE programs, professional
                                        courses required for the BSIT program, and
                                        electives. The students are also required to
                                        undertake practicum work and complete a
                                        capstone project. Moreover, it is composed
                                        of three (3) Specializations.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href="/Program?program=BSIT"
                                    >
                                        <ButtonLink />
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BSCS Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Content Card */}
                        <div className="order-1" data-aos="fade-right" data-aos-duration="800">
                            <div className="relative p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
                                <h2 className="text-3xl font-bold text-purple mb-6">BSCS</h2>
                                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-light">
                                    <p>
                                        The Bachelor of Science in Computer Science
                                        specializing in Data Science is designed to
                                        equip students with a solid foundation in
                                        computer science principles while
                                        emphasizing data science techniques and
                                        applications. This program combines rigorous
                                        computer science theory with practical,
                                        hands-on experience in data analytics,
                                        machine learning, data visualization, and
                                        big data technologies. Students learn to
                                        extract meaningful insights from vast
                                        amounts of data and apply these insights to
                                        solve real-world problems across various
                                        domains, including business, healthcare,
                                        finance, and technology.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <Link href="/Program?program=BSCS">
                                        <ButtonLink />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 3D Image */}
                        <div className="relative perspective-1000 group order-2" data-aos="fade-left" data-aos-duration="800">
                            <div className="relative transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-y-6">
                                <div className="absolute inset-0 bg-purple/20 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
                                <img
                                    className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-2xl border-2 border-white dark:border-gray-800"
                                    src="/img/pic5.jpg"
                                    alt="BSCS"
                                />
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-fuchsia-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
