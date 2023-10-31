import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      includeAssets: ["dnd.svg"],
      manifest: {
        name: "dnd",
        short_name: "dnd",
        description: "Edited dnd spells",
        theme_color: "#1a7aab",
        background_color: "#1a7aab",
        icons: [
          {
            src: "dnd.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "dnd.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
});
