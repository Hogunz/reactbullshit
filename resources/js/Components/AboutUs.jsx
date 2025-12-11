import Testimonials from "@/Components/Testimonials";
import CustomCursor from "./CustomCursor";

export default function AboutUs({ bscstestimonials = [] }) {
    return (
        <>
            <CustomCursor />
            <section className="relative overflow-hidden dark:bg-dark bg-light py-20 lg:py-32">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple/20 blur-[100px] mix-blend-screen"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen"></div>
                </div>

                <div className="relative z-10 gap-16 items-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl flex flex-col lg:grid lg:grid-cols-2">
                    {/* Text Content - Glass Card */}
                    <div
                        data-aos="fade-right"
                        data-aos-duration="800"
                        className="order-2 lg:order-1 relative group perspective-1000"
                    >
                        <div className="relative p-8 md:p-12 rounded-3xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
                            <h3 className="font-inter text-sm font-bold text-purple tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                                <span className="w-12 h-[2px] bg-purple"></span>
                                About Us
                            </h3>

                            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                <p>
                                    The School of Information Technology Education (SITE) at Universidad de Dagupan in Dagupan City, Pangasinan, Philippines, offers undergraduate and graduate programs in Information Technology. Undergraduate programs include Bachelor of Science in Information Technology (BSIT) and Bachelor of Science in Computer Science (BSCS), providing a strong foundation in IT principles such as programming, software development, database management, and networking.
                                </p>
                                <p>
                                    The graduate program is the Master of Information Technology (MIT), catering to professionals seeking advanced knowledge in system analysis, information security, and database administration. SITE's faculty comprises experienced IT professionals dedicated to providing quality education and practical experience through local and international industry partnerships, internships, and hands-on learning opportunities. SITE aims to equip students with the necessary knowledge and skills for successful careers in the fast-paced and ever-evolving IT industry.
                                </p>
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple to-blue-600 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* 3D Floating Images */}
                    <div
                        className="order-1 lg:order-2 relative h-[600px] w-full perspective-1000"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <div className="absolute top-10 left-10 w-3/4 h-3/4 z-10 transform transition-all duration-700 hover:z-30 hover:scale-105 hover:rotate-y-12 shadow-2xl rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800">
                            <img
                                className="w-full h-full object-cover"
                                src="/img/pic2.jpg"
                                alt="Campus Life"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-bold text-xl"></span>
                            </div>
                        </div>

                        <div className="absolute bottom-10 right-10 w-2/3 h-2/3 z-20 transform transition-all duration-700 hover:z-30 hover:scale-105 hover:-rotate-y-12 shadow-2xl rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800">
                            <img
                                className="w-full h-full object-cover"
                                src="/img/pic3.jpg"
                                alt="Student Collaboration"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-bold text-xl"></span>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white dark:bg-dark p-4 rounded-2xl shadow-xl animate-bounce-slow">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple/10 p-3 rounded-xl">
                                    <svg className="w-8 h-8 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Excellence</p>
                                    <p className="text-lg font-bold text-dark dark:text-white">Guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <Testimonials bscstestimonials={bscstestimonials} />
                </div>
            </section>
        </>
    );
}
