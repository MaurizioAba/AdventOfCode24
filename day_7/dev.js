const fs = require('fs');

function getFileInput(filePath) {
    const file = fs.readFileSync('day_7/input.txt', 'utf8');
    return file.split('\n').filter(line => line.trim() !== '');
}

// To evaluate a combination of operators
function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        }
    }
    return result;
}

// Generate all possible combinations of operators
function* generateOperatorCombinations(numOperators) {
    const operators = ['+', '*', '||'];
    const stack = [[]];
    while (stack.length) {
        const combination = stack.pop();
        if (combination.length === numOperators) {
            yield combination;
        } else {
            for (const operator of operators) {
                stack.push([...combination, operator]);
            }
        }
    }
}

// solve the problem
function solve(filePath) {
    const lines = getFileInput(filePath);
    let totalCalibrationResult = 0;

    for (const line of lines) {
        const [testValue, numbersString] = line.split(': ');
        const numbers = numbersString.split(' ').map(Number);
        const target = parseInt(testValue, 10);

        const numOperators = numbers.length - 1;
        let foundValidCombination = false;

        for (const operators of generateOperatorCombinations(numOperators)) {
            const result = evaluateExpression(numbers, operators);
            if (result === target) {
                totalCalibrationResult += target;
                foundValidCombination = true;
                break;
            }
        }
    }

    //console.log(`Il risultato totale delle calibrazioni è: ${totalCalibrationResult}`);
}
solve('path/to/your/input.txt');


//2 parte
function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else if (operators[i] === '||') {
            result = parseInt('' + result + numbers[i + 1]);
        }
    }
    return result;
}

