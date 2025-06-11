import React, { Component } from "react";
import ButtonLink from "./ButtonLink";
import CustomCursor from "./CustomCursor";

export const Description = ({ name = "SITE", props }) => (
    <div className="dark:bg-dark w-full">
        {" "}
        <div className="text-dark dark:text-light text-center font-inter font-bold lg:text-[90px] text-[40px] leading-[108px] pt-[211px] pb-[231px]">
            {name} Specializations
        </div>
    </div>
);

export default function Academics() {
    return (
        <>
            <CustomCursor />
            <section className="dark:bg-[#232323] bg-light pt-[140px]">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl">
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="font-light text-gray-500 sm:text-lg dark:text-light/75 text-center sm:text-left"
                    >
                        <h3 className="font-inter lg:text-[14px] text-[#d399ee]  lg:mb-8 text-lg uppercase font-medium tracking-widest pb-[20px]">
                            Academics
                        </h3>
                        <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px]">
                            Program Description
                        </h1>
                    </div>
                    <div className="text-dark/75 dark:text-light/75 grid grid-cols-1 md:grid-cols-2 content-center place-items-center">
                        <div className="flex items-center relative max-w-full overflow-hidden h-[270px] w-[470px] bg-cover bg-no-repeat lg:order-1 sm:order-2">
                            <img
                                className="object-fill bg-no-repeat bg-cover bg-center object-center aspect-square h-[270px] w-[470px] transition duration-300 ease-in-out hover:scale-110"
                                src="/img/pic4.jpg"
                                alt="office content 1"
                            />
                        </div>

                        <div
                            className="flex items-center p-4 md:p-8 aos-disabled aos-init aos-animate"
                            data-aos="fade-up"
                            data-aos-duration="600"
                        >
                            <div className="mt-4 md:mt-0">
                                <h2 className=" text-purple text-[22px] font-inter font-semibold pb-[23px]">
                                    BSIT
                                </h2>
                                <p className="mb-[33px] text-[18px]">
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
                                <p className="mb-[33px] text-[18px]">
                                    The curriculum for BSIT includes the
                                    required GE courses, six (6) core courses
                                    common to all ITE programs, professional
                                    courses required for the BSIT program, and
                                    electives. The students are also required to
                                    undertake practicum work and complete a
                                    capstone project. Moreover, it is composed
                                    of three (3) Specializations.
                                </p>
                                <a
                                    href="/Program?program=BSIT"
                                    className="href"
                                >
                                    {" "}
                                    <ButtonLink />
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="h-px my-8 bg-light border-0 dark:bg-light/75" />
                    <div className="text-dark/75 dark:text-light/75 grid grid-cols-1 md:grid-cols-2 content-center place-items-center">
                        <div className="flex items-center relative max-w-full overflow-hidden h-[270px] w-[470px]  bg-center bg-cover bg-no-repeat lg:order-1 sm:order-2">
                            <img
                                className="object-fill bg-no-repeat bg-cover object-center aspect-square h-[270px] w-[470px] transition duration-300 ease-in-out hover:scale-110 "
                                src="/img/pic5.jpg"
                                alt="office content 1"
                            />
                        </div>

                        <div
                            className="flex items-center p-4 md:p-8 aos-disabled aos-init aos-animate"
                            data-aos="fade-up"
                            data-aos-duration="600"
                        >
                            <div className="mt-4 md:mt-0">
                                <h2 className=" text-purple text-[22px] font-inter font-semibold pb-[23px]">
                                    BSCS
                                </h2>
                                <p className="mb-[33px] text-[18px]">
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
                                    finance, and technology. <br />
                                    <br />
                                </p>
                                <a
                                    href="/Program?program=BSCS"
                                    className="href"
                                >
                                    <ButtonLink />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px] pt-[50px]">
                        Program Outcomes
                    </h1>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Apply knowledge of computing, science, and
                                mathematics appropriate to the discipline
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Understand best practices and standards and
                                their applications
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Analyze complex problem and identify and define
                                the computing requirements appropriate to its
                                solution.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Identify an analyze user needs and take them
                                into account in the selection, creation,
                                evaluation and administration of computer-based
                                systems.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Design, implement, and evaluate computer-based
                                systems, processes, components, or programs to
                                meet desired needs and requirement under various
                                constraints
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Integrate IT-based solutions into the user
                                environment effectively
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Apply knowledge through the use of current
                                techniques, skills, tools and practices
                                necessary for the IT profession
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Function effectively as a member or leader of a
                                development team recognizing the different roles
                                within a team to accomplish a common goal
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Assist in the creation of an effective IT
                                project plan
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Communicate effectively with the computer
                                community and with society at large about
                                complex computing activities through logical
                                writing, presentations, and clear instructions
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Analyze the local and global impact of computing
                                information technology on individuals,
                                organizations, and society
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Understand professional, ethical, legal,
                                security and social issues and responsibilities
                                in the utilization of information technology
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Recognize the need for and engage in planning
                                self-learning and improving performance as a
                                foundation for continuing professional
                                development
                            </li>
                        </ul>
                    </div> */}
                </div>
            </section>
        </>
    );
}
