import React from "react";

export default function Instructors({ faculties = [] }) {
    return (
        <>
            <div className="dark:bg-gradient-to-b from-purple via-[#2B2B2B] via-30% to-dark pt-[90px]">
                <div data-aos="fade-up" data-aos-duration="800">
                    <h3 className="font-inter text-center text-[14px] text-[#d399ee] uppercase font-medium tracking-widest mb-4">
                        FACULTY
                    </h3>
                    <h1 className="dark:text-light text-dark/75 text-3xl text-center font-inter font-semibold pb-[50px]">
                        Our Instructors
                    </h1>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-duration="600"
                    className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-4 justify-items-center justify-self-center  gap-8 pb-[130px]"
                >
                    {faculties.map((faculty, index) => (
                        <div
                            key={index}
                            className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                        >
                            <a
                                href={route("faculties.show", {
                                    id: faculty.id,
                                })}
                            >
                                <div className="overflow-hidden w-[232px] h-[324.89px] bg-center">
                                    <img
                                        className="h-auto max-w-full mb-[27px] w-[232px] object-cover object object-center transition duration-300 ease-in-out hover:scale-110"
                                        src={"/storage/" + faculty.image}
                                        alt=""
                                    />
                                </div>
                            </a>
                            <div>
                                <a
                                    href=""
                                    className="text-xs sm:text-lg  font-inter font-semibold text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                >
                                    {faculty.name}
                                </a>
                                <h3 className="text-xs sm:text-base font-inter font-normal dark:text-light/75 text-dark leading-[26.4px]">
                                    {faculty.position}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
