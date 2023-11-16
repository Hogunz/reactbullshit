import React from "react";
import ButtonLink from "./ButtonLink";
import {
    LocationIcon,
    PhoneIcon,
    MessageIcon,
    FinderIcon,
} from "./svg/SVGicon";
import GoogleMap from "./GoogleMap";
const ContactUs = () => {
    return (
        <>
            <div className="dark:bg-dark">
                <div className="text-light text-center font-inter font-bold text-[90px] leading-[108px] pt-[100px] pb-[90px]">
                    Contact Us
                </div>
                <div class="mx-auto max-w-3xl grid grid-cols-2 gap-8 pb-[130px]">
                    <div className="relative max-w-xl dark:bg-[#232323] shadow-2xl">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div className="border-dashed border-2 border-purple bg-purple/5 p-2">
                                    <MessageIcon />
                                </div>
                                <div>
                                    <h2 className="font-inter leading-[26.4px] font-semibold text-[22px] text-light">
                                        Our Contacts
                                    </h2>
                                </div>
                            </div>
                            <div className="font-light font-inter leading-[27px] text-light/75 text-[18px] px-8">
                                <p>
                                    Enroll today and embark on your path to
                                    mastering the art of Information Technology!
                                </p>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <LocationIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            Arellano St, Dagupan City,
                                            Philippines
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <MessageIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            udd_site@cdd.edu.ph
                                        </h2>
                                    </div>
                                </div>
                                <div className="flex space-x-4 items-center">
                                    <div className="border-dashed border-2 border-purple bg-purple/5 p-[5px]">
                                        <PhoneIcon />
                                    </div>
                                    <div>
                                        <h2 className="font-light font-inter leading-[27px] text-light/75 text-[18px] ">
                                            (075) 522 2405
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" relative max-w-xl dark:bg-[#232323] shadow-2xl">
                        <div className="flex flex-col">
                            <div className="flex space-x-4 p-8 items-center">
                                <div className="border-dashed border-2 border-purple bg-purple/5 p-2">
                                    <FinderIcon />
                                </div>
                                <div>
                                    <h2 className="font-inter leading-[26.4px] font-semibold text-[22px] text-light">
                                        How Can you find us?
                                    </h2>
                                </div>
                            </div>
                            <div className=" ">
                                <GoogleMap />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
