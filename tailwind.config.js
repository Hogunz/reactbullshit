import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                mont: ["var(--font-mont)"],
                inter: ["Inter", "sans-serif"],
            },
            colors: {
                dark: "#2b2b2b",
                purple: "#63307D",
                light: "#f5f5f5",
            },
            listStyleType: {
                none: "none",
                disc: "disc",
                decimal: "decimal",
                square: "square",
                roman: "upper-roman",
            },
        },
    },

    plugins: [forms, "flowbite / plugin"],
};
