import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";

const Faculty = ({ faculties }) => {
    return (
        <>
            <NavBar />
            <InstructorDescription faculties={faculties} />
        </>
    );
};

export default Faculty;
