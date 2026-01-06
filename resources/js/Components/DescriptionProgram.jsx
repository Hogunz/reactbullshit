import React from "react";
import { motion } from "framer-motion";
import {
    LocationIcon,
    PhoneIcon,
    MessageIcon,
    FinderIcon,
} from "./svg/SVGicon";
import CustomCursor from "./CustomCursor";

export const BSITDescriptionProgram = ({ attributes }) => {
    const specializations = [
        {
            title: "Multimedia Arts and Animation",
            image: "img/1.jpg",
            link: "/academics/bsit/MMA",
        },
        {
            title: "Web and Mobile Application Development",
            image: "img/2.jpg",
            link: "/academics/bsit/WMAD",
        },
        {
            title: "Network Infrastructure with Cybersecurity",
            image: "img/3.jpg",
            link: "/academics/bsit/NICS",
        },
    ];

    // Filter attributes for BSIT
    const peos = attributes?.filter(attr => attr.program === 'BSIT' && attr.type === 'PEO') || [];
    const pos = attributes?.filter(attr => attr.program === 'BSIT' && attr.type === 'PO') || [];
    const ios = attributes?.filter(attr => attr.program === 'BSIT' && attr.type === 'IO') || [];
    const heis = attributes?.filter(attr => attr.program === 'BSIT' && attr.type === 'HEI') || [];
    const pathfits = attributes?.filter(attr => attr.program === 'BSIT' && attr.type === 'PATHFIT') || [];
    const advocacies = attributes?.filter(attr => attr.program === 'BSIT' && attr.type === 'ADVOCACY') || [];

    return (
        <>
            <CustomCursor />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    {/* Specializations Grid */}
                    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16 md:mb-24">
                        {specializations.map((spec, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative h-80 md:h-96 cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
                            >
                                <img
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    src={spec.image}
                                    alt={spec.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-md leading-tight">
                                        {spec.title}
                                    </h3>
                                    <a href={spec.link}>
                                        <button className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 py-2 md:py-3 px-6 md:px-8 text-sm font-bold text-white shadow-lg hover:bg-white hover:text-purple transition-all duration-300 transform hover:-translate-y-1">
                                            Explore Program
                                        </button>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* PEO Section */}
                    <div className="mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-dark dark:text-light mb-10 md:mb-16 tracking-tight">
                            Program Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Objectives</span>
                        </h2>
                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/20 shadow-xl">
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-center max-w-4xl mx-auto">
                                The Program Educational Objectives (PEO) of the Bachelor of Science in Information Technology of Universidad de Dagupan are to produce graduates that after three to five years graduation they have:
                            </p>
                            <ul className="flex flex-col gap-4 md:gap-6">
                                {peos.map((item, index) => (
                                    <li key={item.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple/5 dark:hover:bg-white/5 transition-colors duration-200">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple/10 text-purple flex items-center justify-center font-bold text-sm mt-1">
                                            {index + 1}
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                            {item.content}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Outcomes Section */}
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-dark dark:text-light mb-10 md:mb-16 tracking-tight">
                            Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Outcomes</span>
                        </h2>
                        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                            {pos.map((item, index) => (
                                <div key={item.id} className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <span className="font-bold text-purple whitespace-nowrap">PO {index + 1}</span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Institutional Outcomes */}
                    {ios.length > 0 && (
                        <div className="mb-16 md:mb-24 mt-16 md:mt-24">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-dark dark:text-light mb-10 md:mb-16 tracking-tight">
                                Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Outcomes</span>
                            </h2>
                            <ul className="grid gap-4 md:grid-cols-2">
                                {ios.map((item, index) => (
                                    <li key={item.id} className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-sm">
                                        <div className="flex items-start space-x-3">
                                            <span className="font-bold text-purple whitespace-nowrap">IO {index + 1}</span>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">{item.content}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Outcomes Common to all HEIs */}
                    {heis.length > 0 && (
                        <div className="mb-16 md:mb-24">
                            <h2 className="text-2xl md:text-4xl font-extrabold text-center text-dark dark:text-light mb-8 md:mb-12 tracking-tight">
                                Outcomes Common to all HEIs
                            </h2>
                            <ul className="flex flex-col gap-4">
                                {heis.map((item, index) => (
                                    <li key={item.id} className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="flex items-start space-x-3">
                                            <span className="font-bold text-purple whitespace-nowrap">{index + 1}.</span>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">{item.content}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* PATHFIT */}
                    {pathfits.length > 0 && (
                        <div className="mb-16 md:mb-24">
                            <h2 className="text-2xl md:text-4xl font-extrabold text-center text-dark dark:text-light mb-8 md:mb-12 tracking-tight">
                                PATHFIT
                            </h2>
                            <ul className="flex flex-col gap-4">
                                {pathfits.map((item, index) => (
                                    <li key={item.id} className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="flex items-start space-x-3">
                                            <span className="font-bold text-purple whitespace-nowrap">{index + 1}.</span>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">{item.content}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* ADVOCACY AND ACTION */}
                    {advocacies.length > 0 && (
                        <div className="mb-16 md:mb-24">
                            <h2 className="text-2xl md:text-4xl font-extrabold text-center text-dark dark:text-light mb-8 md:mb-12 tracking-tight">
                                ADVOCACY AND ACTION
                            </h2>
                            <ul className="flex flex-col gap-4">
                                {advocacies.map((item, index) => (
                                    <li key={item.id} className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="flex items-start space-x-3">
                                            <span className="font-bold text-purple whitespace-nowrap">{index + 1}.</span>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">{item.content}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export const BSCSDescriptionProgram = ({ attributes }) => {
    // Filter attributes for BSCS
    const pos = attributes?.filter(attr => attr.program === 'BSCS' && attr.type === 'PO') || [];

    const careersList = [
        "Software Developer/Engineer",
        "Data Scientist",
        "Cybersecurity Analyst",
        "Systems Architect",
        "AI/ML Engineer",
        "Database Administrator/Analyst",
        "IT Consultant",
        "Artificial Intelligence and Machine Learning Specialist",
        "Cloud Solutions Architect",
        "Technical Writer"
    ];

    return (
        <>
            <CustomCursor />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Contact Section */}
                    <div className="mb-16 md:mb-20">
                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/20 shadow-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-light mb-6 md:mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 rounded-full bg-purple/10 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                                        <LocationIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Address</p>
                                        <p className="text-base md:text-lg text-dark dark:text-light font-medium">Arellano St, Dagupan City</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 rounded-full bg-purple/10 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                                        <MessageIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Email</p>
                                        <p className="text-base md:text-lg text-dark dark:text-light font-medium">udd_site@cdd.edu.ph</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 group">
                                    <div className="p-3 rounded-full bg-purple/10 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                                        <PhoneIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Phone</p>
                                        <p className="text-base md:text-lg text-dark dark:text-light font-medium">(075) 522 2405</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Program Description */}
                    <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-dark dark:text-light mb-6 md:mb-8 tracking-tight">
                            BSCS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Data Science</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            The Bachelor of Science in Computer Science specializing in Data Science is designed to equip students with a solid foundation in computer science principles while emphasizing data science techniques and applications. This program combines rigorous computer science theory with practical, hands-on experience in data analytics, machine learning, data visualization, and big data technologies.
                        </p>
                    </div>

                    {/* Outcomes Section */}
                    <div className="mb-16 md:mb-20">
                        <h3 className="text-2xl font-bold text-dark dark:text-light mb-6 md:mb-8 text-center">Program Outcomes</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {pos.map((item, index) => (
                                <div key={item.id} className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-colors duration-200">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-purple mt-1 font-bold whitespace-nowrap">PO {index + 1}</span>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career Opportunities */}
                    <div>
                        <h3 className="text-2xl font-bold text-dark dark:text-light mb-6 md:mb-8 text-center">Career Opportunities</h3>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {careersList.map((career, index) => (
                                <span
                                    key={index}
                                    className="px-5 md:px-6 py-2 md:py-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-purple/20 text-dark dark:text-light text-sm md:text-base font-medium shadow-sm hover:shadow-lg hover:bg-purple hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 cursor-default"
                                >
                                    {career}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
