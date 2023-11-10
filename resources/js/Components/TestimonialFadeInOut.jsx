import React, { useState, useEffect } from "react";
import FadeInOut from "./FadeInOut";

export function TestimonialFadeInOut({ data }) {
    const [show, setShow] = useState(true);
    const [dataIndex, setDataIndex] = useState(0);
    const extraStyles = {
        // position: "fixed",
        // top: "30px",
        // left: 0,
        // right: 0,
        // bottom: 0,
        // background: "rgba(0, 0, 0, 0.4)",
        // color: "#FFF"
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShow((prevShow) => !prevShow);
            setDataIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 3000); // Time in milliseconds for the timer to toggle the visibility

        return () => clearInterval(interval);
    }, [data.length]);

    return (
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 pt-[130px] lg:px-6 pb-[221px]">
            <div className="font-light text-gray-500 sm:text-lg dark:text-light/75">
                <h3 className="font-inter text-[14px] text-[#d399ee] uppercase font-medium tracking-widest pb-[20px]">
                    Testimonials
                </h3>

                <FadeInOut
                    show={show}
                    style={extraStyles}
                    className="flex flex-col transition ease-in duration-500"
                >
                    <div className="mb-4 font-inter italic leading-[33px] text-[18px] dark:text-light text-dark">
                        <p>{data[dataIndex].text}</p>
                    </div>

                    <h1 className="font-inter font-semibold text-[22px] leading-[26.4px] text-purple pb-[10.39px]">
                        {data[dataIndex].name}
                    </h1>
                    <h3 className="font-inter font-normal text-[18px] leading-[27px]">
                        {data[dataIndex].position}
                    </h3>
                </FadeInOut>
            </div>
            <FadeInOut
                show={show}
                style={extraStyles}
                className="transition ease-in duration-500"
            >
                <img
                    className="max-w-xl aspect-square object-cover bg-cover object-center w-[570px] h-[450px]"
                    src={data[dataIndex].image}
                    alt="office content 2"
                />
            </FadeInOut>
        </div>
    );
}
