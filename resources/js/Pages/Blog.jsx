import BlogDescription from "@/Pages/BlogDescription";
import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";

const Blog = ({ events }) => {
    return (
        <>
            <NavBar />
            <BlogDescription events={events} />
        </>
    );
};

export default Blog;
