import { NavBar } from "@/Components/NavBar";
import React from "react";

const VMO = () => {
    return (
        <>
            <NavBar />
            <div className="dark:bg-dark w-full">
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[211px] pb-[231px]">
                    VMO
                </div>
                <div className=" mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-3 gap-8 pb-[130px]">
                    <div className="p-4 dark:bg-[#232323] shadow-2xl">
                        <h1 className="font-inter font-bold leading-normal tracking-widest text-[40px] dark:text-purple ">
                            Vision
                        </h1>
                        <p className="font-inter font-thin text-[22px] leading-[30px] dark:text-light">
                            To build a community of technology innovators
                            responsive to the challenges of the computing world.
                        </p>
                    </div>
                    <div className="p-4 dark:bg-[#232323] shadow-2xl">
                        <h1 className="font-inter font-bold leading-normal tracking-widest text-[40px] dark:text-purple ">
                            Mission
                        </h1>
                        <p className="font-inter font-thin text-[22px] leading-[30px] dark:text-light">
                            To prepare computer professionals with the best that
                            computing science education can offer adaptive to
                            the global environment.
                        </p>
                    </div>
                    <div className="p-4 dark:bg-[#232323] shadow-2xl">
                        <h1 className="font-inter font-bold leading-normal tracking-widest text-[40px] dark:text-purple ">
                            Core Values
                        </h1>
                        <p className="font-inter font-thin text-[22px] leading-[30px] dark:text-light">
                            Competence. Unity. Dynamic. Dedicated. Integrity.
                            Trustworthy
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VMO;