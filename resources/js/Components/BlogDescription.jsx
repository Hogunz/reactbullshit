import React from "react";
import { CalendarIcon, UserIcon } from "./svg/SVGicon";
import { blogData } from "./Blogs";

const BlogDescription = ({ id }) => {
    const blog = blogData.filter((i) => i.id == id)[0];
    return (
        <>
            <div className="dark:bg-dark">
                <div className="max-w-screen-xl flex flex-col mx-auto p-4">
                    <div className="font-inter font-bold text-light text-[60px] text-left leading-[72px] pt-[93.45px]">
                        {blog.title}
                    </div>
                    <div className="flex space-x-[49.63px] pb-[50px]">
                        <div className="flex space-x-4 pt-[30px] items-center">
                            <div className="">
                                <CalendarIcon />
                            </div>
                            <div>
                                <h2 className="font-inter font-normal text-[16px] leading-[27px] text-light">
                                    {blog.date}
                                </h2>
                            </div>
                        </div>
                        <div className="flex space-x-4 pt-[30px] items-center">
                            <div className="">
                                <UserIcon />
                            </div>
                            <div>
                                <h2 className="font-inter font-normal text-[16px] leading-[27px] text-light">
                                    {blog.author}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <img
                            className="max-w-full mb-[27px]"
                            src={blog.avatar}
                            alt=""
                        />
                    </div>
                    <div>{blog.content}</div>
                </div>
            </div>
        </>
    );
};

export default BlogDescription;
