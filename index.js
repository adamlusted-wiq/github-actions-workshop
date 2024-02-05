/**
 * Solves a Sudoku puzzle.
 *
 * @param {Array<Array<number>>} board The Sudoku puzzle to solve.
 * @return {boolean} True if the puzzle was solved, false otherwise.
 */
function solveSudoku(board) {
  /**
   * Checks if the board is valid.
   *
   * @param {Array<Array<number>>} board The Sudoku puzzle to check.
   * @return {boolean} True if the board is valid, false otherwise.
   */
  function isValidSudoku(board) {
    // Check each row
    for (let i = 0; i < 9; i++) {
      const row = board[i];
      if (!isValidRow(row)) {
        return false;
      }
    }

    // Check each column
    for (let j = 0; j < 9; j++) {
      const column = [];
      for (let i = 0; i < 9; i++) {
        column.push(board[i][j]);
      }
      if (!isValidRow(column)) {
        return false;
      }
    }

    // Check each 3x3 box
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const box = [];
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            box.push(board[i * 3 + k][j * 3 + l]);
          }
        }
        if (!isValidRow(box)) {
          return false;
        }
      }
    }

    // If we reach this point, then the board is valid
    return true;
  }

  /**
   * Checks if a row is valid.
   *
   * @param {Array<number>} row The row to check.
   * @return {boolean} True if the row is valid, false otherwise.
   */
  function isValidRow(row) {
    // Check if each value in the row is unique
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      const value = row[i];
      if (value !== 0 && seen.has(value)) {
        return false;
      }
      seen.add(value);
    }

    // If we reach this point, then the row is valid
    return true;
  }

  /**
   * Checks if a value is valid for a given cell.
   *
   * @param {Array<Array<number>>} board The Sudoku puzzle.
   * @param {number} i The row of the cell.
   * @param {number} j The column of the cell.
   * @param {number} value The value to check.
   * @return {boolean} True if the value is valid, false otherwise.
   */
  function isValidValue(board, i, j, value) {
    // Check if the value is already in the row
    for (let k = 0; k < 9; k++) {
      if (board[i][k] === value) {
        return false;
      }
    }

    // Check if the value is already in the column
    for (let k = 0; k < 9; k++) {
      if (board[k][j] === value) {
        return false;
      }
    }

    // Check if the value is already in the 3x3 box
    const boxI = Math.floor(i / 3) * 3;
    const boxJ = Math.floor(j / 3) * 3;
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        if (board[boxI + k][boxJ + l] === value) {
          return false;
        }
      }
    }

    // If we reach this point, then the value is valid
    return true;
  }

  // Start at the top-left corner and recursively fill in the board
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        // Try each possible value for the cell
        for (let k = 1; k <= 9; k++) {
          if (isValidValue(board, i, j, k)) {
            board[i][j] = k;
            if (solveSudoku(board)) {
              return true;
            }
            board[i][j] = 0;
          }
        }

        // If no possible value works, then the board is unsolvable
        return false;
      }
    }
  }

  // If we reach this point, then the board is solved
  return true;
}
