export function generateSudokuBoard(): number[][] {
    // Initialize empty 9x9 Sudoku board
    const board: number[][] = [];
    for (let i = 0; i < 9; i++) {
        board.push(new Array(9).fill(0));
    }

    // Populate the board with random numbers (1-9) in each row, ensuring validity
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let isValid = false;
            while (!isValid) {
                const num = Math.floor(Math.random() * 9) + 1;
                if (isValidPlacement(board, row, col, num)) {
                    board[row][col] = num;
                    isValid = true;
                }
            }
        }
    }

    return board;
}

export function isValidPlacement(board: number[][], row: number, col: number, num: number): boolean {
    // Check if the number already exists in the row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    // Check if the number already exists in the column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check if the number already exists in the 3x3 subgrid
    const subgridRowStart = Math.floor(row / 3) * 3;
    const subgridColStart = Math.floor(col / 3) * 3;
    for (let i = subgridRowStart; i < subgridRowStart + 3; i++) {
        for (let j = subgridColStart; j < subgridColStart + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    // If all conditions are met, the placement is valid
    return true;
}

export function generateUnsolvedSudokuBoard(): number[][] {
    // Generate a complete solved Sudoku board
    const solvedBoard = generateSudokuBoard();

    // Clone the solved board to avoid modifying it directly
    const unsolvedBoard: number[][] = solvedBoard.map(row => row.slice());
    // const unsolvedBoard: number[][] = [
    //     [5, 3, 0, 0, 7, 0, 0, 0, 0],
    //     [6, 0, 0, 1, 9, 5, 0, 0, 0],
    //     [0, 9, 8, 0, 0, 0, 0, 6, 0],
    //     [8, 0, 0, 0, 6, 0, 0, 0, 3],
    //     [4, 0, 0, 8, 0, 3, 0, 0, 1],
    //     [7, 0, 0, 0, 2, 0, 0, 0, 6],
    //     [0, 6, 0, 0, 0, 0, 2, 8, 0],
    //     [0, 0, 0, 4, 1, 9, 0, 0, 5],
    //     [0, 0, 0, 0, 8, 0, 0, 7, 9]
    // ];

    // Determine the number of cells to remove to make the puzzle
    const numCellsToRemove = Math.floor(Math.random() * 20) + 40; // Adjust the range as needed

    // Randomly remove numbers while ensuring the puzzle remains solvable
    for (let i = 0; i < numCellsToRemove; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 9);
            col = Math.floor(Math.random() * 9);
        } while (unsolvedBoard[row][col] === 0); // Skip already empty cells

        // Temporarily remove the number
        const temp = unsolvedBoard[row][col];
        unsolvedBoard[row][col] = 0;

        // Check if the puzzle remains solvable
        if (!isSolvable(unsolvedBoard)) {
            // If not solvable, restore the removed number
            unsolvedBoard[row][col] = temp;
        }
    }

    return unsolvedBoard;
}

export function isSolvable(board: number[][]): boolean {
    // Implement a Sudoku solver algorithm here
    // For simplicity, let's assume all generated boards are solvable for now
    return true;
}


