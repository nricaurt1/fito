import { defineConfig } from "vite"

export default defineConfig({
    root: "www",
    build: {
        outDir: "../dist",
        emptyOutDir: "../dist",
    },
    server: {port: 3131},
})
