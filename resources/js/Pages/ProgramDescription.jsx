import React from "react";
import { Head } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import Academics from "@/Components/Academics";

const ProgramDescription = () => {
    return (
        <>
            <Head title="Academic Programs | SITE" />
            <NavBar />
            <Academics />
        </>
    );
};

export default ProgramDescription;
