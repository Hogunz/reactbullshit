import React from "react";
import { NavBar } from "@/Components/NavBar";
import Academics, { Description } from "@/Components/Academics";
const ProgramDescription = () => {
    return (
        <>
            <NavBar />
            <Description />
            <Academics />
        </>
    );
};

export default ProgramDescription;
