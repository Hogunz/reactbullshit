import { NavBar } from "@/Components/NavBar";
import React, { Component } from "react";
import { instructorsData } from "@/Components/Instructors";
export default function FacultyPage() {
    return (
        <>
            {" "}
            <div className="dark:bg-dark w-full">
                <NavBar />
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[211px] pb-[231px]">
                    Our Instructors
                </div>
                <section class="bg-[#232323] pt-[140px]">
                    <div class="mx-auto max-w-5xl grid grid-cols-3 gap-8 pb-[130px]">
                        {instructorsData.map((instructor, index) => (
                            <div
                                key={index}
                                className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                            >
                                <a
                                    href={
                                        "/Instructors?instructor=" +
                                        instructor.id
                                    }
                                    className="href"
                                >
                                    <img
                                        className="max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110"
                                        src={instructor.avatar}
                                        alt=""
                                    />
                                </a>
                                <div className="space-y-2">
                                    <a
                                        href=""
                                        className="font-inter font-semibold text-[#a352cc] leading-[26.4px] text-[22px] hover:text-light transition duration-300 ease-in-out"
                                    >
                                        {instructor.name}
                                    </a>
                                    <h3 className="font-inter font-normal text-light/75 leading-[26.4px] text-[18px]">
                                        {instructor.position}
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
