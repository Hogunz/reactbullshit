import { Testimonials } from "@/Components/Testimonials";
export default function AboutUs() {
    return (
        <section
            id="About"
            className="bg-gradient-to-br from-purple from-5% via-[#2B2B2B] via-30% to-dark"
        >
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 ">
                <div className="font-light text-gray-500 sm:text-lg dark:text-light/75 order-2 ">
                    <h3 className="font-inter text-[14px] text-[#d399ee] uppercase font-medium tracking-widest">
                        ABOUT US
                    </h3>
                    <p className="mb-4">
                        The School of Information Technology Education (SITE) at
                        Universidad de Dagupan in Dagupan City, Pangasinan,
                        Philippines, offers undergraduate and graduate programs
                        in Information Technology. Undergraduate programs
                        include Bachelor of Science in Information Technology
                        (BSIT) and Bachelor of Science in Computer Science
                        (BSCS), providing a strong foundation in IT principles
                        such as programming, software development, database
                        management, and networking.
                    </p>
                    <p>
                        The graduate program is the Master of Information
                        Technology (MIT), catering to professionals seeking
                        advanced knowledge in system analysis, information
                        security, and database administration. SITE's faculty
                        comprises experienced IT professionals dedicated to
                        providing quality education and practical experience
                        through local and international industry partnerships,
                        internships, and hands-on learning opportunities. SITE
                        aims to equip students with the necessary knowledge and
                        skills for successful careers in the fast-paced and
                        ever-evolving IT industry.
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <img
                        className="w-full object-cover bg-cover object-center"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                        alt="office content 1"
                    />
                    <img
                        className="mt-6 w-full lg:mt-10 object-cover bg-cover object-center"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                        alt="office content 2"
                    />
                </div>
            </div>
            <Testimonials />
        </section>
    );
}
