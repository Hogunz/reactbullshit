import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";

const Faculty = ({ instructor }) => {
    return (
        <>
            <NavBar />
            <InstructorDescription id={instructor} />
        </>
    );
};

export default Faculty;
