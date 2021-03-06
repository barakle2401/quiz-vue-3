import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";

const path = require("path");
export default defineConfig({
  plugins: [eslintPlugin(), vue()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
