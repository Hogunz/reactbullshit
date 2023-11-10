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
        <>
            <div className="dark:bg-dark">
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[100px] pb-[90px]">
                    {instructor.name}
                </div>
            </div>
        </>
    );
};

export default InstructorDescription;
