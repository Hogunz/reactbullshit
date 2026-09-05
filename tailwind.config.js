import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                // Primary body & UI font
                sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
                inter: ["Inter", "sans-serif"],
                // Monospace for badges, tags, and code
                mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
            },
            colors: {
                dark: {
                    DEFAULT: "#2b2b2b",
                    bg: "#080212",
                    surface: "#120b20",
                    elevated: "#1a102e",
                    muted: "#2b2b2b",
                },
                purple: {
                    ...colors.purple,
                    DEFAULT: "#63307D",
                },
                light: "#f5f5f5",
            },
            listStyleType: {
                square: "square",
                roman: "upper-roman",
            },
        },
    },

    plugins: [forms],
};
