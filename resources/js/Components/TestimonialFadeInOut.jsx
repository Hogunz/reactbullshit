import React, { useState, useEffect } from "react";

export function TestimonialFadeInOut({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
                setIsVisible(true);
            }, 500); // Wait for fade out to complete
        }, 15000); // Change every 8 seconds

        return () => clearInterval(interval);
    }, [data.length]);

    const currentTestimonial = data[currentIndex];

    return (
        <section className="relative overflow-hidden bg-light dark:bg-dark py-20 lg:py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 dark:from-purple/10 dark:to-dark pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    data-aos="fade-up"
                    data-aos-duration="800"
                    className="text-center mb-16 lg:mb-24"
                >
                    <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-4">
                        Success Stories
                    </h3>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-dark dark:text-light">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">Testimonials</span>
                    </h1>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Side */}
                    <div
                        className={`relative transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        data-aos="fade-right"
                        data-aos-duration="800"
                    >
                        <div className="absolute inset-0 bg-purple blur-3xl opacity-20 rounded-full transform -translate-x-4 translate-y-4"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 aspect-[3/4] max-w-sm mx-auto">
                            <img
                                className="w-full h-full object-cover"
                                src={"/storage/" + currentTestimonial.image}
                                alt={currentTestimonial.name}
                            />
                        </div>
                    </div>

                    {/* Text Side - Glass Card */}
                    <div
                        data-aos="fade-left"
                        data-aos-duration="800"
                    >
                        <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-xl">
                            {/* Quote Icon */}
                            <div className="absolute top-8 left-8 text-purple/20">
                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.0547 15.3738 15.122 15.632 15.122C16.01 15.122 16.339 15.273 16.697 15.273C17.405 15.273 18.123 14.765 18.123 13.823C18.123 12.912 17.418 12.56 16.71 12.56C15.316 12.56 14.041 13.418 14.041 14.95C14.041 15.463 14.152 15.757 14.207 16C12.48 16.191 11.688 15.033 11.688 13.412C11.688 11.697 12.588 9.91 14.131 9.91C14.688 9.91 15.208 10.177 15.208 10.919C15.208 11.605 14.818 11.956 14.518 11.956C14.212 11.956 13.974 11.688 13.974 11.309C13.974 10.96 14.212 10.641 14.518 10.641C14.576 10.641 14.617 10.649 14.653 10.659C14.553 9.461 13.456 8 11.688 8C9.208 8 7 10.208 7 13.412C7 17.115 9.475 21 14.017 21ZM6.71 21L6.71 18C6.71 16.0547 8.06684 15.122 8.32503 15.122C8.70303 15.122 9.032 15.273 9.39 15.273C10.098 15.273 10.816 14.765 10.816 13.823C10.816 12.912 10.111 12.56 9.403 12.56C8.009 12.56 6.734 13.418 6.734 14.95C6.734 15.463 6.845 15.757 6.9 16C5.173 16.191 4.381 15.033 4.381 13.412C4.381 11.697 5.281 9.91 6.824 9.91C7.381 9.91 7.901 10.177 7.901 10.919C7.901 11.605 7.511 11.956 7.211 11.956C6.905 11.956 6.667 11.688 6.667 11.309C6.667 10.96 6.905 10.641 7.211 10.641C7.269 10.641 7.31 10.649 7.346 10.659C7.246 9.461 6.149 8 4.381 8C1.901 8 -0.307 10.208 -0.307 13.412C-0.307 17.115 2.168 21 6.71 21Z"></path></svg>
                            </div>

                            <div className={`relative z-10 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-lg md:text-xl font-light italic text-gray-700 dark:text-gray-300 leading-relaxed mb-8 pt-6">
                                    "{currentTestimonial.content}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-1 bg-gradient-to-r from-purple to-fuchsia-500 rounded-full"></div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark dark:text-light">
                                            {currentTestimonial.name}
                                        </h4>
                                        <p className="text-sm font-medium text-purple uppercase tracking-wider">
                                            {currentTestimonial.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
