import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        // Laracaptcha incluye sus componentes como código fuente: los compila la aplicación.
        alias: {
            '@laracaptcha': new URL('./vendor/edulazaro/laracaptcha/resources/js', import.meta.url).pathname,
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
