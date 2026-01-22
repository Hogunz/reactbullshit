import CustomCursor from "@/Components/CustomCursor";
import { NavBar } from "@/Components/NavBar";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Head } from "@inertiajs/react";

const History = () => {
    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1200, // Slightly longer duration for smoother feel
            easing: "ease-out-cubic",
        });
    }, []);

    const timelineEvents = [
        {
            year: "1984 - 1994",
            decade: "1ST DECADE",
            title: "Foundations & Resilience",
            content: `In October 1984, Universidad de Dagupan, initially known as Computronix, emerged as a modest computer-electronics training center with just one classroom, one office, and a computer room in Zarate Building along AB Fernandez Avenue. Despite having only 20 computers, Computronix successfully transformed its 14 pioneer students into experts.

            However, the triumph faced challenges in the following years. On February 18, 1988, a devastating fire consumed Vina Theatre, located next to the rented building, affecting Computronix. Then, on July 16, 1990, a destructive earthquake struck Dagupan, causing widespread damage to businesses and schools, including Computronix.

            Despite these adversities, Computronix remained unwavering in its mission, demonstrating resilience in the face of tragedy.

            On December 22, 1992, Computronix rapidly ascended to new heights as a collegiate institution, achieving remarkable success shortly after its establishment.

            Within its initial decade, Computronix College accomplished the construction of three buildings – namely, the Felisa Arzadon Memorial Edifice (FAME), the Science Centrum, and the Liberal Arts, Commerce, and Accountancy (LCA) Building. These structures were erected to accommodate the growing number of enrollees and to ensure the provision of quality services as the institution expanded its program offerings.`,
        },
        {
            year: "1995 - 2004",
            decade: "2ND DECADE",
            title: "Expansion & Recognition",
            content: `In its second decade, Computronix College expanded its campus by adding new buildings like Engineering, Administration, VPA-CS, and a new LCA Building to accommodate the growing student population and provide additional facilities.

            In 1997, the college was honored as the cleanest and greenest higher educational institution at the city level by the city government, in recognition of its commitment to eco-friendly initiatives.

            During these years, Computronix attained accreditations from The Philippine Association of Colleges and Universities Commission on Accreditation (PACUCOA) for the majority of its offered programs.`,
        },
        {
            year: "2005 - 2014",
            decade: "3RD DECADE",
            title: "Rebranding & Excellence",
            content: `In the beginning of its following decade, Computronix College underwent a noteworthy transformation, rebranding itself as Colegio de Dagupan and adopting the new motto "Dat Deus Et Laborant Homines" (God's Given Gifts Developed by Man).

            This strategic change propelled CdD to greater heights, marked by notable achievements and recognitions positioning itself among the region's esteemed higher education institutions.

            In November 2006, CDD underwent CHED's Institutional Quality Assurance Monitoring and Evaluation (IQuAME), earning the esteemed Category A classification, the highest in its category.

            The College of Information and Computing Studies received the Center of Development in Information Technology in March 2007, solidifying its commitment to quality instruction, advanced research, and relevant outreach programs.

            In June 2008, CDD marked a significant achievement with its first topnotcher in the Nursing Licensure Exams – Ms. Rizza A. Tamayo, who ranked 6th, opening the floodgates for the growing names on the HOT (Home of Topnotchers) list.

            The institution's excellence continued to shine as it obtained Deregulated Status in 2009, followed by recognition as a Center of Development for Teacher Education the subsequent year. The pinnacle came in July 2012 when Autonomous Status was granted to Colegio de Dagupan, a testament to its consistently exemplary performance.`,
        },
        {
            year: "2015 - 2024",
            decade: "4TH DECADE",
            title: "University Status & Global Reach",
            content: `The commencement of Colegio de Dagupan's fourth decade made a resounding impact in October 2015. During this historic moment, the institution achieved a remarkable feat in the field of Accountancy as two of its Bachelor of Science in Accountancy graduates secured the first and eighth positions in the 2015 Certified Public Accountant Licensure Exams. Rally S. Paragas emerged as the topnotcher, claiming the first position, while Fern Adriel M. Velasco earned the eighth spot. Mr. Paragas marked a significant milestone by becoming the first topnotcher in the CPA licensure exams from the City of Dagupan and the Province of Pangasinan, adding another exceptional achievement to the legacy of Colegio de Dagupan.

            Furthermore, CdD achieved a remarkable accomplishment in the Electronics Engineering Licensure Exams by producing four topnotchers in just three consecutive years. In 2017, Engr. Ronnie Gee G. Alfonso secured 6th place. Engr. Ferren M. Velasco attained 8th place in 2018. Then, in 2019, both Engr. Hannah Joy Fadullon and Engr. Cherish Ferrer achieved top rankings, with Fadullon clinching the second spot and Ferrer securing the seventh.

            For a continuous span of 12 years, Colegio de Dagupan (CDD) consistently produced topnotchers in various Philippine licensure exams. Unfortunately, this impressive 12-year streak was interrupted due to the implementation of the K to 12 program in the country, coupled with the disruptions caused by the outbreak of the COVID-19 pandemic in 2020, which led to the suspension of licensure exams.

            After a two-year hiatus, the institution resumed its legacy of producing topnotchers. In April 2022, Engineer Franz Fernand M. Velasco secured the 4th position in the Electronics Engineer Licensure Exam and the 2nd position in the Electronics Technician Licensure Exam. This marked a noteworthy revival of CdD's tradition of excellence in licensure exams.

            On December 14, 2021, Colegio de Dagupan reached a momentous milestone as it was granted university status by the Commission on Higher Education. Consequently, the institution transitioned into Universidad de Dagupan, and invested its founder, Dr. Voltaire P. Arzadon, as its first University President. This signaled a trajectory of sustained growth and development in the years ahead.

            Shortly after attaining university status, UDD embarked on a journey toward internationalization, recognizing the paramount importance of providing students with a global education. The university has actively fostered partnerships and collaborations with institutions worldwide, facilitating exchange programs, joint research projects, and international internships.

            In its commitment to enriching the student learning experience, UDD underwent renovations and established new facilities. The university acknowledges the significance of creating a conducive and modern environment for students to learn, grow, and achieve their goals. Upgraded classrooms, laboratories, libraries, and other amenities now provide students with essential resources for both academic and personal development. This investment in education underscores the university's unwavering commitment to delivering quality education and ensuring that students have access to the best possible resources.

            In March 2023, Dr. Feliza Arzadon-Sua, formerly the Vice President for Academic Affairs, assumed the role of UdD's new president, succeeding her father. She persistently strengthens essential connections to propel the school's trajectory towards achieving world-class status.

            December 2024 marks another milestone for Universidad de Dagupan as it receives the ISO 21001:2018 certification, a globally recognized standard for Educational Organizations Management Systems. This achievement makes UdD the first institution in Region 1 to earn this prestigious distinction. The underscores the university’s commitment to delivering quality education and fostering excellence.

            As a leader in innovation, Universidad de Dagupan became the first educational institution in the region to introduce electronic jeepneys. This eco-friendly initiative aims to provide students with a sustainable and convenient transportation option while promoting green mobility within the community.

            Universidad de Dagupan actively conducts Extension Services through various outreach programs in select barangays, fostering community development and empowerment. These initiatives include learning opportunities for young children, seminars, training programs, and volunteer activities aimed at enhancing skills and knowledge. By engaging with local communities, the university reinforces its commitment to social responsibility and lifelong learning, creating a positive impact beyond the campus.

            Over its four decades of existence, UdD boasts numerous tales of successful individuals it has nurtured. These stories illuminate the institution's profound impact on diverse individuals, fostering positive change within the community through empathy and its commitment to offering accessible and high-quality education to all.`,
        },
    ];

    return (
        <>
            <Head title="History" />
            <CustomCursor />
            <NavBar />
            <div className="relative min-h-screen bg-light dark:bg-dark overflow-hidden font-sans selection:bg-purple selection:text-white">
                {/* Enhanced Background Elements */}
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple/20 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent opacity-40 pointer-events-none" />
                <div className="fixed top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>

                {/* Content Container */}
                <div className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">

                    {/* Header Section */}
                    <div
                        data-aos="fade-down"
                        className="text-center mb-24 lg:mb-40 max-w-5xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/5 border border-purple/10 mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-purple animate-pulse"></span>
                            <span className="font-inter text-xs font-bold text-purple tracking-[0.2em] uppercase">
                                Since 1984
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-dark dark:text-light tracking-tight mb-10 leading-tight">
                            Four decades of unwavering commitment to <br className="hidden md:block" />
                            <span className="relative inline-block">
                                <span className="absolute -inset-1 bg-gradient-to-r from-purple to-fuchsia-500 blur-2xl opacity-20"></span>
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple to-fuchsia-500">
                                    Academic Excellence!
                                </span>
                            </span>
                        </h1>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple/10 to-transparent blur-xl opacity-30 rounded-full"></div>
                            <p className="relative text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto font-medium" data-aos="fade-up" data-aos-delay="100">
                                Established in 1984, Universidad de Dagupan has become a beacon of knowledge and a bastion of learning in the heart of Dagupan City, Philippines. Over the years, UdD has not only stood the test of time but has also evolved into a thriving center for education, shaping the futures of countless individuals and contributing significantly to the cultural and intellectual tapestry of the region.
                            </p>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="relative">
                        {/* Vertical Line with Gradient */}
                        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-[calc(100%-100px)] bg-gradient-to-b from-purple/10 via-purple/50 to-purple/10"></div>

                        <div className="space-y-24 lg:space-y-32">
                            {timelineEvents.map((item, index) => (
                                <div key={index} className={`flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                                    {/* Content Card */}
                                    <div className="w-full lg:w-5/12" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}>
                                        <div className="group relative h-full">
                                            {/* Card Glow Effect */}
                                            <div className="absolute -inset-0.5 bg-gradient-to-br from-purple to-fuchsia-600 rounded-[2rem] blur opacity-10 group-hover:opacity-30 transition duration-700"></div>

                                            <div className="relative h-full p-8 lg:p-10 rounded-[1.8rem] bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl hover:shadow-purple/10 transition-all duration-500">

                                                {/* Header within Card */}
                                                <div className="flex flex-col border-b border-dashed border-gray-200 dark:border-white/10 pb-6 mb-6">
                                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-transparent dark:from-white/10 dark:to-transparent absolute right-6 top-6 select-none opacity-50">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-sm font-bold tracking-widest text-purple uppercase mb-1">
                                                        {item.year}
                                                    </span>
                                                    <h2 className="text-2xl lg:text-3xl font-bold text-dark dark:text-light group-hover:text-purple transition-colors duration-300">
                                                        {item.title}
                                                    </h2>
                                                </div>

                                                {/* Content Text */}
                                                <div className="space-y-4">
                                                    {item.content.split('\n').filter(p => p.trim() !== '').map((paragraph, i) => (
                                                        <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify text-[0.95rem] lg:text-base">
                                                            {paragraph.trim()}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Node (Desktop) */}
                                    <div className="hidden lg:flex w-2/12 flex-col items-center justify-center relative">
                                        <div className="sticky top-1/2 -translate-y-1/2 z-20">
                                            <div className="relative flex items-center justify-center w-12 h-12 bg-light dark:bg-dark rounded-full border-4 border-purple/10 shadow-[0_0_0_8px_rgba(139,92,246,0.05)]">
                                                <div className="w-3 h-3 bg-gradient-to-r from-purple to-fuchsia-500 rounded-full shadow-lg shadow-purple/50"></div>
                                            </div>
                                            <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2">
                                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    {item.decade}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Spacer */}
                                    <div className="w-full lg:w-5/12 hidden lg:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Conclusion Section */}
                    <div className="mt-32 lg:mt-48 text-center max-w-5xl mx-auto" data-aos="fade-up">
                        <div className="relative p-10 lg:p-16 rounded-[2.5rem] bg-gradient-to-br from-purple/5 to-fuchsia-500/5 dark:from-purple/10 dark:to-transparent border border-purple/10 dark:border-purple/20 overflow-hidden">
                            {/* Decorative Background for Conclusion */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <h2 className="relative text-3xl lg:text-4xl font-bold text-dark dark:text-light mb-8">
                                Looking Forward
                            </h2>
                            <div className="relative space-y-6">
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                    Universidad de Dagupan remains dedicated to its mission of shaping well-rounded individuals, nurturing critical thinking, and fostering a spirit of lifelong learning. With a proud history behind and a bright future ahead, the university eagerly anticipates the continued growth, success, and positive impact it will undoubtedly bring to the educational landscape.
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                    As we celebrate the achievements of the past and embrace the challenges of the future, Universidad de Dagupan stands poised to empower minds, transform lives, and contribute meaningfully to the ever-evolving tapestry of education.
                                    <span className="block mt-6 text-xl font-bold text-purple font-serif italic">
                                        "Here's to the next 40 years and beyond, where the spirit of excellence will continue to shine brightly, illuminating the path for all who seek knowledge within its hallowed halls."
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Quote/Deco */}
                    <div className="mt-20 text-center opacity-40">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-purple to-transparent mx-auto rounded-full mb-6"></div>
                        <p className="font-inter text-xs tracking-[0.3em] uppercase text-dark dark:text-light">
                            Est. 1984
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default History;
