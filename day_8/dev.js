const fs = require('fs');

function getFileInput() {
    const file = fs.readFileSync('day_8/input.txt', 'utf8');
    return file.split('\n').map(line => line.split(''));
}
function calculateImpact(map) {
    const rows = map.length;
    const cols = map[0].length;
    const antennas = {};

   // Find all antenna positions
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = map[r][c];
            if (cell !== '.') {
                if (!antennas[cell]) {
                    antennas[cell] = [];
                }
                antennas[cell].push([r, c]);
            }
        }
    }

    const antinodes = new Set();

    // Find the antinodes for each frequency
    for (const key in antennas) {
        const positions = antennas[key];
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const [r1, c1] = positions[i];
                const [r2, c2] = positions[j];

                // Find the antinodes for each frequency
                if (r1 === r2) {
                    const dist = Math.abs(c1 - c2);
                    if (dist % 2 === 0) {
                        const midC = (c1 + c2) / 2;
                        if (Number.isInteger(midC)) {
                            antinodes.add(`${r1},${midC}`);
                        }
                    }
                    const doubleDistC1 = c1 + (c1 - c2);
                    const doubleDistC2 = c2 + (c2 - c1);
                    if (doubleDistC1 >= 0 && doubleDistC1 < cols) {
                        antinodes.add(`${r1},${doubleDistC1}`);
                    }
                    if (doubleDistC2 >= 0 && doubleDistC2 < cols) {
                        antinodes.add(`${r1},${doubleDistC2}`);
                    }
                }

                // Calcola antinodi verticali
                if (c1 === c2) {
                    const dist = Math.abs(r1 - r2);
                    if (dist % 2 === 0) {
                        const midR = (r1 + r2) / 2;
                        if (Number.isInteger(midR)) {
                            antinodes.add(`${midR},${c1}`);
                        }
                    }
                    const doubleDistR1 = r1 + (r1 - r2);
                    const doubleDistR2 = r2 + (r2 - r1);
                    if (doubleDistR1 >= 0 && doubleDistR1 < rows) {
                        antinodes.add(`${doubleDistR1},${c1}`);
                    }
                    if (doubleDistR2 >= 0 && doubleDistR2 < rows) {
                        antinodes.add(`${doubleDistR2},${c1}`);
                    }
                }
            }
        }
    }

    // Find the antinodes for each frequency
    for (const key in antennas) {
        const positions = antennas[key];
        for (const [r, c] of positions) {
            antinodes.add(`${r},${c}`);
        }
    }

    return antinodes.size;
}

function solve() {
    const map = getFileInput();
    const result = calculateImpact(map);
    console.log(`Il numero di posizioni uniche che contengono un antinodo è: ${result}`);
}


//solve('path/to/your/input.txt');
