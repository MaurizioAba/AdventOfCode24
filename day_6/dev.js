const fs = require('fs');


function getFileInput() {
    const file = fs.readFileSync('day_6/input.txt', 'utf8');
    return file.split('\n').map(line => line.split(''));
}

// Function to simulate the guard's movements
function simulateGuardMovement(map) {
    const directions = ['^', '>', 'v', '<']; // 0 = up, 1 = right, 2 = down, 3 = left
    const moves = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    };
    const n = map.length;
    const m = map[0].length;
    let x, y, dir;

   // Find the initial position and direction of the guard
    outer: for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (directions.includes(map[i][j])) {
                x = i;
                y = j;
                dir = map[i][j];
                break outer;
            }
        }
    }

    const visited = new Set();
    visited.add(`${x},${y}`);

    while (true) {
        const [dx, dy] = moves[dir];
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= n || ny >= m) {
           // The guard has left the mapped area
            break;
        }

        if (map[nx][ny] === '#') {
            // Turn right 90 degrees
            dir = directions[(directions.indexOf(dir) + 1) % 4];
        } else {
            // Take a step forward
            x = nx;
            y = ny;
            visited.add(`${x},${y}`);
        }
    }

    return visited.size;
}

const map = getFileInput();
const result = simulateGuardMovement(map);
//console.log(`The guard will visit ${result} distinct positions before leaving the mapped area.`);


//2 parte

// Function to simulate the guard's movements and detect loops
function simulateGuardMovementWithCycleDetection(map, obstruction) {
    const directions = ['^', '>', 'v', '<']; // 0 = up, 1 = right, 2 = down, 3 = left
    const moves = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    };
    const n = map.length;
    const m = map[0].length;
    let x, y, dir;

    // Find the initial position and direction of the guard
    outer: for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (directions.includes(map[i][j])) {
                x = i;
                y = j;
                dir = map[i][j];
                break outer;
            }
        }
    }

    const visited = new Set();
    const cycleCheck = new Map();
    visited.add(`${x},${y}`);
    cycleCheck.set(`${x},${y}`, dir);

    while (true) {
        const [dx, dy] = moves[dir];
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= n || ny >= m) {
            // The guard has left the mapped area
            break;
        }

        if ((nx === obstruction[0] && ny === obstruction[1]) || map[nx][ny] === '#') {
            // Turn right 90 degrees
            dir = directions[(directions.indexOf(dir) + 1) % 4];
        } else {
            // Take a step forward
            x = nx;
            y = ny;
            const position = `${x},${y}`;
            visited.add(position);

            if (cycleCheck.has(position) && cycleCheck.get(position) === dir) {
                // A loop is detected
                return { visited, loopDetected: true };
            }
            cycleCheck.set(position, dir);
        }
    }

    return { visited, loopDetected: false };
}

// Function to find possible positions for an obstruction
function findObstructionPositions(map) {
    const { visited, initialPosition } = simulateGuardMovementWithCycleDetection(map, [-1, -1]);
    const obstructionPositions = new Set();

    visited.forEach(pos => {
        const [x, y] = pos.split(',').map(Number);
        if (pos !== initialPosition) {
            const { loopDetected } = simulateGuardMovementWithCycleDetection(map, [x, y]);
            if (loopDetected) {
                obstructionPositions.add(pos);
            }
        }
    });

    return obstructionPositions.size;
}


const result2 = findObstructionPositions(map);
console.log(`You could choose ${result2} different positions for the new obstruction.`);
