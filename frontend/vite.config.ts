import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: "buffer",
      process: "process/browser", // safe alias
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: [
      "buffer",
      "process",
      "util",
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-react-ui",
    ],
    esbuildOptions: {
      define: { global: "globalThis" },
    },
  },
  define: {
    "process.env": {}, // some deps read it
  },
});
