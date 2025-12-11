<template>
  <main>
    <Chessboard 
      :selectedSquare="selectedSquare" 
      @square-clicked="handleSquareClick" 
    />
    <Sidebar :selectedSquares="history" />
  </main>
</template>

<script setup lang="ts">
// Import Vue's reactivity ref for state management
import { ref } from 'vue'

// Import child components
import Chessboard from '@/components/Chessboard.vue'
import Sidebar from '@/components/Sidebar.vue'

// Track the currently selected square (null when nothing is selected)
const selectedSquare = ref<string | null>(null)

// Maintain an ordered list of all clicked squares
const history = ref<string[]>([])

/**
 * Handle square click events from the Chessboard component
 * Updates the selected square and adds it to the history
 * 
 * @param square - The algebraic notation of the clicked square (e.g., 'e4')
 */
function handleSquareClick(square: string) {
  // Update the currently selected square for visual highlighting
  selectedSquare.value = square
  
  // Only add to history if it's different from the last clicked square
  // This prevents duplicate consecutive entries from double-clicks
  if (history.value[history.value.length - 1] !== square) {
    history.value.push(square)
    
    // Limit history to 1000 entries to prevent unbounded memory growth
    // Removes the oldest entry when limit is reached (FIFO queue behavior)
    if (history.value.length > 1000) {
      history.value.shift()
    }
  }
}
</script>

<style>
@layer base {
  main {
    display: grid;
    grid-template-columns: 1fr var(--width-sidebar);
    gap: 1rem;
    height: 100%;
    justify-content: center;
  }
  
  @media (width <= 768px) {
    main {
      align-content: flex-start;
      grid-template-columns: calc(100vw - 1rem);
      grid-template-rows: auto auto;
      padding-block-start: 1.5rem;
    }
  }
  
  @media (width >= 769px) {
    main {
      padding-inline-start: 1rem;
    }
  }
}
</style>