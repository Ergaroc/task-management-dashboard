import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@types": path.resolve(__dirname, "src/types"),
      "@atoms": path.resolve(__dirname, "src/ui/atoms"),
      "@molecules": path.resolve(__dirname, "src/ui/molecules"),
      "@organisms": path.resolve(__dirname, "src/ui/organisms"),
      "@templates": path.resolve(__dirname, "src/ui/templates"),
      "@pages": path.resolve(__dirname, "src/ui/pages"),
    },
  },
});
