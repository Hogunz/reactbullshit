import React from "react";
import { Head } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import Academics, { Description } from "@/Components/Academics";
import ProgramDescription from "./ProgramDescription";
import {
    BSITDescriptionProgram,
    BSCSDescriptionProgram,
} from "@/Components/DescriptionProgram";

const ProgramDescriptions = ({ program, allAttributes, ...props }) => {
    const programTitle = program ? `${program} Curriculum` : "Academic Curriculum";

    return (
        <>
            <Head title={`${programTitle} | SITE`} />
            <NavBar />
            <Description name={program} />
            {program == "BSIT" ? (
                <BSITDescriptionProgram attributes={allAttributes} />
            ) : (
                <BSCSDescriptionProgram attributes={allAttributes} />
            )}
        </>
    );
};

export default ProgramDescriptions;
