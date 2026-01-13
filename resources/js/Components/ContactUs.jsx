import React from "react";
import ButtonLink from "./ButtonLink";
import {
    LocationIcon,
    PhoneIcon,
    MessageIcon,
    FinderIcon,
} from "./svg/SVGicon";
import GoogleMap from "./GoogleMap";
import CustomCursor from "./CustomCursor";


const ContactUs = () => {
    return (
        <>
            <CustomCursor />
            <div className="dark:bg-dark relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                <div className="relative z-10 py-20 lg:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center mb-16 lg:mb-24">
                            <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-4">
                                Get in Touch
                            </h3>
                            <h1 className="text-4xl lg:text-7xl font-extrabold text-dark dark:text-light mb-6">
                                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Us</span>
                            </h1>
                        </div>

                        {/* Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Contact Info Card */}
                            <div className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                                <div className="relative h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl p-8">
                                    <div className="flex flex-col h-full">
                                        <div className="flex space-x-4 items-center mb-8">
                                            <div className="border-dashed border-2 border-purple bg-purple/10 p-3 rounded-xl">
                                                <MessageIcon className="w-6 h-6 text-purple" />
                                            </div>
                                            <div>
                                                <h2 className="font-inter font-bold text-2xl dark:text-light text-dark">
                                                    Our Contacts
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="font-inter text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                                            <p>
                                                Enroll today and embark on your path to
                                                mastering the art of Information
                                                Technology!
                                            </p>
                                        </div>

                                        <div className="space-y-6 mt-auto">
                                            <div className="flex space-x-4 items-center group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="border-dashed border-2 border-purple bg-purple/5 p-2 rounded-lg">
                                                    <LocationIcon className="w-5 h-5" />
                                                </div>
                                                <h2 className="font-medium font-inter text-dark dark:text-light/90">
                                                    Arellano St, Dagupan City, Philippines
                                                </h2>
                                            </div>
                                            <div className="flex space-x-4 items-center group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="border-dashed border-2 border-purple bg-purple/5 p-2 rounded-lg">
                                                    <MessageIcon className="w-5 h-5" />
                                                </div>
                                                <h2 className="font-medium font-inter text-dark dark:text-light/90">
                                                    udd_site@cdd.edu.ph
                                                </h2>
                                            </div>
                                            <div className="flex space-x-4 items-center group/item hover:translate-x-2 transition-transform duration-300">
                                                <div className="border-dashed border-2 border-purple bg-purple/5 p-2 rounded-lg">
                                                    <PhoneIcon className="w-5 h-5" />
                                                </div>
                                                <h2 className="font-medium font-inter text-dark dark:text-light/90">
                                                    (075) 522 2405
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Card */}
                            <div className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                                <div className="relative h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl flex flex-col">
                                    <div className="flex space-x-4 p-8 items-center border-b border-gray-200 dark:border-gray-700">
                                        <div className="border-dashed border-2 border-purple bg-purple/10 p-3 rounded-xl">
                                            <FinderIcon className="w-6 h-6 text-purple" />
                                        </div>
                                        <div>
                                            <h2 className="font-inter font-bold text-2xl dark:text-light text-dark">
                                                How can you find us?
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="flex-grow w-full h-[400px] lg:h-auto min-h-[400px]">
                                        <GoogleMap />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
