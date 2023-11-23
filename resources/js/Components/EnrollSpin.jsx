import { Link } from "@inertiajs/react";
import React from "react";

const EnrollSpin = () => {
    return (
        <>
            <style>
                {`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .spin-animation {
                    animation: spin 5s linear infinite;
                }
                `}
            </style>
            <div className="sm:flex hidden fixed z-10 left-20 bottom-20 items-center justify-center overflow-hidden">
                <div className="w-48 h-auto flex items-center justify-center relative">
                    <img
                        className="spin-animation "
                        src="/img/spin.png"
                        alt=""
                    />
                    <Link
                        href="/Contact"
                        className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-inter  text-light  shadow-md border border-solid border-dark w-20 h-20 rounded-full font-semibold  text-[13px]  bg-purple dark:hover:bg-light hover:bg-light hover:text-dark/75 dark:hover:text-purple hover:border-purple transition duration-300 ease-in-out focus:ring-4 focus:ring-purple"
                    >
                        Enroll Now
                    </Link>
                </div>
            </div>
        </>
    );
};

export default EnrollSpin;
