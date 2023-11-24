import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import React, { Component } from "react";
export default function FacultyPage({ faculties = [] }) {
    return (
        <>
            {" "}
            <CustomCursor />
            <div className="dark:bg-dark w-full">
                <NavBar />
                <div className="text-dark dark:text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[211px] pb-[231px]">
                    Our Instructors
                </div>
                <section className="dark:bg-[#232323] bg-light pt-[140px]">
                    <div className="mx-auto max-w-5xl grid grid-cols-3 gap-8 pb-[130px]">
                        {faculties.map((faculty, index) => (
                            <div
                                key={index}
                                className="relative max-w-xs overflow-hidden  bg-cover bg-no-repeat"
                            >
                                <a
                                    href={route("faculties.show", {
                                        id: faculty.id,
                                    })}
                                >
                                    <div className="overflow-hidden w-[320px] h-[448.13px]">
                                        <img
                                            className="max-w-full object-scale-down mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[320px] h-[448.13px]"
                                            src={"/storage/" + faculty.image}
                                            alt=""
                                        />
                                    </div>
                                </a>
                                <div>
                                    <a
                                        href=""
                                        className="font-inter font-semibold text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                    >
                                        {faculty.name}
                                    </a>
                                    <h3 className="font-inter font-normal dark:text-light/75 text-dark leading-[26.4px]">
                                        {faculty.position}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
