package main;

import java.util.Stack;

class Node{
	String value;
	Node left, right;
	Node(String value){
		this.value = value;
		left = right = null;
	}
}

public class Tree {
	
	public static boolean isOperator(String c) {
		return c.equals("+") || c.equals("-") || c.equals("*") || c.equals("/");
	}
	
	public static Node constructTree(String[] postfix) {
		Stack<Node> stack = new Stack<>();
		for(String token: postfix) {
			if(isOperator(token)) {
				Node node = new Node(token);
				node.right = stack.pop();
				node.left = stack.pop();
				stack.push(node);
			} else {
				stack.push(new Node(token));
			}
		}
		return stack.peek();
	}
	
	public static void inOrder(Node root) {
		if(root != null) {
			inOrder(root.left);
			System.out.print(root.value+" ");
			inOrder(root.right);
		}
	}
	public static void main(String[] args) {

//        String postfix = "ab+ef*g*-";
		String postfix = "12+34*+5+";
        String[] tokens = postfix.split("");

        Node root = constructTree(tokens);

        System.out.print("Infix expression is: ");
        inOrder(root);
	}
}
