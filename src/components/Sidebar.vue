<template>
  <aside class="sidebar">
    <h2>Clicked Squares</h2>
    <ol>
      <li v-for="(square, index) in selectedSquares" :key="index">{{ square }}</li>
    </ol>
  </aside>
</template>

<script setup lang="ts">
// Import Vue utility for defining component props
import { defineProps } from 'vue'

// Define component props with TypeScript types
// selectedSquares: array of clicked squares in chronological order
const props = defineProps<{ selectedSquares: string[] }>()
</script>

<style>
@layer components {
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 75vh;
    margin-block: auto;
    padding: 1rem;
    
    h2 {
      font-size: 1rem;
      margin-block-end: 1em;
      text-transform: uppercase;
    }
    
    ol {
      flex: 1 1 auto;
      list-style-position: inside;
      margin: unset;
      overflow: auto;
      text-transform: uppercase;
    }
  }
  
  @media (width >= 769px) {
    .sidebar {
      background-color: oklch(1 0 0 / 0.5);
      border-radius: var(--border-radius) 0 0 var(--border-radius);
      box-shadow: 
        0 -1px 4px var(--color-shadow),
        0 1px 4px var(--color-shadow);
    }
  }
}
</style>