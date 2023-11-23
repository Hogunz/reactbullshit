import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";

export default function Faculty({ faculties }) {
    return (
        <>
            <NavBar />
            <InstructorDescription faculties={faculties} />
        </>
    );
}
