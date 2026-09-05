import BlogDescription from "@/Pages/BlogDescription";
import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";
import { Head } from "@inertiajs/react";

const Blog = ({ events, blog }) => {
    return (
        <>
            <Head title="News & Event Details | SITE" />
            <NavBar />
            <BlogDescription events={events} blog={blog} />
        </>
    );
};

export default Blog;
