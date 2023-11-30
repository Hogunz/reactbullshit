import React from "react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "./svg/SVGicon";
import CustomCursor from "./CustomCursor";
export default function InstructorDescription({ faculties = [] }) {
    return (
        <>
            <CustomCursor />
            <div className="dark:bg-dark">
                <div className="dark:text-light text-dark text-center font-inter font-bold text-[40px] lg:text-[90px] leading-[108px] pt-[100px] pb-[90px]">
                    {faculties.name}
                </div>
            </div>
            <div className="bg-gradient-to-br from-purple from-5% via-[#232323] via-30% to-dark">
                <div class="mx-auto max-w-6xl grid grid-cols-2 justify-items-center pt-[130px]">
                    <div className="bg-dark shadow-2xl max-w-xl sticky inset-x-0 top-14 bottom-0 max-h-full lg:p-0 w-[386.09px] h-[495.8px] flex justify-center items-center">
                        <div className="flex flex-col overflow-hidden">
                            <div className="pt-[20px]  bg-center flex justify-center">
                                <img
                                    className="max-w-xs object-scale-down w-[346.09px] h-[300px] object-center"
                                    src={"/storage/" + faculties.image}
                                    alt=""
                                />
                            </div>
                            <div className="font-inter font-semibold text-[24px] leading-[28.8px] text-center text-[#d399ee] pt-[30px]">
                                {faculties.name}
                            </div>
                            <div className="flex justify-evenly space-x-4 p-8 ">
                                <div className="flex justify-center place-items-center border-dashed border-2 border-purple bg-purple/5 p-[5px] w-[50px] h-[50px]">
                                    <FacebookIcon />
                                </div>
                                <div className="flex justify-center place-items-center border-dashed border-2 border-purple bg-purple/5 p-[5px] w-[50px] h-[50px]">
                                    <TwitterIcon />
                                </div>
                                <div className="flex justify-center place-items-center border-dashed border-2 border-purple bg-purple/5 p-[5px] w-[50px] h-[50px]">
                                    <InstagramIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="max-w-3xl font-inter dark:font-light dark:text-light text-[18px] leading-[27px] w-full"
                        dangerouslySetInnerHTML={{
                            __html: faculties.content,
                        }}
                    />
                </div>
            </div>
        </>
    );
}
