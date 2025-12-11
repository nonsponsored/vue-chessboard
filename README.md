# Vue Chessboard

A responsive chessboard interface built with Vue 3, TypeScript, and Vite. This project demonstrates a clean, accessible implementation of an interactive chessboard with click tracking.

**Important:** The code is being deployed directly to GitHub pages, which cannot utilize the standard 'dist' folder unless you use GitHub Actions. So the 'docs' folder is what contains the compiled code.


## Features

- **Responsive Design**: Adapts layout for desktop and mobile viewports
  - Desktop: Sidebar positioned to the right of the board
  - Mobile: Sidebar positioned below the board
- **Interactive Chessboard**: Click squares to highlight and track selections
- **Click History**: Maintains an ordered list of clicked squares in the sidebar
- **Accessibility**: Uses semantic HTML and ARIA attributes for screen readers
- **CSS Layers**: Organized styling using CSS cascade layers
- **Performance Optimized**: 
  - Prevents duplicate consecutive square selections
  - Limits history to 1000 entries to prevent memory issues

## Tech Stack

- **Vue 3** (Composition API with `<script setup>`)
- **TypeScript** for type safety
- **Vite** for fast development and building
- **CSS Cascade Layers** for maintainable styling

## Project Structure

```
vue-chessboard/
├── index.html                # Entry point (must be at root for Vite)
├── package.json
├── public/                   # Static assets (not processed by Vite)
│   └── favicon.ico
│   └── favicon.svg
├── README.md
├── src/
│   ├── App.vue               # Root component with layout
│   ├── assets/               # Processed assets (optimized by Vite)
│   │   └── images/           # (add image folders as needed)
│   ├── components/
│   │   ├── Chessboard.vue    # Main chessboard component
│   │   └── Sidebar.vue       # History tracking sidebar
│   ├── composables/
│   │   └── useChessboard.ts  # Chessboard data generation
│   ├── main.ts               # Vue app initialization
│   └── style.css             # Global styles with CSS layers
├── vite.config.mjs
└── tsconfig.json             # TypeScript configuration
```

### Asset Organization

**`public/` folder**: Static assets served as-is (not processed by Vite)
- Use for: favicon, robots.txt, files that need exact names
- Access via: `/filename.ext` (absolute path)

**`src/assets/` folder**: Dynamic assets processed by Vite (optimized, hashed, bundled)
- Use for: images, icons, fonts used in components
- Access via: `import img from '@/assets/image.png'` or `<img src="@/assets/image.png" />`

**`index.html` location**: Must stay at project root (Vite requirement, different from Vue CLI)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

### Chessboard Generation

The chessboard is generated as a flat array of 64 squares, mapped to algebraic notation (a1-h8). Each square knows its file (column a-h) and rank (row 1-8).

### Layout System

- Uses CSS Grid for responsive layout
- Desktop: Two-column grid with sidebar at 300px fixed width
- Mobile: Single-column grid with sidebar below board
- Board scales to fill available space while maintaining 1:1 aspect ratio

### Click Tracking

- Each square click updates the selected state
- History array stores clicked squares in order
- Prevents duplicate consecutive entries
- Displays in scrollable sidebar list

## Known Limitations & Notes

### Theme Support

The CSS is structured to support light/dark themes using `light-dark()` and `color-scheme`, but **dark theme colors are not currently configured**. To implement:

1. Add dark mode color values in the `html` selector in `style.css`
2. Update the `@media (prefers-color-scheme: dark)` block

**Note on CSS Variables**: This project defines CSS custom properties on the `html` element rather than `:root`. While `:root` and `html` are often treated as equivalent, `:root` has higher specificity (0,0,1 vs 0,0,0) and can behave differently in edge cases. Modern best practice is to use `html` for global variables, as it's more semantically accurate and avoids potential specificity conflicts.

### Mobile Sidebar Visibility

On mobile, the sidebar is intentionally kept partially visible at the bottom of the viewport to indicate additional content. **This design choice depends on your use case**:

- **Current approach**: Shows some of the sidebar, encouraging users to scroll
- **Alternative**: Could use full viewport height with proper scrolling
- **Consideration**: Adjust based on whether click history is primary or secondary information

### Responsive Sizing

The chessboard uses:
- Desktop: `min(calc(100vw - var(--width-sidebar) - 2rem), calc(100vh - 4rem))` to fit within viewport
- Mobile: `min(calc(90vw - 1rem), 75vh)` for comfortable touch targets

These values balance readability with responsive behavior but can be adjusted based on design requirements.

### History Management

- Click history is capped at 1000 entries to prevent unbounded memory growth
- This limit can be adjusted in `App.vue` based on expected usage patterns
- Consider implementing a "clear history" button for long sessions

## Configuration Notes

### Vite Config Extension

The `vite.config.mjs` extension is correct. Vite supports both `.js` and `.mjs` extensions. Using `.mjs` explicitly marks the file as an ES module, which is preferred for modern Node.js environments.

### Path Alias

The `@` alias is configured to point to `./src`, allowing clean imports:

```typescript
import Chessboard from '@/components/Chessboard.vue'
```

## Customization

### Board Colors

Update CSS custom properties in `style.css`:

```css
--color-active: oklch(0.716 0.148 131.5);  /* Highlighted square */
--color-dark: oklch(0.25 0.02 0);          /* Dark squares */
--color-light: oklch(0.98 0 0);            /* Light squares */
```

### Breakpoint

Adjust the responsive breakpoint in component styles (currently 768px/769px).

### Sidebar Width

Change the sidebar width in `App.vue`:

```css
grid-template-columns: 1fr var(--width-sidebar); /* Adjust var(--width-sidebar) in styles.css */
```

Then update the chessboard calculation accordingly.

## Accessibility Features

- Semantic HTML elements (`<main>`, `<section>`, `<aside>`)
- ARIA attributes (`aria-pressed` for square selection state)
- Visually hidden labels for screen readers
- Keyboard navigation support through native `<button>` elements
- Proper heading hierarchy

## Browser Support

Modern browsers supporting:
- CSS Grid
- CSS Cascade Layers
- CSS `light-dark()` function
- ES6+ JavaScript features
- Vue 3 requirements

## License

MIT 