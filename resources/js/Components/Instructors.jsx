import React from "react";

const instructorsData = [
    {
        id: 1,
        name: "abcd",
        position: "faculty",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        name: "CJ Dela Cruz",
        position: "Faculty",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more instructor data as needed
];

const Instructors = () => {
    return (
        <>
            <div className="bg-gradient-to-b from-purple via-[#2B2B2B] via-30% to-dark pt-[90px]">
                <h3 className="font-inter text-center text-[14px] text-[#d399ee] uppercase font-medium tracking-widest mb-4">
                    FACULTY
                </h3>
                <h1 className="text-light text-3xl text-center font-inter font-semibold pb-[50px]">
                    Our Instructors
                </h1>

                <div class="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8 pb-[130px]">
                    {instructorsData.map((instructor, index) => (
                        <div
                            key={index}
                            className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                        >
                            <a
                                href={
                                    "/Instructors?instructor=" + instructor.id
                                }
                                className="href"
                            >
                                <img
                                    className="max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110"
                                    src={instructor.avatar}
                                    alt=""
                                />
                            </a>
                            <div>
                                <a
                                    href=""
                                    className="font-inter font-semibold text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                >
                                    {instructor.name}
                                </a>
                                <h3 className="font-inter font-normal text-light/75 leading-[26.4px]">
                                    {instructor.position}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Instructors;
