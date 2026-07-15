import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(import.meta.dirname, "../lib/templates/dashboard-app"),
    lib: {
      entry: resolve(import.meta.dirname, "src/main.tsx"),
      formats: ["es"],
      fileName: () => "dashboard.js",
      cssFileName: "dashboard"
    },
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]"
      }
    }
  }
});
