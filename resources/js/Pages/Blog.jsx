import BlogDescription from "@/Components/BlogDescription";
import InstructorDescription from "@/Components/InstructorDescription";
import { NavBar } from "@/Components/NavBar";
import React from "react";

const Blog = ({ blog }) => {
    return (
        <>
            <NavBar />
            <BlogDescription id={blog} />
        </>
    );
};

export default Blog;
