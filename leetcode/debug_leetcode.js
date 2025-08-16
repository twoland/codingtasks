/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
    if (!board || !board.length || !board[0].length) return -1;

    const rows = board.length;
    const cols = board[0].length;

    const getHorizontalDirection = (row) => {
        return ((rows - 1 - row) % 2 === 0) ? 1 : -1; // -1 for right-to-left
    }

    const getRC = (cell) => {
        let row = rows - Math.ceil(cell / cols);
        let col = (cell - 1) % cols;
        // Reversing cell column for odd rows (counting from bottom)
        if (getHorizontalDirection(row) === -1) col = cols - 1 - col;

        return [row, col];
    }

    const startCell = 1;
    const queue = [startCell];

    const visited = new Set();
    visited.add(startCell);

    let moves = -1;

    while (queue.length > 0) {
        moves++;

        const moveOptions = queue.length;

        for (let i = 0; i < moveOptions; i++) {
            const cell = queue.shift();

            if (cell === rows * cols) {
                return moves;
            }

            const [row, col] = getRC(cell);

            if (board[row][col] === -1) {
                for (let next = cell + 1; next <= Math.min(cell + 6, rows * cols); next++) {
                    if (!visited.has(next)) {
                        queue.push(next);
                        visited.add(next);
                    }
                }
            }
            else {
                const next = board[row][col];
                if (!visited.has(next)) {
                    queue.push(next);
                    visited.add(next);
                }
            }
        }
    }

    return -1;
};


const executionStart = Date.now();

//----------------------------------------------------------

const board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]

const result = snakesAndLadders(board);
console.log(result);

//----------------------------------------------------------

const executionEnd = Date.now();
console.log(`Execution Time: ${(executionEnd - executionStart)} ms`);
