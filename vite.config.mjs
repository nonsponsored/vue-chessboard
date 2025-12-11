// Import Vite's configuration helper function
import { defineConfig } from 'vite'

// Import the official Vue plugin for Vite
// Enables Vue 3 single-file component (.vue) support
import vue from '@vitejs/plugin-vue'

// Import Node.js path module for cross-platform path resolution
import path from 'path'

// Export Vite configuration
// Note: .mjs extension explicitly marks this as an ES module
export default defineConfig({
  // Set base to your repo name for GitHub Pages
  // Format: '/repo-name/' (with leading and trailing slashes)
  base: '/vue-chessboard/',

  // Register Vue plugin to handle .vue file compilation
  plugins: [vue()],
  
  // Configure module resolution behavior
  resolve: {
    // Define path aliases for cleaner imports
    alias: {
      // Map '@' to the './src' directory
      // Allows imports like: import Foo from '@/components/Foo.vue'
      // Instead of: import Foo from '../../components/Foo.vue'
      '@': path.resolve(__dirname, './src')
    }
  }
})