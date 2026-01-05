import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        warmup: {
            clientFiles: [
                'resources/js/app.jsx',
                'resources/js/Pages/**/*.jsx',
            ],
        },
    },
    optimizeDeps: {
        include: [
            '@material-tailwind/react',
            'framer-motion',
            'react-dom/client',
            '@inertiajs/react',
        ],
    },
});
