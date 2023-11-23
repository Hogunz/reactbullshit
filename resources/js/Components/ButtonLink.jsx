export default function ButtonLink() {
    return (
        <>
            <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-light border rounded-lg bg-purple hover:bg-light hover:text-purple hover:border-purple  transition duration-300 ease-in-out focus:ring-4 focus:ring-purple"
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
