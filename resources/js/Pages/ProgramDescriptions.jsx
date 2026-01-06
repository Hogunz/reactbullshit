import React from "react";
import { NavBar } from "@/Components/NavBar";
import Academics, { Description } from "@/Components/Academics";
import ProgramDescription from "./ProgramDescription";
import {
    BSITDescriptionProgram,
    BSCSDescriptionProgram,
} from "@/Components/DescriptionProgram";
const ProgramDescriptions = ({ program, allAttributes, ...props }) => {
    return (
        <>
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
