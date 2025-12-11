// Import the Vue createApp function to initialize the application
import { createApp } from 'vue'

// Import the root App component that contains the entire application
import App from '@/App.vue'

// Import global CSS styles including reset, base, and utility classes
import '@/style.css'

// Create a new Vue application instance with App as the root component
// and mount it to the DOM element with id="app" in index.html
createApp(App).mount('#app')