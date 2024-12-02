const fs = require('fs');

// Function to read the content of the text file and return the lines as an array
function getFileInput() {
    const file = fs.readFileSync('day_2/input.txt', 'utf8'); // Reads the file in synchronous mode
    return file.split('\n'); // Splits the content of the file into lines
}

const linesInput = getFileInput(); // Gets the input from the file

// 1 parte

// Function to check if a single report is safe
function isSafeReport(report) {
    const levels = report.split(' ').map(Number); // Converts the report levels into an array of numbers
    if (levels.length < 2) return false; // If there are fewer than 2 levels, the report cannot be safe

    let isIncreasing = levels[1] > levels[0]; // Determines if the levels start by increasing

    // Iterate through each level to check for safety conditions
    for (let i = 1; i < levels.length; i++) {
        const diff = Math.abs(levels[i] - levels[i - 1]); // Calculates the absolute difference between adjacent levels
        if (diff < 1 || diff > 3) { 
            return false; // If the difference is not valid, the report is not safe
        }
        // Checks if the levels are all increasing or all decreasing
        if ((isIncreasing && levels[i] <= levels[i - 1]) || (!isIncreasing && levels[i] >= levels[i - 1])) {
            return false; // If the order changes, the report is not safe
        }
    }
    return true; // If all conditions are met, the report is safe
}

// Function to count how many reports are safe
function countSafeReports(reports) {
    let safeCount = 0; // Counter for safe reports

    // Iterate through each report and check if it is safe
    for (const report of reports) {
        if (isSafeReport(report)) {
            safeCount++;
        }
    }

    return safeCount; // Returns the number of safe reports
}

console.log(countSafeReports(linesInput));


// 2 parte