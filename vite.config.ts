import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@queries": path.resolve(__dirname, "src/queries"),
      "@components": path.resolve(__dirname, "src/components"),
      "@api": path.resolve(__dirname, "src/api"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
});
