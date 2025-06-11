import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import React from "react";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
function BSITWMAD() {
    return (
        <>
            <CustomCursor />
            <NavBar />
            <div className="dark:bg-dark w-full">
                {" "}
                <div className="text-dark dark:text-light text-center font-inter font-bold lg:text-[90px] text-[40px] leading-[108px] relative">
                    <div className="relative w-full lg:block hidden">
                        <img
                            className="w-full rounded-lg shadow-lg  object-cover object-center bg-auto"
                            src="/img/wma.png"
                        ></img>
                        {/* <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
                        <div class="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white font-bold text-[40px] lg:text-[60px] leading-tight drop-shadow-md">
                                Web and Mobile Application Development
                            </h1>
                        </div> */}
                    </div>
                </div>
            </div>
            <section className="dark:bg-[#232323] bg-light ">
                <div className="mx-auto w-full max-w-5xl grid grid-cols-1 pt-[60px]">
                    <div className="border dark:border-0 shadow-2xl dark:shadow-none dark:bg-dark bg-light  relative  ">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div>
                                    <h2 className="font-inter leading-[33.6px] font-semibold text-[28px] text-dark dark:text-light">
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
                                        <h2 className="font-light font-inter leading-[27px] text-dark/75 dark:text-light/75 text-[18px] ">
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
                                        <h2 className="font-light font-inter leading-[27px] text-dark/75 dark:text-light/75 text-[18px] ">
                                            udd_site@cdd.edu.ph
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <PhoneIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-dark/75 dark:text-light/75 text-[18px] ">
                                            (075) 522 2405
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl">
                    <p className="dark:text-light text-dark font-inter leading-[30px] text-[24px]">
                        The Web and Mobile Application Development
                        Specialization is designed to supplement courses that
                        the learner is already taking. This specialization will
                        equip learners with the technical skills and knowledge
                        to design, develop, and deploy innovative web and mobile
                        applications. Additionally, this will focus on modern
                        mobile and web programming languages, frameworks, and
                        tools for creating user-friendly, and responsive
                        applications. Graduates from this specialization will
                        have the knowledge and skills needed to address
                        real-world challenges in web and mobile technologies and
                        become competitive and innovative individuals in the
                        ever-changing digital landscape.
                    </p>
                    <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px] pt-[50px]">
                        Career Opportunities:
                    </h1>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Frontend Developer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Backend Developer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Full-Stack Developer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Mobile App Developer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                UI/UX Designer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Web Developer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Quality Assurance (QA) Tester
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Product Manager
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                App Store Optimization (ASO) Specialist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                DevOps Engineer
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BSITWMAD;
