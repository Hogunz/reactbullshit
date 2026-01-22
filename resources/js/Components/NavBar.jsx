import { useState, useEffect, Fragment } from "react";
import { Link } from "@inertiajs/react";
import {
    Navbar,
    Collapse,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import DarkMode from "./DarkModeToggle";
import { LogoIcon } from "./svg/SVGicon";

function NavListMenu({ title, items }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const renderItems = items.map(({ title, url }) => (
        <Link href={url} key={title} className="focus:outline-none">
            <MenuItem className="p-3 hover:bg-purple/5 transition-colors rounded-lg">
                <Typography variant="h6" className="text-dark dark:text-light mb-1 text-sm font-bold">
                    {title}
                </Typography>
            </MenuItem>
        </Link>
    ));

    return (
        <Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography
                        as="div"
                        variant="small"
                        className="font-medium"
                    >
                        <div
                            className="flex items-center gap-1 py-1 pr-2 font-medium cursor-pointer text-dark dark:text-light text-lg lg:text-base hover:text-purple transition-colors"
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            {title}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className={`h-3.5 w-3.5 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block bg-white dark:bg-dark border border-gray-200 dark:border-gray-800 focus:outline-none">
                    <ul className="grid grid-cols-1 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>
                    <ul className="flex flex-col gap-1 pl-4 mt-1 border-l-2 border-purple/10">
                        {items.map(({ title, url }) => (
                            <Link href={url} key={title}>
                                <li className="p-2 hover:text-purple text-dark dark:text-light font-medium text-sm">
                                    {title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </Collapse>
            </div>
        </Fragment>
    );
}

export function NavBar() {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
            <li className="p-1 font-medium">
                <Link
                    href="/"
                    className="flex items-center hover:text-purple transition-colors text-dark dark:text-light text-lg lg:text-base"
                >
                    Home
                </Link>
            </li>

            <NavListMenu
                title="About"
                items={[
                    { title: "History", url: "/History" },
                    { title: "V.M.O.", url: "/VMO" },
                ]}
            />

            <NavListMenu
                title="Academics"
                items={[
                    { title: "Programs", url: "/ProgramDescription" },
                    { title: "Faculty", url: "/Faculty" },
                ]}
            />

            {[
                ['News & Events', '/News&Events'],
                ['Contact', '/Contact'],
            ].map(([title, url]) => (
                <li key={title} className="p-1 font-medium">
                    <Link
                        href={url}
                        className="flex items-center hover:text-purple transition-colors text-dark dark:text-light text-lg lg:text-base"
                    >
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 backdrop-blur-md bg-white/80 dark:bg-dark/80 border-b border-gray-200 dark:border-gray-800 border-t-0 border-x-0 shadow-sm">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link href="/" className="mr-4 cursor-pointer py-1.5">
                    <LogoIcon />
                </Link>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>

                    <div className="flex items-center gap-4">
                        <DarkMode />
                        <Link
                            href="/Contact"
                            className="hidden lg:inline-block select-none rounded-full bg-purple py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple/20 transition-all hover:shadow-lg hover:shadow-purple/40 hover:-translate-y-1 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Enroll Now
                        </Link>
                    </div>

                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-dark dark:text-light"
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
            </div>
            <Collapse open={openNav}>
                <div className="mt-4 mb-4">
                    {navList}
                </div>
                <div className="flex items-center gap-x-1 mb-4">
                    <Link
                        href="/Contact"
                        className="w-full block select-none rounded-full bg-purple py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple/20 transition-all hover:shadow-lg hover:shadow-purple/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        Enroll Now
                    </Link>
                </div>
            </Collapse>
        </Navbar>
    );
}
