import src.Stack;

import java.util.ArrayList;
import java.util.Scanner;


public class Calculator {
    public static void showOption() {
        System.out.println("************************");
        System.out.println("1: Push");
        System.out.println("2: Pop");
        System.out.println("3: Show");
        System.out.println("4: Exit");
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        Stack stack = new Stack();
        while (true) {
            Calculator.showOption();
            System.out.print("Enter choice: ");
            int a= sc.nextInt();
            switch (a) {
                case 1:
                    System.out.print("Enter number: ");
                    int b= sc.nextInt();
                    stack.push(b);
                break;
                case 2:
                    System.out.println("Poped element: " + stack.pop());
                    break;
                case 3:
                    ArrayList<Integer> stackElement = stack.getStack();
                    for (int i=0; i<stackElement.size(); i++) {
                        System.out.print(stackElement.get(i) + " ");
                    }
                    System.out.println();
                    break;
                case 4:
                    return;
                default:
                    System.out.println("Invalid choice");
                break;
            }
        }
    }
}

