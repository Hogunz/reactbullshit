import DarkMode from "./DarkModeToggle";
import { Link } from "@inertiajs/react";
import { LogoIcon } from "./svg/SVGicon";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
export function NavBar() {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    const navList = (
        <ul className="sm:mt-2 mt-12 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 lg:divide-y-0 divide-y-2">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/ProgramDescription"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    Academics
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/Faculty"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    Faculty
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/News&Events"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    News & Events
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/VMO"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    VMO
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/PEO"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    PEO
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a
                    href="/Contact"
                    className="sm:text-base text-5xl flex items-center py-2 pl-3 text-dark dark:text-light hover:text-purple dark:hover:text-purple transition duration-300 ease-in-out"
                >
                    Contact
                </a>
            </Typography>
        </ul>
    );
    return (
        <>
            <nav className="bg-light/75 border-gray-200 dark:bg-dark">
                <Navbar className="max-w-full mx-auto p-4 lg:fixed static inset-x-0 top-0 z-10 h-max border-transparent bg-light/75 dark:bg-dark/75 shadow-2xl">
                    <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto">
                        <a href="/" className="flex items-center">
                            <LogoIcon />
                        </a>
                        <div className="flex items-center gap-4">
                            <div className="mr-4 hidden lg:block">
                                {navList}
                            </div>
                            <div className="mr-4">
                                <DarkMode />
                            </div>
                            <div className="flex items-center gap-x-1">
                                <a href="/Contact" className="href">
                                    <span className="hidden lg:inline-block justify-center items-center py-3 px-5 text-base font-medium text-center text-light border rounded-lg bg-purple hover:bg-light hover:text-purple hover:border-purple  transition duration-300 ease-in-out focus:ring-4 focus:ring-purple">
                                        Enroll Now
                                    </span>
                                </a>
                            </div>
                            <IconButton
                                variant="text"
                                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                ripple={false}
                                onClick={() => setOpenNav(!openNav)}
                            >
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </IconButton>
                        </div>
                        <Collapse open={openNav}>
                            {navList}
                            <div className="flex flex-col sm:flex-row mb-8 lg:mb-16 space-y-4  sm:justify-left sm:space-y-0 sm:space-x-4 ">
                                <Link
                                    href="/Contact"
                                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-light border rounded-lg bg-purple "
                                >
                                    Enroll Now
                                </Link>
                            </div>
                        </Collapse>
                    </div>
                </Navbar>
            </nav>
        </>
    );
}
