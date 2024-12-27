package main;

import java.util.Stack;

public class ExpressionConverterBinaryTree {

    public static boolean isBracketed(String expr) {
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < expr.length(); i++) {
            if (expr.charAt(i) == '(') {
                stack.push('(');
            } else if (expr.charAt(i) == ')') {
                stack.pop();
                if (stack.isEmpty()) {
                    return i == expr.length() - 1;
                }
            }
        }
        return false;
    }

    public static boolean isValidExpression(String expr) {
        if (expr.length() < 3) return false;

        for (int i = 0; i < expr.length(); i++) {
            if ("abcdefghijklmnopqrstuvwxyz*()/+-".indexOf(expr.charAt(i)) == -1) {
                return false;
            }
        }

        try {
            while (expr.startsWith("(") && expr.endsWith(")")) {
                if (isBracketed(expr)) {
                    expr = expr.substring(1, expr.length() - 1);
                } else break;
            }
            // Placeholder for actual expression parsing logic; return true for valid simplified check
            return true; // Replace with proper evaluation if needed
        } catch (Exception ex) {
            return false;
        }
    }

    public static String infixToPostfix(String expression) {
        if (!isValidExpression(expression)) {
            return null;
        }

        Stack<Character> opStack = new Stack<>();
        StringBuilder postfixList = new StringBuilder();
        String operators = "abcdefghijklmnopqrstuvwxyz";

        for (char token : expression.toCharArray()) {
            if (operators.indexOf(token) != -1) {
                postfixList.append(token);
            } else if (token == '(') {
                opStack.push(token);
            } else if (token == ')') {
                while (!opStack.isEmpty() && opStack.peek() != '(') {
                    postfixList.append(opStack.pop());
                }
                opStack.pop();
            } else {
                while (!opStack.isEmpty() && precedence(opStack.peek()) >= precedence(token)) {
                    postfixList.append(opStack.pop());
                }
                opStack.push(token);
            }
        }

        while (!opStack.isEmpty()) {
            postfixList.append(opStack.pop());
        }

        return postfixList.toString();
    }

    private static int precedence(char op) {
        switch (op) {
            case '*':
            case '/': return 3;
            case '+':
            case '-': return 2;
            case '(': return 1;
            default: return 0;
        }
    }

    public static void main(String[] args) {
        String expr = "a*(b+c)"; // Example expression
        System.out.println("Infix to Postfix: " + infixToPostfix(expr));
    }
}

