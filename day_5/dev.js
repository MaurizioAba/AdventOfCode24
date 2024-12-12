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

//2 parte

// Funzione per ordinare un aggiornamento secondo le regole
function sortUpdate(update, graph) {
    const adjacencyList = new Map();
    const inDegree = new Map();

    update.forEach(page => {
        adjacencyList.set(page, []);
        inDegree.set(page, 0);
    });

    for (const [before, after] of graph.entries()) {
        for (const afterPage of after) {
            if (adjacencyList.has(before) && adjacencyList.has(afterPage)) {
                adjacencyList.get(before).push(afterPage);
                inDegree.set(afterPage, inDegree.get(afterPage) + 1);
            }
        }
    }

    const zeroInDegreeQueue = [];
    inDegree.forEach((degree, page) => {
        if (degree === 0) {
            zeroInDegreeQueue.push(page);
        }
    });

    const sortedUpdate = [];
    while (zeroInDegreeQueue.length > 0) {
        const currentPage = zeroInDegreeQueue.shift();
        sortedUpdate.push(currentPage);

        adjacencyList.get(currentPage).forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                zeroInDegreeQueue.push(neighbor);
            }
        });
    }

    return sortedUpdate;
}


function findMiddlePage(update) {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

function processIncorrectUpdates() {
    const { rules, updates } = getFileInput();
    const graph = buildGraph(rules);
    let sumOfMiddlePages = 0;

    updates.forEach(update => {
        if (!isUpdateValid(update, graph)) {
            const sortedUpdate = sortUpdate(update, graph);
            sumOfMiddlePages += findMiddlePage(sortedUpdate);
        }
    });

    return sumOfMiddlePages;
}

console.log(processIncorrectUpdates());
