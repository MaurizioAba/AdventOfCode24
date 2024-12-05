const fs = require('fs');

// Function to read the content of the text file
function getFileInput() {
    const file = fs.readFileSync('day_3/input.txt', 'utf8'); // Reads the file in synchronous mode
    return file;
}

//1 parte

// Function to extract and process valid mul instructions
function extractValidInstructions(input) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g; // Regular expression to find valid mul instructions
    let match;
    let sum = 0;

    while ((match = regex.exec(input)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}

// Read the corrupted memory from the file
//const corruptedMemory = getFileInput();

//2 parte

// Function to extract and process valid mul instructions considering do() and don't() instructions
function extractValidInstructions(input) {
    const regex = /(?:do\(\)|don't\(\))|mul\((\d{1,3}),(\d{1,3})\)/g; // Regex to find do(), don't(), and valid mul instructions
    let match;
    let sum = 0;
    let isEnabled = true; // Initial state is that mul instructions are enabled

    // Iterate through all matches found by the regex
    while ((match = regex.exec(input)) !== null) {
        if (match[0] === 'do()') {
            isEnabled = true; // Enable future mul instructions
        } else if (match[0] === "don't()") {
            isEnabled = false; // Disable future mul instructions
        } else if (isEnabled && match[1] && match[2]) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            sum += x * y;
        }
    }

    return sum;
}


const corruptedMemory = getFileInput();
console.log(extractValidInstructions(corruptedMemory)); // Output the sum of the results of the enabled multiplications
