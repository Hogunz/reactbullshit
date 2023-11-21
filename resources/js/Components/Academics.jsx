import React, { Component } from "react";
import ButtonLink from "./ButtonLink";

export const Description = ({ name = "SITE", props }) => (
    <div className="dark:bg-dark w-full">
        {" "}
        <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[211px] pb-[231px]">
            {name} Program Description
        </div>
    </div>
);

export default function Academics() {
    return (
        <>
            <section className="bg-[#232323] pt-[140px]">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl">
                    <h3 className="font-inter text-[14px] text-[#d399ee] uppercase font-medium tracking-widest pb-[20px]">
                        Academics
                    </h3>
                    <h1 className="text-light text-3xl font-inter font-semibold pb-[50px]">
                        Program Description
                    </h1>
                    <div className="grid grid-cols-2 gap 2 dark:text-light/75">
                        <div>
                            <h2 className=" text-purple text-[22px] font-inter font-semibold pb-[23px]">
                                BSIT
                            </h2>
                            <p className="mb-[33px] text-[18px]">
                                Bachelor of Science in Information Technology
                                (BSIT) is a 4-year program that equips graduates
                                with comprehensive knowledge and skills in the
                                realm of information technology. The curriculum
                                encompasses a thorough understanding of
                                computing concepts, foundational theories, and
                                the latest advancements in the field of
                                information technology.
                            </p>
                            <a href="/Program?program=BSIT" className="href">
                                {" "}
                                <ButtonLink />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 gap-6 justify-items-end items-center pb-[74px] overflow-hidden">
                            <img
                                className="object-fill bg-no-repeat bg-cover bg-center object-center aspect-square h-[270px] w-[470px] transition duration-300 ease-in-out hover:scale-110"
                                src="/img/pic4.jpg"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </div>

                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl border-t pt-[73px]">
                    <div className="grid grid-cols-2 gap 2 dark:text-light/75">
                        <div>
                            <h2 className=" text-purple text-[22px] font-inter font-semibold pb-[23px]">
                                BSCS
                            </h2>
                            <p className="mb-[33px] text-[18px]">
                                BS Computer Science is a 4-year course that
                                produces graduates with the computing concepts
                                and theories, algorithmic foundations and new
                                developments in computing. The program prepares
                                students to design and create algorithmically
                                complex software and develop new and effective
                                algorithms for solving computing problems.{" "}
                                <br />
                                <br />
                                The program also includes the study of the
                                standards and practices in Software Engineering.
                                It prepares students to acquire skills and
                                disciplines required for designing, writing and
                                modifying software components, modules and
                                applications that comprise software solutions.
                            </p>
                            <a href="/Program?program=BSCS" className="href">
                                <ButtonLink />
                            </a>
                        </div>
                        <div className="grid grid-cols-1 gap-6 justify-items-end items-center overflow-hidden ">
                            <img
                                className="object-fill bg-no-repeat bg-cover bg-center object-center aspect-square h-[270px] w-[470px]  transition duration-300 ease-in-out hover:scale-110 "
                                src="/img/pic5.jpg"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
