/**
 * Composable function to generate chessboard data
 * 
 * Creates a flat array of 64 squares representing an 8x8 chessboard,
 * with each square labeled in standard algebraic notation (e.g., a1, e4, h8)
 * 
 * @returns Object containing the board array with square data
 */
export function useChessboard() {
  // Generate 64 squares (8 rows × 8 columns) using Array.from
  const board = Array.from({ length: 64 }, (_, index) => {
    // Calculate the file (column) letter from a-h
    // index % 8 gives 0-7, adding 97 (ASCII code for 'a') gives a-h
    const file = String.fromCharCode(97 + (index % 8)) // a-h
    
    // Calculate the rank (row) number from 8-1
    // Chessboards are numbered 8 (top) to 1 (bottom)
    // Math.floor(index / 8) gives row 0-7, subtract from 8 to reverse
    const rank = 8 - Math.floor(index / 8) // 8-1
    
    // Return square object with algebraic notation id and original index
    return { id: `${file}${rank}`, index }
  })

  // Return the board data wrapped in an object for composable pattern
  return { board }
}