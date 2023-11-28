import React from "react";
import { CalendarIcon, UserIcon } from "../Components/svg/SVGicon";
import CustomCursor from "@/Components/CustomCursor";

export default function BlogDescription({ events = [] }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Example formatting: YYYY-MM-DD HH:MM:SS
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(
                2,
                "0",
            )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    return (
        <>
            <CustomCursor />
            <div className="dark:bg-dark">
                <div className="max-w-screen-xl flex flex-col mx-auto p-4">
                    <div className="font-inter font-bold dark:text-light text-dark text-left text-[40px] lg:text-[60px]  leading-0 lg:leading-[72px] pt-[93.45px]">
                        {events.name}
                    </div>
                    <div className="flex space-x-[49.63px] pb-[50px]">
                        <div className="flex space-x-4 pt-[30px] items-center">
                            <div className="">
                                <CalendarIcon />
                            </div>
                            <div>
                                <h2 className="font-inter font-normal text-[16px] leading-[27px] dark:text-light text-dark">
                                    {formatDate(events.created_at)}
                                </h2>
                            </div>
                        </div>
                        <div className="flex space-x-4 pt-[30px] items-center">
                            <div className="">
                                <UserIcon />
                            </div>
                            <div>
                                <h2 className="font-inter font-normal text-[16px] leading-[27px] dark:text-light text-dark">
                                    {events.user.name}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className=" lg:mt-0 lg:col-span-5 lg:flex ">
                        <img
                            className="max-w-full mb-[27px]"
                            src={"/storage/" + events.image}
                            alt=""
                        />
                    </div>
                    <div
                        className="font-inter font-light text-[18px] leading-[27px] dark:text-light text-justify"
                        dangerouslySetInnerHTML={{
                            __html: events.content,
                        }}
                    />
                </div>
            </div>
        </>
    );
}
