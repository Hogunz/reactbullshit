import React from "react";
import { motion } from "framer-motion";
import {
    LocationIcon,
    PhoneIcon,
    MessageIcon,
    FinderIcon,
} from "./svg/SVGicon";
export const BSITDescriptionProgram = () => {
    return (
        <>
            <div className=" bg-gradient-to-br from-purple from-5% via-[#2B2B2B] via-25% to-[#232323] ">
                <div className="mx-auto w-full max-w-5xl grid grid-cols-1 pt-[130px]">
                    <div className="border-0 dark:bg-dark relative  ">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div>
                                    <h2 className="font-inter leading-[33.6px] font-semibold text-[28px] text-light">
                                        Our Contacts
                                    </h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 p-8">
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

                <div class="mx-auto max-w-5xl gap-8 pb-[130px] pt-[63px]">
                    <p className="text-light font-extralight font-inter leading-[27px] text-[18px]">
                        Bachelor of Science in Information Technology (BSIT) is
                        a 4-year program that equips graduates with
                        comprehensive knowledge and skills in the realm of
                        information technology. The curriculum encompasses a
                        thorough understanding of computing concepts,
                        foundational theories, and the latest advancements in
                        the field of information technology.
                    </p>
                    <br />
                    <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px]">
                        Program Outcomes:
                    </p>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Develop and implement software applications
                                using various programming languages and tools.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Design and develop websites and web applications
                                using front-end and back-end technologies.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Analyze complex business problems and design
                                effective solutions using information
                                technology.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Use database management systems to store,
                                organize, and retrieve data efficiently.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Configure and manage computer networks and
                                network security protocols.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Understand and apply principles of data
                                structures and algorithms to solve problems in
                                computer science.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Collaborate with other professionals to develop
                                and manage technology projects.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Analyze data and apply statistical and
                                mathematical models to derive insights and
                                inform decision-making.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Develop and implement mobile applications for
                                various platforms and devices.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Communicate technical information clearly and
                                effectively to both technical and non-technical
                                audiences.
                            </li>
                        </ul>
                    </div>
                    <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px]">
                        Career Opportunities:
                    </p>
                    <div>
                        <ul className="list-disc list-inside ">
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Software Developer/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Web Developer/Designer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Database Administrator/Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Network Administrator/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Cybersecurity Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                IT Project Manager
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                IT Consultant
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Data Scientist
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Systems Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Mobile Application Developer
                            </li>
                        </ul>
                    </div>
                </div>
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
                            <div className="grid grid-cols-3 gap-4 p-8">
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
                        BS Computer Science is a 4-year course that produces
                        graduates with the computing concepts and theories,
                        algorithmic foundations and new developments in
                        computing. The program prepares students to design and
                        create algorithmically complex software and develop new
                        and effective algorithms for solving computing problems.
                    </p>
                    <br />
                    <br />
                    <p className="dark:text-light font-extralight font-inter leading-[27px] text-[18px]">
                        The program also includes the study of the standards and
                        practices in Software Engineering. It prepares students
                        to acquire skills and disciplines required for
                        designing, writing and modifying software components,
                        modules and applications that comprise software
                        solutions.
                    </p>
                    <br />
                    <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px]">
                        Program Outcomes:
                    </p>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Articulate the computing theories, principles
                                and knowledge domain to address real-world
                                problems.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Conduct research and determine the latest
                                developments in the specific field of practice.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Work effectively with teams and communicate
                                orally and in writing.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Understand computing problems, define the
                                requirements to design an appropriate solution.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Develop computing solutions utilizing modern
                                computing tools.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Demonstrate professional, social and ethical
                                responsibility.
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Engage in independent learning for continual
                                development as a computing professional.
                            </li>
                        </ul>
                    </div>
                    <p className="font-inter font-semibold text-[28px] leading-[33.6px] text-light pt-[27px]">
                        Career Opportunities:
                    </p>
                    <div>
                        <ul className="list-disc list-inside ">
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Software Developer/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Data Scientist
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Computer Systems Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Web Developer/Designer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Cybersecurity Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Database Administrator/Analyst
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Network Administrator/Engineer
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Artificial Intelligence and Machine Learning
                                Specialist
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                IT Project Manager
                            </li>
                            <li className="marker:text-purple font-inter font-normal text-[18px] leading-[27px] text-light pt-[20.6px]">
                                Technical Writer
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
