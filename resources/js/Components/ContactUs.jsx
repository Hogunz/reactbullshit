import React, { useState, useEffect, useRef } from "react";
import FadeInOut from "./FadeInOut";

export function TestimonialFadeInOut({ data }) {
    const [show, setShow] = useState(true);
    const [dataIndex, setDataIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const startInterval = () => {
            intervalRef.current = setInterval(() => {
                setShow(false);
                setTimeout(() => {
                    setDataIndex((prevIndex) => (prevIndex + 1) % data.length);
                    setShow(true);
                }, 500); // Adjust the timeout value as needed
            }, 3000);
        };

        const container = document.getElementById("testimonialContainer");

        if (container) {
            container.addEventListener("mouseenter", () =>
                clearInterval(intervalRef.current)
            );
            container.addEventListener("mouseleave", startInterval);
        }

        startInterval();

        return () => {
            clearInterval(intervalRef.current);
            if (container) {
                container.removeEventListener("mouseenter", () =>
                    clearInterval(intervalRef.current)
                );
                container.removeEventListener("mouseleave", startInterval);
            }
        };
    }, [data.length]);

    return (
        <div
            id="testimonialContainer"
            className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 pt-[130px] lg:px-6 pb-[221px]"
        >
            <div className="font-light text-gray-500 sm:text-lg dark:text-light/75">
                <h3 className="font-inter text-[14px] text-[#d399ee] uppercase font-medium tracking-widest pb-[20px]">
                    Testimonials
                </h3>

                <FadeInOut
                    key={`text-${dataIndex}`}
                    show={show}
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
                key={`image-${dataIndex}`}
                show={show}
                className="transition ease-in duration-500"
            >
                <img
                    className="max-w-xl aspect-square object-cover bg-cover object-center w-[570px] h-[450px]"
                    src={data[dataIndex].image}
                    alt="testimonial"
                />
            </FadeInOut>
        </div>
    );
}
