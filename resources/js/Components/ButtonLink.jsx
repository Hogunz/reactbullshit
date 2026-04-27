export default function ButtonLink() {
    return (
        <>
            <button
                type="button"
                className="inline-flex justify-center items-center py-3 px-8 text-base font-bold text-white rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all duration-300 group"
            >
                View More
                <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
