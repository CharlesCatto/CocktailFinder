import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path"; // Correction avec le préfixe node:
import svgr from "vite-plugin-svgr";

export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "dist",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
			},
		},
	},
	base: "/", // Important pour Vercel
});
