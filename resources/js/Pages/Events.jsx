import { NavBar } from "@/Components/NavBar";
import React from "react";
import { blogData } from "@/Components/Blogs";
import ButtonLink from "@/Components/ButtonLink";
const Events = () => {
    return (
        <>
            <div className="dark:bg-dark w-full">
                <NavBar />
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[211px] pb-[231px]">
                    News & Events
                </div>
                <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-8 pb-[130px]">
                    {blogData.map((blog, index) => (
                        <div
                            key={index}
                            className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                        >
                            <a href={"/Blogs?blog=" + blog.id}>
                                <img
                                    className=" max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[370px] h-[280px]"
                                    src={blog.avatar}
                                    alt=""
                                />
                            </a>
                            <div className="">
                                <a
                                    href=""
                                    className="font-inter font-semibold text-[22px] text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                >
                                    {blog.title}
                                </a>
                                <div className="space-y-8">
                                    <div>
                                        <p>{blog.description}</p>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>
                                            {" "}
                                            <a
                                                href={"/Blogs?blog=" + blog.id}
                                                className="href"
                                            >
                                                <ButtonLink />{" "}
                                            </a>
                                        </div>
                                        <div className="place-self-center">
                                            <p className="font-[18px] leading-[27px] font-inter dark:text-white ">
                                                October 8, 2023
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Events;
