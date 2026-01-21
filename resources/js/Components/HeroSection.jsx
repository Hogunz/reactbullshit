import AnimatedText from "@/Components/AnimatedText";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function HeroSection() {
    useEffect(() => {
        AOS.init({});
    }, []);
    return (
        <>
            <section className="relative bg-white dark:bg-dark min-h-screen w-full flex items-center overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-fuchsia-500/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">

                        {/* Text Content */}
                        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left pt-20 lg:pt-0 order-2 lg:order-1 flex flex-col justify-center">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-dark dark:text-light mb-8">
                                Center of <br /> Development in{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-400">
                                    Information Technology Education
                                </span>
                            </h1>

                            <p
                                className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light"
                                data-aos="fade-up"
                                data-aos-duration="700"
                            >
                                Unlock Your Potential at the Center of Development in
                                Information Technology Education. Ignite Your Future in
                                IT. Enroll Today and Build a Path to Success.
                            </p>

                            <div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="200"
                            >
                                <Link
                                    href="/Contact"
                                    className="inline-flex justify-center items-center py-4 px-10 text-lg font-bold text-white rounded-full bg-gradient-to-r from-purple to-fuchsia-600 shadow-xl shadow-purple/30 hover:shadow-purple/50 hover:scale-105 transition-all duration-300"
                                >
                                    Enroll Now
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>
                                <a
                                    href="/ProgramDescription"
                                    className="inline-flex justify-center items-center py-4 px-10 text-lg font-bold text-dark dark:text-white bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
                                >
                                    See Our Programs
                                </a>
                            </div>
                        </div>

                        {/* Image Content - Bigger and Modern */}
                        <div
                            className="relative lg:h-[90vh] w-full flex items-center justify-center order-1 lg:order-2"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                        >
                            <div className="relative w-full h-[50vh] lg:h-[85%] rounded-3xl overflow-hidden shadow-2xl shadow-purple/20 rotate-[-1deg] hover:rotate-0 transition-all duration-700 ease-out border-4 border-white dark:border-white/5 bg-gray-900 group">
                                {/* Blurred Background for Fill */}
                                <img
                                    src="/img/hero_section.jpg"
                                    alt="Background"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 blur-xl scale-110"
                                    loading="eager"
                                    fetchPriority="high"
                                />

                                {/* Main Full Image */}
                                <img
                                    src="/img/hero_section.jpg"
                                    alt="UDD Faculty and Students"
                                    className="relative z-10 w-full h-full object-contain transform transition-transform duration-1000 group-hover:scale-[1.02]"
                                    loading="eager"
                                    fetchPriority="high"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent z-20 pointer-events-none"></div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-20 right-10 w-72 h-72 bg-purple/30 rounded-full blur-[80px]"></div>
                            <div className="absolute -z-10 bottom-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[80px]"></div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
