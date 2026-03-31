import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Default port is 5173, but you can change it to 3000 or any other port
        open: true, // Open the browser automatically
    },
    resolve: {
        alias: {
          'react-native': 'react-native-web',
        },
      },
      optimizeDeps: {
        exclude: ['react-native'],
      },

});