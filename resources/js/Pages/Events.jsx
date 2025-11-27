import { NavBar } from "@/Components/NavBar";
import React from "react";
import ButtonLink from "@/Components/ButtonLink";
import CustomCursor from "@/Components/CustomCursor";
import { Link } from "@inertiajs/react";

export default function Events({ events = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example formatting: YYYY-MM-DD HH:MM:SS
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };
    return (
        <>
            <CustomCursor />
            <div className="dark:bg-dark w-full min-h-screen">
                <NavBar />
                <div className="text-dark dark:text-light text-center font-inter font-bold text-6xl lg:text-8xl py-32 lg:py-52">
                    News & Events
                </div>
                <section className="dark:bg-[#232323] bg-light py-20 lg:pt-36">
                    <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32 place-items-center px-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="relative w-full max-w-sm overflow-hidden bg-cover bg-no-repeat group"
                            >
                                <Link
                                    href={route("events.show", {
                                        id: event.id,
                                    })}
                                >
                                    <img
                                        className="w-full aspect-[4/3] object-cover mb-6 transition duration-300 ease-in-out group-hover:scale-110"
                                        src={"/storage/" + event.image}
                                        alt={event.name}
                                    />
                                </Link>
                                <div className="">
                                    <Link
                                        href={route("events.show", {
                                            id: event.id,
                                        })}
                                        className="line-clamp-1 font-inter font-semibold text-2xl text-[#a352cc] hover:text-dark dark:hover:text-light transition duration-300 ease-in-out"
                                    >
                                        {event.name}
                                    </Link>
                                    <div className="space-y-6 mt-4">
                                        <div>
                                            <p
                                                className="line-clamp-2 font-inter font-normal text-gray-600 dark:text-light/75 pb-6"
                                            // dangerouslySetInnerHTML={{
                                            //     __html: event.content,
                                            // }}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <Link
                                                    href={route("events.show", {
                                                        id: event.id,
                                                    })}
                                                >
                                                    <ButtonLink />
                                                </Link>
                                            </div>
                                            <div>
                                                <p className="text-lg font-inter dark:text-white">
                                                    {formatDate(
                                                        event.created_at,
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
