import React from "react";
import { instructorsData } from "./Instructors";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "./svg/SVGicon";
const InstructorDescription = ({ id }) => {
    const instructor = instructorsData.filter((i) => i.id == id)[0];

    return (
        <>
            <div className="dark:bg-dark">
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[100px] pb-[90px]">
                    {instructor.name}
                </div>
            </div>
            <div className="bg-gradient-to-br from-purple from-5% via-[#232323] via-30% to-dark">
                <div class="mx-auto max-w-6xl grid grid-cols-2 justify-items-center pt-[130px]">
                    <div className="bg-dark shadow-2xl max-w-xl sticky inset-x-0 top-14 bottom-0 max-h-full lg:p-0 w-[386.09px] h-[495.8px] flex justify-center items-center">
                        <div className="flex flex-col">
                            <div className="pt-[20px]">
                                <img
                                    className="max-w-xs object-scale-down w-[346.09px] h-[300px]"
                                    src={instructor.avatar}
                                    alt=""
                                />
                            </div>
                            <div className="font-inter font-semibold text-[24px] leading-[28.8px] text-center text-[#d399ee] pt-[30px]">
                                {instructor.name}
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
                    <div className="max-w-3xl">
                        {instructor.description}
                        <div></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstructorDescription;
