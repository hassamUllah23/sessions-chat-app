import { defineConfig } from "vite";
import * as tailwindcss from "tailwindcss";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
