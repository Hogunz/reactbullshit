import DarkMode from "./DarkModeToggle";
import { Link } from "@inertiajs/react";
export function NavBar() {
    return (
        <>
            <nav className="bg-light border-gray-200 dark:bg-dark">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center"
                    >
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8 mr-3"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-light">
                            Flowbite
                        </span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-light dark:bg-gray-800 md:dark:bg-dark dark:border-gray-700">
                            <li>
                                <a
                                    href="/"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/ProgramDescription"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                >
                                    Academics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                >
                                    Faculty
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                >
                                    News & Events
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                >
                                    VMO
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/Contact"
                                    className="block py-2 pl-3 text-dark dark:text-light"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-0 pl-3 text-dark dark:text-light"
                                >
                                    <DarkMode />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
