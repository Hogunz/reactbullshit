export default function ButtonLink() {
    return (
        <>
            <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-dark border rounded-lg bg-light dark:bg-transparent dark:text-light hover:bg-purple hover:text-light dark:hover:bg-purple dark:hover:text-dark hover:border-purple  transition duration-300 ease-in-out focus:ring-4 dark:focus:ring-light focus:ring-purple"
            >
                View More
                <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </button>
        </>
    );
}
