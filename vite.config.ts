import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { saveContentPlugin } from "./vite-plugins/saveContent";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), saveContentPlugin()],
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
