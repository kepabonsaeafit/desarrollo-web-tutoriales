import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "calculator",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./mount": "./src/main.jsx",
      },
    }),
  ],
  esbuild: {
    jsx: "automatic",
  },
  server: {
    port: 5174,
    strictPort: true,
    origin: "http://localhost:5174",
    cors: true,
  },
  preview: {
    port: 5174,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "chrome89",
  },
});
