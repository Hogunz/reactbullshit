import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";
import { Head } from "@inertiajs/react";

export default function Faculty({ faculties }) {
    const facultyName = faculties?.user?.name || (Array.isArray(faculties) && faculties[0]?.user?.name) || "Faculty Profile";

    return (
        <>
            <Head title={`${facultyName} | SITE Faculty`} />
            <NavBar />
            <InstructorDescription faculties={faculties} />
        </>
    );
}
