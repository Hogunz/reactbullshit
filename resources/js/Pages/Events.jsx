import { NavBar } from "@/Components/NavBar";
import React from "react";
import ButtonLink from "@/Components/ButtonLink";
export default function Events({ events = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example formatting: YYYY-MM-DD HH:MM:SS
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };
    return (
        <>
            <div className="dark:bg-dark w-full">
                <NavBar />
                <div className="text-dark dark:text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[211px] pb-[231px]">
                    News & Events
                </div>
                <section className="dark:bg-[#232323] bg-light pt-[140px]">
                    <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-8 pb-[130px]">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
                            >
                                <a
                                    href={route("events.show", {
                                        id: event.id,
                                    })}
                                >
                                    <img
                                        className=" max-w-full bg-cover object-cover aspect-square mb-[27px] transition duration-300 ease-in-out hover:scale-110 w-[370px] h-[280px]"
                                        src={"/storage/" + event.image}
                                        alt=""
                                    />
                                </a>
                                <div className="">
                                    <a
                                        href=""
                                        className="line-clamp-1 font-inter font-semibold text-[22px] text-[#a352cc] leading-[26.4px] hover:text-light transition duration-300 ease-in-out"
                                    >
                                        {event.name}
                                    </a>
                                    <div className="space-y-8">
                                        <div>
                                            <p
                                                className="line-clamp-2 font-inter font-normal text-light/75 leading-[26.4px] pb-[23px] pt-4"
                                                // dangerouslySetInnerHTML={{
                                                //     __html: event.content,
                                                // }}
                                            />
                                        </div>

                                        <div className="flex justify-between">
                                            <div>
                                                {" "}
                                                <a
                                                    href={route("events.show", {
                                                        id: event.id,
                                                    })}
                                                >
                                                    <ButtonLink />{" "}
                                                </a>
                                            </div>
                                            <div className="place-self-center">
                                                <p className="font-[18px] leading-[27px] font-inter dark:text-white ">
                                                    {formatDate(
                                                        event.created_at
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
