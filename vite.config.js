import { defineConfig } from "vite"
import { readFileSync } from "fs"
import path from "path"

export default defineConfig({
    root: "www",
    build: {
        outDir: "../dist",
        emptyOutDir: "../dist",
    },
    server: {
        https: {
            key: readFileSync(path.resolve(__dirname, "localhost-key.pem")),
            cert: readFileSync(path.resolve(__dirname, "localhost.pem")),
        },
        port: 3131,
    },
})
