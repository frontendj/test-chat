import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "components": path.resolve(__dirname, "./src/components/"),
            "containers": path.resolve(__dirname, "./src/containers/"),
            "utils": path.resolve(__dirname, "./src/utils/"),
            "styles": path.resolve(__dirname, "./src/styles/"),
        },
    },
    plugins: [react()],
    root: 'src',
});
