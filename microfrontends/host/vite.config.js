import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    federation({
      name: "host",
      filename: "remoteEntry.js",
      dts: false,
      remotes: {
        calculator: {
          type: "module",
          name: "calculator",
          entry: "http://localhost:5174/remoteEntry.js",
        },
        news: {
          type: "module",
          name: "news",
          entry: "http://localhost:5175/remoteEntry.js",
        },
        currency: {
          type: "module",
          name: "currency",
          entry: "http://localhost:5176/remoteEntry.js",
        },
      },
    }),
    vue(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    origin: "http://localhost:5173",
    cors: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "chrome89",
  },
});
