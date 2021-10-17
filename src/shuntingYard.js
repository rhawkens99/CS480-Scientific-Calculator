// Parts of the following file are from the website GeeksForGeeks. 
// Some variable names are changed, but the logic is not my own.

// function to set the precedence of an operator. 'c' is a single character
function precedence(c) {
    if (c == '^')
        return 3;
    else if (c == '/' || c == '*')
        return 2;
    else if (c == '+' || c == '-')
        return 1;

    return -1;
}

// function to create the postfix notation of an expression. 's' is the expression we are converting and is a String.
// will return a String for now for easy testing. May change this later in development based on needs.
export function infixToPostfix(expression) {
    // stack and result string to be used.
    let stack = [];
    let result = "";

    // loop through the expression character by character. 
    for (let i = 0; i < expression.length; i++) {
        let c = expression[i];

        // if the first element is a '-', then a negative number will follow.
        // always add first element to result
        if (i == 0 /*&& c == '-'*/) {
            result += c;
            continue;            
        }        

        // if the previous element is an operator and current element is a '-',
        // then a negative number will follow
        let prev = expression[i - 1];
        if ((prev == '+' || prev == '-' || prev == '*' || prev == '/') && c == '-') {
            result += c;
        }

        // if character is an operand, add to result.
        else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
            result += c;
        }

        // if c is open parentheses or bracket, push it onto the stack
        else if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
                
            // if next character after the parentheses is a '-', then a negative number will follow
            i++;
            if (expression[i] == '-')
                result += expression[i];               
            else
                i--;
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
    }

    // pop all remaining elements
    while (stack.length != 0) {
        result += ' ';
        result += stack.pop();
    }

    console.log(result);
    return result;
}

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

        // If c is an operator, pop the last two elements and perform the proper calculation.
        else {
            let val1 = stack.pop();
            let val2 = stack.pop();
            //console.log(val1);
            //console.log(val2);

            // val2 is the first value to appear in the below expressions since in subtraction 
            // and division val2 is the first value.
            // 200-100 => 200100- in postfix notation.
            switch (c) {
                // basic arithmetic
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
            }
        }
    }

    let result = stack.pop();
    console.log(result);
    return result;
}