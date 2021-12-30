'use strict'

import { myEvaluate } from "./calcFunctions.js";

const nums = '0123456789';
const ops = '+-*/^';
// unary negation, parentheses, and decimal numbers are special cases
const uniqueOps = '~.()';

const funcs = ['sin(', 'cos(', 'tan(', 'csc(', 'sec(', 'cot(', 'arcsin(', 'arccos(', 'arctan(', 'arccsc(', 'arcsec(', 'arccot(', 'log10(', 'ln('];
// ln is just log in mathjs
const mathjsFuncs = ['sin(', 'cos(', 'tan(', 'csc(', 'sec(', 'cot(', 'asin(', 'acos(', 'atan(', 'acsc(', 'asec(', 'acot(', 'log10(', 'log('];

// global variables for HTML
let totalTests = 0;
let rowNum = 1;
let validTestCount = 0;
let invalidTestCount = 0;
let validTestCorrect = 0;
let invalidTestCorrect = 0;

// handle button event.
document.getElementById('submitTestNum').onclick = function () {
    runTests(document.getElementById('casesToGenerate').value);
}

export function runTests(numTest) {
    const res = generateTests(numTest);
    totalTests += res[0].length;
    addToTable(res);

    // check to see if results are the same
    for (let i = 0; i < res[0].length; i++) {
        // if they were valid, check for equality
        if (res[1][i] == res[2][i]) {
            validTestCorrect++;
        }
        else if (i % 2 != 0) {
            if (res[1][i].substring(0, 5) == 'Error' && res[2][i].substring(0, 5) == 'Error') {
                invalidTestCorrect++;
            }
        }
    }

    updateStats();
}

// function will add to the table in index.html
function addToTable(testCases) {
    const table = document.querySelector('.resultsTable');

    for (let i = 0; i < testCases[0].length; i++) {
        let newRow = document.createElement('tr');
        newRow.className = 'resultsTableRow';

        // add the four elements to the table
        let expressionNum = document.createElement('td');
        expressionNum.innerText = rowNum++;

        let expressionGenerated = document.createElement('td');
        expressionGenerated.innerText = testCases[0][i];

        let mathjsResult = document.createElement('td');
        mathjsResult.innerText = testCases[1][i];

        let myEvalResult = document.createElement('td');
        myEvalResult.innerText = testCases[2][i];

        // append data to row
        newRow.append(expressionNum, expressionGenerated, mathjsResult, myEvalResult);

        // append to table
        table.append(newRow);
    }
}

// function to update stats in index.html
function updateStats() {
    document.getElementById("totalTests").innerHTML = 'Total Number of Tests: ' + totalTests;
    document.getElementById("validCount").innerHTML = 'Valid Tests Generated: ' + validTestCount;
    document.getElementById("invalidCount").innerHTML = 'Syntactically Invalid Tests Generated: ' + invalidTestCount;
    document.getElementById("validEvalCount").innerHTML = 'Valid Tests Evaluated Correctly by my System: ' + validTestCorrect;
    document.getElementById("invalidEvalCount").innerHTML = 'Syntactically Invalid Tests Caught by my System: ' + invalidTestCorrect;
}

// function that will take in number of tests to run, then generate expressions, testing if they are valid.
// If they are valid, they will be sent to calcFunctions.js to be evaluated.
// returns an array: [expressions, mathjsResult, myResult]
function generateTests(numTests) {
    const testCases = [];
    const myTestCases = [];

    // get all the test cases. Equally distribute valid and invalid expressions
    for (let i = 0; i < numTests; i++) {
        let newCase = [];
        if (i % 2 == 0) {
            newCase = generateValidExpression();
        }
        else {
            newCase = generateInvalidExpression();
        }

        testCases.push(newCase[0]);
        myTestCases.push(newCase[1]);
    }

    const mathjsResult = [];
    const myResult = [];

    // run evaluate and myEvaluate on them to compare them.
    for (let i = 0; i < numTests; i++) {
        if (testCases[i] == '') {
            mathjsResult.push('0');
            myResult.push('0');
            validTestCount++;
            continue;
        }
        // use try... catch to deal with invalid expressions
        try {
            // check for imaginary numbers from math.evaluate or errors from myEvaluate
            let res1 = math.evaluate(testCases[i]);

            if (isComplex(res1)) {
                mathjsResult.push("Error: Invalid Input");
            }
            else {
                mathjsResult.push(res1.toString());
            }
            validTestCount++;
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                mathjsResult.push("Error: Syntax");
            }
            else if (error instanceof TypeError) {
                mathjsResult.push('Error: Type')
            }
            else {
                mathjsResult.push('Error');
            }

            invalidTestCount++;
        }
        finally {
            let res2 = myEvaluate(myTestCases[i]);
            myResult.push(res2.toString());
        }

    }

    return [testCases, mathjsResult, myResult];

} // end generateTests

function isComplex(num) {
    if (num == 0) {
        return false;
    }

    let comp = math.complex(num);
    if ((comp.re = num && comp.im == 0)) {
        return false;
    }
    return true;
}

// function to generate a valid expression. returns two arrays
// builds the expression sent to mathjs and expression sent to my calculator at the same time.
// returns as [mathjsExpression, myExpression]
function generateValidExpression() {
    let expression = '';
    let myExpression = '';
    let open = 0; // tracks open parentheses
    let decimal = false; // tracks if a decimal point is in the current number

    let length = getRandom(16); // random expression length. 0-15. 
    // if length is 0, there is a 15% chance to generate an empty expression. 
    if (length == 0 && getRandom(100) < 15) {
        return ['', '']
    }
    else {
        length = getRandom(16) + 1;
    }

    // At i = 0, only operators allowed are the special operators.
    let firstChar = getRandom(3);
    if (firstChar == 0) {
        let num = nums[getRandom(nums.length)]
        expression += num;
        myExpression += num;
    }

    else if (firstChar == 1) { // unique operators
        let opPosition = getRandom(3);
        let uOp = uniqueOps.charAt(opPosition);
        myExpression += uOp;
        if (uOp == '~') {
            expression += '-';
        }
        else {
            expression += uOp;
        }

        if (uniqueOps.charAt(opPosition) == '.') {
            decimal = true;
        }

        else if (uniqueOps.charAt(opPosition) == '(') {
            open++;
        }
    }
    else {
        let func = funcs[getRandom(funcs.length)];
        let index = funcs.indexOf(func);
        expression += mathjsFuncs[index];
        myExpression += func;

        open++;
    }

    // loop to generate expression
    for (let i = 1; i < length; i++) {
        // determine type of character to enter

        // work based on previous operator
        let prevChar = myExpression[expression.length - 1];

        // if prevChar is a num
        if (nums.includes(prevChar)) {
            // can push a number, operator, decimal point, or closed parentheses
            // 0 = number; 1 = operator; 2 = uniqueOperator
            let chooseList = getRandom(3);

            // add number
            if (chooseList == 0) {
                let num = nums[getRandom(nums.length)];
                expression += num;
                myExpression += num;
            }
            // add operator
            else if (chooseList == 1) {
                let op = ops[getRandom(ops.length)];
                expression += op;
                myExpression += op;
                decimal = false; // set decimal to false since number has ended (if it existed in the first place)   
            }

            // push a decimal or closed parentheses
            else {
                let decOrParen = getRandom(2);
                // to push a decimal point, decimal must = false
                if (decOrParen == 0 && !decimal) {
                    expression += '.';
                    myExpression += '.';
                    decimal = true;
                }

                // to push closed parentheses, there must be a corresponding open parentheses
                else if (decOrParen == 1 && open > 0) {
                    expression += ')';
                    myExpression += ')';
                    open--;
                    decimal = false;
                }
            }
        }

        // prevChar is an operator
        else if (ops.includes(prevChar)) {
            // can push number, negative sign, open parentheses, or function
            // 0 = number; 1 = uniqueOperator; 2 = function
            let chooseList = getRandom(3);

            // add number
            if (chooseList == 0) {
                let num = nums[getRandom(nums.length)];
                expression += num;
                myExpression += num;
            }

            // push negative or open parentheses
            else if (chooseList == 1) {
                let negOrParen = getRandom(2);

                if (negOrParen == 0) {
                    expression += '-';
                    myExpression += '~';
                }
                else {
                    expression += '(';
                    myExpression += '(';
                    open++;
                }

                decimal = false;
            }

            // push a function
            else {
                let func = funcs[getRandom(funcs.length)];
                expression += mathjsFuncs[funcs.indexOf(func)];
                myExpression += func;
                open++;
                decimal = false;
            }
        }

        // prevChar is a function
        else if (funcs.includes(prevChar)) {
            // can push number,  negative sign, decimal sign, or function
            // 0 = number; 1 = uniqueOperator; 2 = function
            let chooseList = getRandom(3);

            // add number
            if (chooseList == 0) {
                let num = nums[getRandom(nums.length)];
                expression += num;
                myExpression += num;
            }

            // push negative or decimal sign
            else if (chooseList == 1) {
                let negOrDec = getRandom(2);
                if (negOrDec == 0) {
                    expression += '-';
                    myExpression += '~';
                    decimal = false;
                }
                // to push a decimal point, decimal must = false
                else if (negOrDec == 1 && !decimal) {
                    expression += '.';
                    myExpression += '.';
                    decimal = true;
                }
            }

            // add function
            else {
                let func = funcs[getRandom(funcs.length)];
                expression += mathjsFuncs[funcs.indexOf(func)];
                myExpression += func;
                open++;
                decimal = false;
            }
        }

        // prevChar is a uniqueOperator '()~.'       
        // if prevChar is '(', CANNOT PUSH ')'!
        else if (uniqueOps.includes(prevChar)) {
            if (prevChar == '~' || prevChar == '(') {
                // push num, open parentheses, negative sign, decimal sign, or function
                let newChar = getRandom(5);

                // add number
                if (newChar == 0) {
                    let num = nums[getRandom(nums.length)];
                    expression += num;
                    myExpression += num;
                }
                // add open paren
                else if (newChar == 1) {
                    expression += '(';
                    myExpression += '(';
                    open++;
                    decimal = false;
                }
                // add negative sign
                else if (newChar == 2) {
                    expression += '-';
                    myExpression += '~';
                    decimal = false;
                }
                // add decimal
                else if (newChar == 3) {
                    expression += '.';
                    myExpression += '.';
                    decimal = true;
                }
                // add function
                else {
                    let func = funcs[getRandom(funcs.length)];
                    expression += mathjsFuncs[funcs.indexOf(func)];
                    myExpression += func;
                    open++;
                    decimal = false;
                }
            }

            else if (prevChar == ')') {
                // push operator or closed parentheses
                let newChar = getRandom(2);

                // add number
                if (newChar == 0) {
                    let op = ops[getRandom(ops.length)];
                    expression += op;
                    myExpression += op;
                    decimal = false;
                }
                // add closed paren
                else if (newChar == 1 && open > 0) {
                    expression += ')';
                    myExpression += ')';
                    open--;
                    decimal = false;
                }
            }
            // add decimal
            else if (prevChar == '.') {
                let num = nums[getRandom(nums.length)];
                expression += num;
                myExpression += num;
            }
        }
    }

    // if expression ends with '(', '~', '.', ')', or operator
    if (!nums.includes(expression[expression.length - 1])) {
        // add an operator and number after ')'
        if (expression[expression.length - 1] == ')') {
            let op = ops[getRandom(ops.length - 1)];
            let num = getRandom(101).toString();
            expression += op;
            expression += num;
            myExpression += op;
            myExpression += num;
        }
        // add number after negative sign
        else if (open > 0 || ops.includes(expression[expression.length - 1]) || expression[expression.length - 1] == '~') {
            let num = getRandom(101).toString();
            expression += num;
            myExpression += num;
        }
        // add number after decimal sign
        else if (expression[expression.length - 1] == '.') {
            let num = nums[getRandom(nums.length)];
            expression += num;
            myExpression += num;
        }
    }

    // add any closed parentheses
    while (open > 0) {
        expression += ')';
        myExpression += ')';
        open--;
    }

    return [expression, myExpression];
} // end generateValidExpression

const unrelated = 'abcdefghijklmnopqrstuvwxyz<>?!@#$%&_`\"\'';

// function that will randomly select elements from the lists and add to the expression.
// result will most likely be incorrect due to no rule checks
// returns an array in the form of [mathjsExpression, myExpression]
function generateInvalidExpression() {
    let expression = '';
    let myExpression = '';
    let length = getRandom(16);

    // add element to expression
    for (let i = 0; i < length; i++) {
        // randomly select a list
        let list = getRandom(5);

        // num
        if (list == 0) {
            let num = nums[getRandom(nums.length)];
            expression += num;
            myExpression += num;
        }

        // operator
        else if (list == 1) {
            let op = ops[getRandom(ops.length)];
            expression += op;
            myExpression += op;
        }

        // uniqueOperator
        else if (list == 2) {
            let uOp = uniqueOps[getRandom(uniqueOps.length)];

            if (uOp == '~') {
                expression += '-';
                myExpression += '~';
            }
            else {
                expression += uOp;
                myExpression += uOp;
            }
        }

        // function
        else if (list == 3) {
            let func = funcs[getRandom(funcs.length)];
            let index = funcs.indexOf(func);
            expression += mathjsFuncs[index];
            myExpression += func;
            expression += '(';
            myExpression += '(';
        }

        // unrelated input. 10% chance to add one of these
        else if (getRandom(100) < 10) {
            let un = unrelated[getRandom(unrelated.length)];
            expression += un;
            myExpression += un;
        }
    }

    return [expression, myExpression];
} // end generateInvalidExpression


// helper function to generate a random number from 0 to max
function getRandom(max) {
    return Math.floor(Math.random() * max);
} // end getRandom

