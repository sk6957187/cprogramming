package dsa;

import java.util.Stack;

public class Today6 {
	public static void main(String[] args) {
		Stack<Integer> stack = new Stack<>();
		System.out.println("Stack is empty ->" + stack.isEmpty());
		stack.push(10);
		stack.push(20);
		stack.push(30);
		stack.push(40);
		System.out.println("stack -> " +stack);
		System.out.println("peek ->" +stack.peek());
		System.out.println("Pop in stack ->"+ stack.pop());
		System.out.println("stack -> " +stack);
		System.out.println("Stack is empty ->"+stack.isEmpty());
	}
}
