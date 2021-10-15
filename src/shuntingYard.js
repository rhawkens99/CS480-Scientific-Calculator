// Parts of the following file are from the website GeeksForGeeks. Some variable names are changed, but the logic is not my own.

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
        let c = expression.charAt(i);

        // if character is an operand, add to result.
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
            result += c;

        // if c is open parentheses or bracket, push it onto the stack
        else if (c == '(' || c == '[' || c == '{')
            stack.push(c);

        // if c is a closed parentheses or bracket, pop from stack until the opened parentheses or bracket is found
        else if (c == ')') {
            while (stack[stack.length - 1] != '(') {
                //result += stack[stack.length - 1];
                result += stack.pop();
            }
            stack.pop();
        }

        else if (c == ']') {
            while (stack[stack.length - 1] != '[') {
                //result += stack[stack.length - 1];
                result += stack.pop();
            }
            stack.pop();
        }

        else if (c == '}') {
            while (stack[stack.length - 1] != '{') {
                //result += stack[stack.length - 1];
                result += stack.pop();
            }
            stack.pop();
        }

        // if an operator is scanned, pop the operators from the stack that have a higher precedence than c. 
        // then push c onto the stack
        else {
            while (stack.length != 0 && precedence(c) <= precedence(stack[stack.length - 1])) {
                //result += stack[stack.length - 1];
                result += stack.pop();
            }
            stack.push(c);
        }
    }

    // pop all remaining elements
    while (stack.length != 0) {
        //result += stack[stack.length - 1]
        result += stack.pop();
    }

    console.log(result);
    return result;
}