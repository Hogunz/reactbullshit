import AnimatedText from "@/Components/AnimatedText";
import { Link } from "@inertiajs/react";
export default function HeroSection() {
    return (
        <section className="bg-light dark:bg-dark h-screen w-full flex flex-col justify-center">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl py-8 mb-4 text-4xl md:text-5xl xl:text-[60px] font-extrabold tracking-tight leading-none  text-dark dark:text-light">
                        Center of Development in{" "}
                        <AnimatedText
                            className="text-purple dark:text-purple"
                            text="Information Technology Education"
                        />
                    </h1>

                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-light/75">
                        Unlock Your Potential at the Center of Development in
                        Information Technology Education. Ignite Your Future in
                        IT. Enroll Today and Build a Path to Success.
                    </p>
                    <Link
                        href="/Contact"
                        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-light border rounded-lg bg-purple hover:bg-light hover:text-purple hover:border-purple  transition duration-300 ease-in-out focus:ring-4 focus:ring-purple"
                    >
                        Enroll Now
                    </Link>
                    <a
                        href="/ProgramDescription"
                        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-dark border rounded-lg bg-light dark:bg-transparent dark:text-light hover:bg-purple hover:text-light dark:hover:bg-purple dark:hover:text-dark hover:border-purple  transition duration-300 ease-in-out focus:ring-4 dark:focus:ring-light focus:ring-purple"
                    >
                        See Our Program
                    </a>
                </div>
                <div className=" lg:mt-0 lg:col-span-5 lg:flex">
                    <img
                        className="object-scale-down bg-cover"
                        src="/img/pic1.jpg"
                        alt="mockup"
                    />
                </div>
            </div>
        </section>
    );
}
