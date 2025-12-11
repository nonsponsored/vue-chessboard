<template>
  <section class="chessboard">
    <button
      v-for="square in board"
      :key="square.id"
      class="chessboard__square"
      @click="selectSquare(square.id)"
      :aria-pressed="selectedSquare === square.id"
    >
      <span class="visually-hidden">{{ square.id }}</span>
    </button>
  </section>
</template>

<script setup lang="ts">
// Import Vue utilities for component props and events
import { defineProps, defineEmits } from 'vue'

// Import the composable that generates the chessboard data
import { useChessboard } from '@/composables/useChessboard'

// Define component props with TypeScript types
// selectedSquare: tracks which square is currently highlighted
const props = defineProps<{ selectedSquare: string | null }>()

// Define component events with TypeScript types
// Emits 'square-clicked' event when a square is clicked
const emit = defineEmits<{ (e: 'square-clicked', square: string): void }>()

// Get the board data (64 squares with algebraic notation)
const { board } = useChessboard()

/**
 * Handle square button clicks
 * Emits an event to the parent component with the clicked square's id
 * 
 * @param id - The algebraic notation of the clicked square
 */
function selectSquare(id: string) {
  emit('square-clicked', id)
}
</script>

<style>
@layer components {
  .chessboard {
    aspect-ratio: 1/1;
    box-shadow: 0 5px 8px var(--color-shadow);
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    margin: auto; 
  }
  
  @media (width <= 768px) {
    .chessboard {
      width: min(calc(90vw - 1rem), 75vh);
    }
  }
  
  @media (width >= 769px) {
    .chessboard {
      /* Account for sidebar (300px) + gap (1rem) + padding (1rem) */
      width: min(calc(100vw - var(--width-sidebar) - 2rem), calc(100vh - 4rem));
    }
  }
  
  .chessboard__square {
    background-color: var(--color-light);
    border: 0;
    cursor: pointer;
    padding: 0;
    position: relative;
  }

  .chessboard__square:nth-child(16n + 2),
  .chessboard__square:nth-child(16n + 4),
  .chessboard__square:nth-child(16n + 6),
  .chessboard__square:nth-child(16n + 8),
  .chessboard__square:nth-child(16n + 9),
  .chessboard__square:nth-child(16n + 11),
  .chessboard__square:nth-child(16n + 13),
  .chessboard__square:nth-child(16n + 15) {
    background-color: var(--color-dark);
  }
  
  /* Transitioning opacity on pseudo element is more performant that transitioning background-color and box-shadow. */
  .chessboard__square::before {
    background-color: var(--color-active);
    content: '';
    display: block;
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 300ms ease-in-out;
  }

  /* Selected state */
  .chessboard__square[aria-pressed='true']::before {
    box-shadow: inset 2px 5px 5px var(--color-shadow);
    opacity: 1;
  }

  /* Keyboard focus */
  .chessboard__square:focus-visible {
    box-shadow: inset 0 0 0 3px oklch(0.5 0.2 250);
    outline: none;
    z-index: 1;
  }
}
</style>