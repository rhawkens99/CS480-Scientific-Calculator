// Parts of the following file are from the website GeeksForGeeks. 
// The logic for the basic arithmetic operators is from GeeksForGeeks. All other logic is my own.

// function to set the precedence of an operator. 'c' is a single character
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
export function infixToPostfix(expression) {
    // stack and result string to be used.
    let stack = [];
    let result = "";

    // loop through the expression character by character. 
    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];

        // if the first element is a '-', then a negative number will follow.
        // a character of n in the postfixed expression indicates unary negation
        if (i == 0 && c == '-') {
            //result += c;
            result += 'n';
            continue;
        }

        // if the previous element is an operator and current element is a '-',
        // then a negative number will follow
        let prev = expression[i - 1];
        if ((prev == '+' || prev == '-' || prev == '*' || prev == '/') && c == '-') {
            //result += c;
            result += 'n';
        }

        // if character is a number, add to result.
        else if (c >= '0' && c <= '9') {
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
            if (expression[i] == '-') {
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
export function evalPostfix(expression) {
    // stack and result string
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
            //while ((c >= '0' && c <= '9') || c == 'n') {
            while (c != ' ') {
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
        /*
        // if c is a negative sign, check if it is with a negative number
        if (c == '-' && (expression[i + 1] >= '0' && expression[i + 1] <= '9')) {
            let num = 0;
            i++
            c = expression[i]

            // Following loop extracts the chars that make up the current number and converts it to an integer.
            while (c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
                i++;
                c = expression[i];
            }
            i--;
            num = num * -1;
            stack.push(num);
        }*/
        // if c is a number, push it onto the stack. This ensures multi digit values are caught
        else if (c >= '0' && c <= '9') {
            let num = 0;

            // Following loop extracts the chars that make up the current number and converts it to an integer.
            while (c >= '0' && c <= '9') {
                num = num * 10 + (c - '0');
                i++;
                c = expression[i];
            }
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
                        console.log(val);
                        stack.push(Math.asin(val));
                        console.log(stack);
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
                        stack.push(parseInt(val2 / val1, 10));
                        break;

                    case '*':
                        stack.push(val2 * val1);

                    case '^':
                        stack.push(Math.pow(val2, val1));
                }
            }
        }
    }

    let result = stack.pop();
    //console.log(result);
    return result;
} // end evalPostFix