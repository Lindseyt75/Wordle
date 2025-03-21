import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',  // This ensures Vite will start the project from the src folder
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],  // Allow JSX in .js files
  },
  test: {
    globals: true,
  },
});
