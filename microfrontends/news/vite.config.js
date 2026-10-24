import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "news",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./mount": "./src/main.js",
      },
    }),
    vue(),
  ],
  server: {
    port: 5175,
    strictPort: true,
    origin: "http://localhost:5175",
    cors: true,
  },
  preview: {
    port: 5175,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "chrome89",
  },
});
