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
const InstructorDescription = ({ id }) => {
    const instructor = instructorsData.filter((i) => i.id == id)[0];

    return (
        <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
            <a
                href={"/Instructors?instructor=" + instructor.id}
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
    );
};

export default InstructorDescription;
