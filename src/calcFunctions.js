// function to evaluate the current expression
export function evaluate(expression, unit) {
    let newExp = '';

    // turn the array into a string
    for (let i = 0; i < expression.length; i++) {
        newExp += expression[i];
    }

    // check the expression for validity, convert it to postfix, and evaluate it
    let valid = checkValdity(newExp);
    if (valid != "Valid") {
        return valid;
    }

    let postfix = infixToPostfix(newExp);
    let answer = evalPostfix(postfix, unit);

    return answer;
}

// function that checks the expression for errors before evaluating it
function checkValdity(expression) {
    // operator at start of expression or closed brackets
    if (expression[0] == '+' || expression[0] == '-' || expression[0] == '*' || expression[0] == '/'
        || expression[0] == ')' || expression[0] == ']' || expression[0] == '}') {
        return "Error: Invalid input";
    }

    // incorrect brackets
    // below code snippet uses stack to check if the correct amount of parentheses/brackets are present in the expression
    let stack = [];
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] == '(' || expression[i] == '[' || expression[i] == '{') {
            stack.push(expression[i]);
        }

        else if (expression[i] == ')' || expression[i] == ']' || expression[i] == '}') {
            if (stack[stack.length - 1] == '(' && expression[i] == ')') {
                stack.pop();
            }

            else if (stack[stack.length - 1] == '[' && expression[i] == ']') {
                stack.pop();
            }

            else if (stack[stack.length - 1] == '{' && expression[i] == '}') {
                stack.pop();
            }

            else {
                return "Error: Invalid input";
            }
        }
    }

    if (stack.length != 0) {
        return "Error: Invalid input";
    }

    for (let i = 1; i < expression.length; i++) {
        // divide by zero error
        if (expression[i - 1] == '/' && expression[i] == '0') {
            return "Error: Divide by zero";
        }

        // in case the expression includes something like 1/(0)
        if (expression[i - 1] == '/' && (expression[i] == '(' || expression[i] == '[' || expression[i] == '{')) {
            i++;
            if (expression[i] == 0 && (expression[i] == ')' || expression[i] == ']' || expression[i] == '}')) {
                return "Error: Divide by zero";
            }
        }
    }

    return "Valid";

}

// function to set the precedence of an operator. 'c' is a single character.
// I borrowed some logic for this function from GeeksForGeeks
function precedence(c) {
    if (c == '^')
        return 3;
    else if (c == '/' || c == '*')
        return 2;
    else if (c == '+' || c == '-')
        return 1;
    else if (c == '(' || c == '{' || c == '[')
        return -1;
    else
        return 4;
}

// function to create the postfix notation of an expression. 's' is the expression we are converting and is a String.
// I borrowed some logic for this function from GeeksForGeeks.
function infixToPostfix(expression) {
    // stack and result string to be used.
    let stack = [];
    let result = "";

    // loop through the expression character by character. 
    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];

        // if the first element is a '-', then a negative number will follow.
        // a character of n in the postfixed expression indicates unary negation
        if (i == 0 && c == 'n') {
            result += 'n';
            continue;
        }

        // if the previous element is an operator and current element is a '-',
        // then a negative number will follow
        let prev = expression[i - 1];
        if ((prev == '+' || prev == '-' || prev == '*' || prev == '/') && c == 'n') {
            result += 'n';
        }

        // if character is a number, add to result.
        else if (c == '.' || (c >= '0' && c <= '9')) {
            result += c;
        }

        // block to catch trig and log functions
        else if ((c >= 'a' && c <= 'z') || (c <= 'A' && c >= 'Z')) {
            let func = '';

            while ((c >= 'a' && c <= 'z') || (c <= 'A' && c >= 'Z') && (i < expression.length)) {
                func += c;
                i++;
                c = expression[i];
            }
            i--;
            stack.push(func);
        }

        // if c is open parentheses or bracket, push it onto the stack
        else if (c == '(' || c == '[' || c == '{') {
            stack.push(c);

            // if next character after the parentheses is a '-', then a negative number will follow
            i++;
            if (expression[i] == 'n') {
                //result += expression[i];
                result += 'n';
            }

            else {
                i--;
            }
        }

        // if c is a closed parentheses or bracket, pop from stack until the opened parentheses or bracket is found
        else if (c == ')') {
            while (stack[stack.length - 1] != '(') {
                result += ' ';
                result += stack.pop();
            }
            stack.pop();
        }

        else if (c == ']') {
            while (stack[stack.length - 1] != '[') {
                result += ' ';
                result += stack.pop();
            }
            stack.pop();
        }

        else if (c == '}') {
            while (stack[stack.length - 1] != '{') {
                result += ' ';
                result += stack.pop();
            }
            stack.pop();
        }

        // if an operator is scanned, pop the operators from the stack that have a higher precedence than c. 
        // then push c onto the stack
        else {
            result += ' ';

            while (stack.length != 0 && precedence(c) <= precedence(stack[stack.length - 1])) {
                result += stack.pop() + ' ';
            }
            stack.push(c);
        }
        //console.log(result);
    }

    // pop all remaining elements
    while (stack.length != 0) {
        result += ' ';
        result += stack.pop();
    }

    //console.log(result);
    return result;
} // end infixtoPostfix

// function to evaluate the expression in postfix notation. Takes in a String
// I borrowed some logic for this function from GeeksForGeeks.
function evalPostfix(expression, unit) {
    if (expression.length == 0) {
        return 0;
    }

    if (expression.length == 1) {
        return expression;
    }

    // stack used to process expression
    let stack = [];

    // loop through the expression. If c is a number, push to stack. 
    // Else pop off the numbers associated with the operator and calculate
    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];

        // space lets the program know that a new number or operator has been reached.
        if (c == ' ')
            continue;

        // if c is an 'n', then extract the negative number properly
        if (c == 'n') {
            let num = 0;
            i++;
            c = expression[i];
            let negative = true;

            // loops through extracting numbers. Also accounts for multiple presses of the sign button and will present the correct number
            while (c != ' ' && i < expression.length) {
                if (c == 'n') {
                    negative = !negative;
                }

                else {
                    num = num * 10 + (c - '0');
                }

                i++;
                c = expression[i];
            }

            i--;
            if (negative) {
                num = num * -1;
                stack.push(num);
            }

            else {
                stack.push(num);
            }
        }

        // if c is a number, push it onto the stack. This ensures multi digit values are caught
        else if (c == '.' || (c >= '0' && c <= '9')) {
            let num = 0;

            // Following loop extracts the chars that make up the current number and converts it to an integer.
            while (c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
                i++;
                c = expression[i];
            }

            // handle decimal numbers
            if (c == '.') {
                i++;
                c = expression[i];
                let decimal = 0.0;

                // find the next whitespace
                let j = i;
                while (expression[j] != ' ') {
                    j++;
                }

                i = j + 1;

                c = expression[j];
                while (expression[j] != '.') {
                    decimal = decimal / 10 + ((c - '0') / 10);
                    j--;
                    c = expression[j];
                }

                num += decimal;
            }
            //console.log(num);
            i--;
            stack.push(num);
        }

        // If c is an operator, perform the proper calculation. If c corresponds to a trig or log function, pop off only 1 value.
        // otherwise, pop off two values.
        else {
            // trig and log block
            if ((c >= 'a' && c <= 'z') || (c <= 'A' && c >= 'Z')) {
                let func = '';

                while ((c >= 'a' && c <= 'z') || (c <= 'A' && c >= 'Z') && (i < expression.length)) {
                    func += c;
                    i++;
                    c = expression[i];
                }

                i--;
                let val = stack.pop();

                // convert degrees to radians to get proper answer.
                if (unit == 'deg') {
                    val = val * (Math.PI / 180);
                }

                switch (func) {
                    case 'sin':
                        stack.push(Math.sin(val));
                        break;

                    case 'cos':
                        stack.push(Math.cos(val));
                        break;

                    case 'tan':
                        stack.push(Math.tan(val));
                        break;

                    case 'csc':
                        stack.push(1 / (Math.sin(val)));
                        break;

                    case 'sec':
                        stack.push(1 / (Math.cos(val)));
                        break;

                    case 'cot':
                        stack.push(1 / (Math.tan(val)));
                        break;

                    case 'arcsin':
                        stack.push(Math.asin(val));
                        break;

                    case 'arccos':
                        stack.push(Math.acos(val));
                        break;

                    case 'arctan':
                        stack.push(Math.atan(val));
                        break;

                    case 'arccsc':
                        stack.push(Math.asin(1 / val));
                        break;

                    case 'arcsec':
                        stack.push(Math.cos(1 / val));
                        break;

                    case 'arccot':
                        stack.push(Math.tan(1 / val));
                        break;

                    case 'log':
                        stack.push(Math.log10(val));
                        break;

                    case 'ln':
                        stack.push(Math.log(val));
                        break;
                }
            }

            // basic arithmetic block
            else {
                let val1 = stack.pop();
                let val2 = stack.pop();

                // val2 is the first value to appear in the below expressions since in subtraction 
                // and division val2 is the first value.
                // 200-100 => 200 100 - in postfix notation.
                switch (c) {
                    case '+':
                        stack.push(val2 + val1);
                        break;

                    case '-':
                        stack.push(val2 - val1);
                        break;

                    case '/':
                        stack.push(parseFloat(val2 / val1, 10));
                        break;

                    case '*':
                        stack.push(val2 * val1);
                        break;

                    case '^':
                        stack.push(Math.pow(val2, val1));
                        break;
                }
            }
        }
    }

    let result = stack.pop();
    //console.log(result);
    return result;
} // end evalPostFix
