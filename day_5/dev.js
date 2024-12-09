const fs = require('fs');

// Function to read the content of the text file
function getFileInput() {
    const file = fs.readFileSync('day_5/input.txt', 'utf8');
    const [rulesPart, updatesPart] = file.trim().split('\n\n');
    const rules = rulesPart.split('\n').map(rule => rule.split('|').map(Number));
    const updates = updatesPart.split('\n').map(update => update.split(',').map(Number));
    return { rules, updates };
}

// Function to build the dependency graph
function buildGraph(rules) {
    const graph = new Map();
    rules.forEach(([before, after]) => {
        if (!graph.has(before)) graph.set(before, []);
        graph.get(before).push(after);
    });
    return graph;
}

// Function to check if an update respects the order rules
function isUpdateValid(update, graph) {
    const positions = new Map();
    update.forEach((page, index) => positions.set(page, index));
    for (const [before, after] of graph.entries()) {
        for (const afterPage of after) {
            if (positions.has(before) && positions.has(afterPage) && positions.get(before) > positions.get(afterPage)) {
                return false;
            }
        }
    }
    return true;
}

// Function to find the middle page number
function findMiddlePage(update) {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

// Main function to process the input and calculate the result
function processUpdates() {
    const { rules, updates } = getFileInput();
    const graph = buildGraph(rules);
    let sumOfMiddlePages = 0;

    updates.forEach(update => {
        if (isUpdateValid(update, graph)) {
            sumOfMiddlePages += findMiddlePage(update);
        }
    });

    return sumOfMiddlePages;
}

//console.log(processUpdates());
