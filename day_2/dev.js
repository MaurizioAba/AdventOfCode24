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

// 2 parte

// Function to check if a report becomes safe after removing one level
function isSafeWithRemoval(levels) {
    for (let i = 0; i < levels.length; i++) {
        const modifLevels = levels.slice(0, i).concat(levels.slice(i + 1)); // Remove one level
        if (isSafeReport(modifLevels.join(' '))) {
            return true; // If removing one level makes it safe, return true
        }
    }
    return false; // If no single removal makes it safe, return false
}

// Function to count how many reports are safe considering the Problem Dampener
function countSafeReportsWithDampener(reports) {
    let safeCount = 0; // Counter for safe reports

    for (const report of reports) {
        const levels = report.split(' ').map(Number);
        if (isSafeReport(report) || isSafeWithRemoval(levels)) { // Check if the report is safe or becomes safe with removal
            safeCount++; // Increment the counter if the report is safe
        }
    }

    return safeCount; // Returns the number of safe reports
}

