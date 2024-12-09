const fs = require('fs');

// Function to read the content of the text file
function getFileInput() {
    const file = fs.readFileSync('day_4/input.txt', 'utf8'); // Replace with the actual path to your input file
    return file.split('\n').map(line => line.trim()); // Split the file content into lines and trim whitespace
}

// Function to find all occurrences of "XMAS" in all directions
function findAllXMAS(grid) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1], // Right, Down, Diagonal Right-Down, Diagonal Right-Up
        [0, -1], [-1, 0], [-1, -1], [-1, 1] // Left, Up, Diagonal Left-Up, Diagonal Left-Down
    ];
    const target = "XMAS";
    const targetLength = target.length;
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < rows && y < cols;
    }

    function searchFrom(x, y) {
        for (const [dx, dy] of directions) {
            let nx = x, ny = y;
            let found = true;
            for (let k = 0; k < targetLength; k++) {
                if (!isValid(nx, ny) || grid[nx][ny] !== target[k]) {
                    found = false;
                    break;
                }
                nx += dx;
                ny += dy;
            }
            if (found) {
                count++;
            }
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 'X') {
                searchFrom(i, j);
            }
        }
    }

    return count;
}

//const grid = getFileInput();
//console.log(findAllXMAS(grid));


//2 parte
// Function to find all occurrences of X-MAS in the shape of an X
function findAllXMAStwoparts(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < rows && y < cols;
    }

    function checkXMAS(x, y) {
        const patterns = [
            [[0, 0], [1, 1], [2, 2], [0, 2], [1, 1], [2, 0]], 
            [[0, 2], [1, 1], [2, 0], [0, 0], [1, 1], [2, 2]], 
            [[2, 0], [1, 1], [0, 2], [2, 2], [1, 1], [0, 0]], 
            [[0, 0], [1, 1], [2, 2], [0, 2], [1, 1], [2, 0]]
        ];
        
        const expectedChars = [
            ['M', 'A', 'S', 'M', 'A', 'S'],
            ['S', 'A', 'M', 'S', 'A', 'M'],
            ['S', 'A', 'M', 'M', 'A', 'S'],
            ['M', 'A', 'S', 'S', 'A', 'M']
        ];
        

        return patterns.some((pattern, patternIndex) => pattern.every(([dx, dy], index) => {
            const nx = x + dx;
            const ny = y + dy;
            const expectedChar = expectedChars[patternIndex][index];
            return isValid(nx, ny) && grid[nx][ny] === expectedChar;
        }));
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 'M' || grid[i][j] === 'S' || grid[i][j] === 'A') {
                if (checkXMAS(i, j)) {
                    count++;
                }
            }
        }
    }

    return count;
}


//const grid = getFileInput();
//console.log(findAllXMAStwoparts(grid));
