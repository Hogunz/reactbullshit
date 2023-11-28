import React, { Component } from "react";
import ButtonLink from "./ButtonLink";
import CustomCursor from "./CustomCursor";

export const Description = ({ name = "SITE", props }) => (
    <div className="dark:bg-dark w-full">
        {" "}
        <div className="text-dark dark:text-light text-center font-inter font-bold lg:text-[90px] text-[40px] leading-[108px] pt-[211px] pb-[231px]">
            {name} Program Description
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
                                    Bachelor of Science in Information
                                    Technology (BSIT) is a 4-year program that
                                    equips graduates with comprehensive
                                    knowledge and skills in the realm of
                                    information technology. The curriculum
                                    encompasses a thorough understanding of
                                    computing concepts, foundational theories,
                                    and the latest advancements in the field of
                                    information technology.
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
                                    BS Computer Science is a 4-year course that
                                    produces graduates with the computing
                                    concepts and theories, algorithmic
                                    foundations and new developments in
                                    computing. The program prepares students to
                                    design and create algorithmically complex
                                    software and develop new and effective
                                    algorithms for solving computing problems.{" "}
                                    <br />
                                    <br />
                                    The program also includes the study of the
                                    standards and practices in Software
                                    Engineering. It prepares students to acquire
                                    skills and disciplines required for
                                    designing, writing and modifying software
                                    components, modules and applications that
                                    comprise software solutions.
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
                </div>
            </section>
        </>
    );
}
