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
      includeAssets: ["vite.svg"],
      manifest: {
        name: "dnd",
        short_name: "dnd",
        description: "Edited dnd spells",
        theme_color: "#ffffff",
        icons: [
          {
            src: "vite.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "vite.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
});
