import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import React from "react";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
function BSITNICS() {
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
                            src="/img/nic.png"
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
            <section className="dark:bg-[#232323] bg-light  ">
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
                    <p className="dark:text-light text-dark font-inter leading-[30px] lg:text-[24px] text-[18px] text-justify lg:text-left">
                        The Network Infrastructure with Cybersecurity
                        Specialization is designed to create a strong foundation
                        in designing, deploying, and managing secure and
                        efficient network infrastructure. Leaners will gain
                        knowledge in networking concepts, systems
                        administration, and cybersecurity practices to ensure
                        the protection of digital assets and organizational
                        systems. This will allow graduates to be prepared to
                        address modern network challenges and cybersecurity
                        threats.
                    </p>
                    <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px] pt-[50px]">
                        Career Opportunities:
                    </h1>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Administrator
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cybersecurity Analyst
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Security Engineer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                IT Infrastructure Manager
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Ethical Hacker
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cloud Security Specialist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Network Architect
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Cybersecurity Consultant
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BSITNICS;
