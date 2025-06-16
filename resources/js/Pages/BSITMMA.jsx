import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import { LocationIcon, MessageIcon, PhoneIcon } from "@/Components/svg/SVGicon";
import React from "react";

function BSITMMA() {
    return (
        <>
            <CustomCursor />
            <NavBar />
            <div className="dark:bg-dark w-full">
                {" "}
                {/* <div className="text-dark dark:text-light text-center font-inter font-bold lg:text-[90px] text-[40px] leading-[108px] relative">
                    <div className="relative w-full lg:block hidden">
                        <video
                            className="w-full rounded-lg shadow-lg h-[75vh] object-cover object-center "
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="path-to-thumbnail.jpg"
                        >
                            <source
                                src="https://videos.pexels.com/video-files/5091624/5091624-hd_1920_1080_24fps.mp4"
                                type="video/mp4"
                            />{" "}
                            https://www.pexels.com/video/animated-abstract-burning-effect-5091624/
                        </video>
                        <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
                        <div class="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-white font-bold text-[40px] lg:text-[60px] leading-tight drop-shadow-md">
                                Multimedia Arts and Animation
                            </h1>
                        </div>
                    </div>
                </div> */}
                <div className="relative w-full lg:block hidden">
                    <img
                        className="w-full rounded-lg shadow-lg  object-cover object-center bg-auto"
                        src="/img/mma.png"
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
                    <p className="dark:text-light text-dark font-inter leading-[30px] lg:text-[24px] text-[18px] text-justify lg:text-left">
                        The Multimedia Arts and Animation Specialization is
                        designed to blend Information Technology with creative
                        design that focuses on the creation of interactive and
                        visually compelling digital content. Learners gain
                        skills in graphic design, 2D and 3D Animation, video
                        editing, and interactive multimedia. Graduates will be
                        able to have careers in animation and multimedia
                        production combining technical knowledge with artistic
                        innovation.
                    </p>
                    <h1 className="text-dark dark:text-light text-3xl font-inter font-semibold pb-[50px] pt-[50px]">
                        Career Opportunities:
                    </h1>
                    <div>
                        <ul className="list-disc list-inside">
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Animator
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Graphic Designer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Game Designer/Artist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                3D Modeler
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Visual Effects (VFX) Artist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Storyboard Artist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Web Designer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Motion Graphics Designer
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Illustrator/Concept Artist
                            </li>
                            <li className=" marker:text-purple font-inter font-normal text-[18px] leading-[27px] dark:text-light text-black/75 pt-[20.6px] lg:text-left text-justify lg:p-0 p-4">
                                Video Editor
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BSITMMA;
