
function getFileInput() {
    const file = require('fs').readFileSync('day_1/input.txt', 'utf8')
    return file.split('\n');
} 

const linesInput = getFileInput("input.txt");

const col1=[];
const col2=[];

for(let i = 0; i < linesInput.length; i++) {
    const [value1, value2] = linesInput[i].split('   ');
    col1.push(value1);
    col2.push(value2);
}

// 1 parte

col1.sort();
col2.sort();

let sum = 0;
for(let i = 0; i < col1.length; i++) {
    const distance = Math.abs(col1[i] - col2[i]);
    sum += distance;
}   

// 2 parte


let scoreresult = 0;

for(let i = 0; i < col1.length; i++) {
    const replication = col2.map((value) => value).filter((value) => value === col1[i]).length;
    scoreresult += col1[i] * replication;
}