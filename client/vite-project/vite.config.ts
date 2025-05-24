import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "node:path";

export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		// Configuration pour éviter les CORS en développement
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
});
