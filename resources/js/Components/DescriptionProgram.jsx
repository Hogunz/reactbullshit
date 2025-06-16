import React from "react";
import { motion } from "framer-motion";
import {
    LocationIcon,
    PhoneIcon,
    MessageIcon,
    FinderIcon,
} from "./svg/SVGicon";
import CustomCursor from "./CustomCursor";
export const BSITDescriptionProgram = () => {
    return (
        <>
            <CustomCursor />
            <div className=" bg-gradient-to-br from-purple from-5% via-[#2B2B2B] via-25% to-[#232323] ">
                {/* <div className="mx-auto w-full max-w-5xl grid grid-cols-1 pt-[130px]">
                    <div className="border-0 dark:bg-dark relative  ">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div>
                                    <h2 className="font-inter leading-[33.6px] font-semibold text-[28px] text-light">
                                        Our Contacts
                                    </h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-8">
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <LocationIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            Arellano St, Dagupan City,
                                            Philippines
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <MessageIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            udd_site@cdd.edu.ph
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <PhoneIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            (075) 522 2405
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div class="mx-auto max-w-5xl gap-8 pb-[130px] pt-[63px]">
                    <div class="flex items-center justify-center">
                        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                <div class="max-w-full p-8 lg:p-0">
                                    <img
                                        class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                                        src="img/1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                <div class="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                    <h1 class=" text-2xl font-bold text-white mb-3">
                                        Multimedia Arts and Animation
                                    </h1>
                                    <a href="/academics/bsit/MMA">
                                        <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 hover:bg-neutral-600 transition duration-300 ease-in-out">
                                            See More
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                <div class="max-w-full p-8 lg:p-0">
                                    <img
                                        class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                                        src="img/2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                <div class="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                    <h1 class=" text-2xl font-bold text-white mb-3">
                                        Web and Mobile Application Development
                                    </h1>
                                    <a href="/academics/bsit/WMAD">
                                        <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 hover:bg-neutral-600 transition duration-300 ease-in-out">
                                            See More
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                <div class="max-w-full p-8 lg:p-0">
                                    <img
                                        class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                                        src="img/3.jpg"
                                        alt=""
                                    />
                                </div>
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                <div class="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                    <h1 class=" text-2xl font-bold text-white mb-3">
                                        Network Infrastructure with
                                        Cybersecurity
                                    </h1>
                                    <a href="/academics/bsit/NICS">
                                        <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60 hover:bg-neutral-600 transition duration-300 ease-in-out">
                                            See More
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px]">
                        Career Opportunities:
                    </p>
                    <div>
                        <ul className="list-disc list-inside ">
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Software Developer/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Web Developer/Designer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Database Administrator/Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Administrator/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cybersecurity Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                IT Project Manager
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                IT Consultant
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Data Scientist
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Systems Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Mobile Application Developer
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
            <div className="dark:bg-dark w-full">
                <div className="text-dark dark:text-light text-center font-inter font-bold text-[35px] lg:text-[90px] leading-[108px] pt-[211px] pb-[231px]">
                    Program Education Objectives (PEO)
                </div>
                <section className="dark:bg-[#232323] bg-light ">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl">
                        <p className=" mb-8 dark:text-light text-dark font-inter leading-[30px] text-[24px]">
                            The Educational Objectives of the Bachelor of
                            Science in Information Technology of Universidad de
                            Dagupan are to produce graduates who, during the
                            first few years after graduation, are:
                        </p>
                        <div>
                            <ul className="list-disc list-inside">
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    capable of solving complex computational
                                    problems using appropiate models,
                                    techniques, and abstractions;
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    able to communicate effectively and work
                                    effeciently in a team environment;
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    capable of measuring the impact of computing
                                    in society and are able to conduct
                                    themselves in an ethical and professional
                                    manner; and,
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    successful in their professional work or
                                    graduate studies and are open to life-long
                                    learning.
                                </li>
                            </ul>
                        </div>
                        <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px] pt-[50px]">
                            Program Outcomes
                        </h1>
                        <div>
                            <ul className="list-disc list-inside">
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to apply knowledge of computing
                                    and mathematics appropriate to the
                                    discipline.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to analyze a problem, and
                                    identify and define the computing
                                    requirements appropriate to its solution.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to design, implement, and
                                    evaluate a computer-based system, process,
                                    component, or program to meet desired needs.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to function effectively on teams
                                    to accomplish a common goal.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An understanding of professional, ethical,
                                    legal, security and social issues and
                                    responsibilities.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to communicate effectively with a
                                    range of audiences.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to analyze the local and global
                                    impact of computing on individuals,
                                    organizations, and society.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    Recognition of the need for and an ability
                                    to engage in continuing professional
                                    development.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to use current techniques,
                                    skills, and tools necessary for computing
                                    practice.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to use and apply current
                                    technical concepts and practices in the core
                                    information technologies.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to identify and analyze user
                                    needs and take them into account in the
                                    selection, creation, evaluation, and
                                    administration of computer-based systems.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to effectively integrate IT-based
                                    solutions into the user environment.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An understanding of best practices and
                                    standards and their application.
                                </li>
                                <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                    An ability to assist in the creation of an
                                    effective project plan.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export const BSCSDescriptionProgram = () => {
    return (
        <>
            <div className=" bg-gradient-to-br from-purple from-5% via-[#2B2B2B] via-25% to-[#232323] ">
                <div class="mx-auto w-full max-w-5xl grid grid-cols-1 pt-[130px]">
                    <div className="border-0 dark:bg-dark relative  ">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div>
                                    <h2 className="font-inter leading-[33.6px] font-semibold text-[28px] text-light">
                                        Our Contacts
                                    </h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-8">
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <LocationIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            Arellano St, Dagupan City,
                                            Philippines
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <MessageIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            udd_site@cdd.edu.ph
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <PhoneIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            (075) 522 2405
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-5xl gap-8 pb-[130px] pt-[130px]">
                    <p className="text-light font-extralight font-inter leading-[27px] text-[18px]">
                        The Bachelor of Science in Computer Science specializing
                        in Data Science is designed to equip students with a
                        solid foundation in computer science principles while
                        emphasizing data science techniques and applications.
                        This program combines rigorous computer science theory
                        with practical, hands-on experience in data analytics,
                        machine learning, data visualization, and big data
                        technologies. Students learn to extract meaningful
                        insights from vast amounts of data and apply these
                        insights to solve real-world problems across various
                        domains, including business, healthcare, finance, and
                        technology.
                    </p>
                    <br />
                    <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px]">
                        Program Outcomes:
                    </p>

                    <div className="pt-10 ">
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Apply knowledge of computing, science, and
                                mathematics appropriate to the discipline
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Understand best practices and standards and
                                their applications
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Analyze complex problem and identify and define
                                the computing requirements appropriate to its
                                solution.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Identify an analyze user needs and take them
                                into account in the selection, creation,
                                evaluation and administration of computer-based
                                systems.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Design, implement, and evaluate computer-based
                                systems, processes, components, or programs to
                                meet desired needs and requirement under various
                                constraints
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Integrate IT-based solutions into the user
                                environment effectively
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Apply knowledge through the use of current
                                techniques, skills, tools and practices
                                necessary for the IT profession
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Function effectively as a member or leader of a
                                development team recognizing the different roles
                                within a team to accomplish a common goal
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Assist in the creation of an effective IT
                                project plan
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Communicate effectively with the computer
                                community and with society at large about
                                complex computing activities through logical
                                writing, presentations, and clear instructions
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Analyze the local and global impact of computing
                                information technology on individuals,
                                organizations, and society
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Understand professional, ethical, legal,
                                security and social issues and responsibilities
                                in the utilization of information technology
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Recognize the need for and engage in planning
                                self-learning and improving performance as a
                                foundation for continuing professional
                                development
                            </li>
                        </ul>
                    </div>
                    <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px] mb-4">
                        Career Opportunities:
                    </p>
                    <div>
                        <ul className="list-disc list-inside ">
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Software Developer/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Data Scientist
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cybersecurity Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Systems Architect
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                AI/ML Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Database Administrator/Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                IT Consultant
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Artificial Intelligence and Machine Learning
                                Specialist
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cloud Solutions Architect
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Technical Writer
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
