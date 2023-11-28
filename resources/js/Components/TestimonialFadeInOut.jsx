import React, { useState, useEffect } from "react";
import FadeInOut from "./FadeInOut";

export function TestimonialFadeInOut({ data }) {
    const [show, setShow] = useState(true);
    const [dataIndex, setDataIndex] = useState(0);
    const extraStyles = {};

    useEffect(() => {
        const interval = setInterval(() => {
            setShow(false);
            setTimeout(() => {
                setDataIndex((prevIndex) => (prevIndex + 1) % data.length);
                setShow(true);
            }, 700);
        }, 7000);
        return () => clearInterval(interval);
    }, [data.length]);

    return (
        // <div
        //     data-aos="fade-up"
        //     data-aos-duration="800"
        //     className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl flex flex-col sm:flex-row lg:grid lg:grid-cols-2 sm:grid-cols-1 pt-[130px] lg:px-6 pb-[221px] "
        // >
        //     <div className="font-light text-gray-500 sm:text-lg dark:text-light/75 ">
        //         <h3 className="font-inter lg:text-[14px] text-[#d399ee] text-center sm:text-left lg:mb-8 text-lg uppercase font-medium tracking-widest pb-[20px]">
        //             Testimonials
        //         </h3>
        //         <FadeInOut
        //             show={show}
        //             style={extraStyles}
        //             className="flex flex-col order-1"
        //         >
        //             <div className="mb-4 font-inter italic leading-[33px] text-[18px] dark:text-light text-dark ">
        //                 <p>{data[dataIndex].content}</p>
        //             </div>

        //             <h1 className="font-inter font-semibold text-[22px] leading-[26.4px] text-purple pb-[10.39px]">
        //                 {data[dataIndex].name}
        //             </h1>
        //             <h3 className="font-inter font-normal text-[18px] leading-[27px]">
        //                 {data[dataIndex].position}
        //             </h3>
        //         </FadeInOut>
        //     </div>
        //     <div>
        //         <FadeInOut
        //             show={show}
        //             style={extraStyles}
        //             className="bg-cover bg-center"
        //         >
        //             <img
        //                 className="max-w-full object-scale-down  object-center w-[570px] h-[450px]"
        //                 src={"/storage/" + data[dataIndex].image}
        //                 alt="office content 2"
        //             />
        //         </FadeInOut>
        //     </div>
        // </div>
        <>
            {" "}
            <section className="dark:bg-[#232323] bg-light pt-[140px]">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl">
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        className="font-light text-gray-500 sm:text-lg dark:text-light/75 text-center sm:text-left"
                    >
                        <h3 className="font-inter lg:text-[14px] text-[#d399ee]  lg:mb-8 text-lg uppercase font-medium tracking-widest pb-[20px]">
                            Testoimonials
                        </h3>
                    </div>
                    <div className="text-dark/75 dark:text-light/75 grid grid-cols-1 md:grid-cols-2 content-center place-items-center">
                        <div className="flex items-center relative max-w-full overflow-hidden bg-cover bg-no-repeat lg:order-1 sm:order-2">
                            <FadeInOut
                                show={show}
                                style={extraStyles}
                                className="bg-cover bg-center"
                            >
                                <img
                                    className="max-w-full object-scale-down  object-center w-[570px] h-[450px]"
                                    src={"/storage/" + data[dataIndex].image}
                                    alt="office content 2"
                                />
                            </FadeInOut>
                        </div>

                        <div
                            className="flex items-center p-4 md:p-8 aos-disabled aos-init aos-animate"
                            data-aos="fade-up"
                            data-aos-duration="600"
                        >
                            <div className="mt-4 md:mt-0">
                                <FadeInOut
                                    show={show}
                                    style={extraStyles}
                                    className="flex flex-col order-1"
                                >
                                    <div className="mb-4 font-inter italic leading-[33px] text-[18px] dark:text-light text-dark ">
                                        <p>{data[dataIndex].content}</p>
                                    </div>

                                    <h1 className="font-inter font-semibold text-[22px] leading-[26.4px] text-purple pb-[10.39px]">
                                        {data[dataIndex].name}
                                    </h1>
                                    <h3 className="font-inter font-normal text-[18px] leading-[27px]">
                                        {data[dataIndex].position}
                                    </h3>
                                </FadeInOut>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
