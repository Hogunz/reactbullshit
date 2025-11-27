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
            <section className="relative bg-light dark:bg-dark min-h-screen w-full flex items-center justify-center overflow-hidden py-20 lg:py-0">
                {/* Background Gradient Blob */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="grid max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto lg:gap-12 xl:gap-0 lg:grid-cols-12 items-center z-10">
                    <div className="mr-auto place-self-center lg:col-span-7 order-2 lg:order-1">
                        <h1 className="max-w-3xl mb-6 text-4xl font-extrabold tracking-tight leading-tight text-dark dark:text-light md:text-5xl xl:text-7xl text-center lg:text-left">
                            Center of Development in{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">
                                Information Technology Education
                            </span>
                        </h1>

                        <p
                            data-aos="fade-up"
                            data-aos-duration="700"
                            className="max-w-2xl mb-8 font-light text-gray-600 dark:text-gray-300 text-center lg:text-left md:text-lg lg:text-xl leading-relaxed"
                        >
                            Unlock Your Potential at the Center of Development in
                            Information Technology Education. Ignite Your Future in
                            IT. Enroll Today and Build a Path to Success.
                        </p>
                        <div
                            className="flex flex-col sm:flex-row mb-8 lg:mb-16 space-y-4 sm:justify-center lg:justify-start sm:space-y-0 sm:space-x-6"
                            data-aos="fade-up"
                            data-aos-duration="600"
                            data-aos-delay="200"
                        >
                            <Link
                                href="/Contact"
                                className="inline-flex justify-center items-center py-4 px-8 text-base font-bold text-center text-white rounded-full bg-purple shadow-lg hover:bg-purple/90 hover:shadow-purple/50 transform hover:-translate-y-1 transition duration-300 ease-in-out"
                            >
                                Enroll Now
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                            <a
                                href="/ProgramDescription"
                                className="inline-flex justify-center items-center py-4 px-8 text-base font-bold text-center text-dark dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-transparent shadow-sm hover:shadow-md transition duration-300 ease-in-out"
                            >
                                See Our Programs
                            </a>
                        </div>
                    </div>
                    <div
                        className="mt-10 lg:mt-0 lg:col-span-5 flex justify-center order-1 lg:order-2 mb-10 lg:mb-0"
                        data-aos="fade-left"
                        data-aos-duration="800"
                    >
                        <div className="relative w-full max-w-sm lg:max-w-md">
                            <div className="absolute inset-0 bg-purple blur-2xl opacity-20 rounded-full"></div>
                            <img
                                className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500 ease-in-out object-cover h-[300px] sm:h-[400px] lg:h-[500px] w-full border-4 border-white dark:border-gray-800"
                                loading="lazy"
                                src="/img/pic1.jpg"
                                alt="Student Mockup"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
