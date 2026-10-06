import BlogDescription from "@/Pages/BlogDescription";
import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";
import { Head } from "@inertiajs/react";

const Blog = ({ events, blog, suggestions = [] }) => {
    return (
        <>
            <Head title={`${events?.name ? events.name + " | " : ""}News & Events | SITE`} />
            <NavBar />
            <BlogDescription events={events} blog={blog} suggestions={suggestions} />
        </>
    );
};

export default Blog;
