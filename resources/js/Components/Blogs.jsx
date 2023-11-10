import React from "react";
import ButtonLink from "./buttons/ButtonLink";
const avatar =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const title = " Community Service";
const description = "";

const Blogs = () => {
    return (
        <>
            <div className="bg-[#232323] pt-[90px]">
                <h3 className="font-inter text-center text-[14px] text-[#d399ee] uppercase font-medium tracking-widest mb-4">
                    Blog / News
                </h3>
                <h1 className="text-light text-3xl text-center font-inter font-semibold pb-[50px]">
                    Latest News
                </h1>

                <div class="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-8 pb-[130px]">
                    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                        <img
                            className=" max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[370px] h-[280px]"
                            src={avatar}
                            alt=""
                        />
                        <div>
                            <a
                                href=""
                                className="font-inter font-semibold text-[22px] text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                            >
                                {title}
                            </a>
                            <p className="font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4">
                                Embrace your emotions and self-expression by
                                joining us at the show, in the studio, or on
                                your screen.
                            </p>
                            <div className="flex justify-between">
                                <div>
                                    {" "}
                                    <ButtonLink />{" "}
                                </div>
                                <div className="place-self-center">
                                    <p className="font-[18px] leading-[27px] font-inter dark:text-white ">
                                        October 8, 2023
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                        <img
                            className=" max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[370px] h-[280px]"
                            src={avatar}
                            alt=""
                        />
                        <div>
                            <a
                                href=""
                                className="font-inter font-semibold text-[22px] text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                            >
                                {title}
                            </a>
                            <p className="font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4">
                                Embrace your emotions and self-expression by
                                joining us at the show, in the studio, or on
                                your screen.
                            </p>
                            <div className="flex justify-between">
                                <div>
                                    {" "}
                                    <ButtonLink />{" "}
                                </div>
                                <div className="place-self-center">
                                    <p className="font-[18px] leading-[27px] font-inter dark:text-white ">
                                        October 8, 2023
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                        <img
                            className=" max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[370px] h-[280px]"
                            src={avatar}
                            alt=""
                        />
                        <div>
                            <a
                                href=""
                                className="font-inter font-semibold text-[22px] text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                            >
                                {title}
                            </a>
                            <p className="font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4">
                                Embrace your emotions and self-expression by
                                joining us at the show, in the studio, or on
                                your screen.
                            </p>
                            <div className="flex justify-between">
                                <div>
                                    {" "}
                                    <ButtonLink />{" "}
                                </div>
                                <div className="place-self-center">
                                    <p className="font-[18px] leading-[27px] font-inter dark:text-white ">
                                        October 8, 2023
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blogs;
