import { federation } from "@module-federation/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "currency",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./mount": "./src/main.js",
      },
    }),
  ],
  server: {
    port: 5176,
    strictPort: true,
    origin: "http://localhost:5176",
    cors: true,
  },
  preview: {
    port: 5176,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "chrome89",
  },
});
