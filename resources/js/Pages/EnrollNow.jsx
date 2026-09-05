import React from "react";
import { Head } from "@inertiajs/react";
import { NavBar } from "@/Components/NavBar";
import ContactUs from "@/Components/ContactUs";

const EnrollNow = () => {
    return (
        <>
            <Head title="Enroll Now & Contact | SITE" />
            <NavBar />
            <ContactUs />
        </>
    );
};

export default EnrollNow;
