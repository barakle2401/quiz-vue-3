import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin(),
    vue(),
    // https://github.com/antfu/unocss
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
