package DSA;

import java.util.Scanner;

public class StackImpln {
	static int[] stack;
	static int top;
	
	static void createStack(int size) {
		stack = new int[size];
		top = -1;
		System.out.println("Stack is created with size: "+size);
	}
	
	static void push(int ele) {
		if(top == stack.length-1) {
			System.err.println("Stack is overflow error...!!!");
		} else {
			top++;
			stack[top] = ele;
			System.out.println(ele +" had been added to stack...!!");
		}
	}
	
	static void display() {
		if(top==-1) {
			System.out.println("Stack is empty....!!");
		} else {
			for(int i=top; i>=0; i--) {
				System.out.println(stack[i]);
			}
		}
	}
	
	static void pop() {
		if(top==-1) {
			System.out.println("Stack UnderFlow...!!");
		} else {
			System.out.println(stack[top]);
			top--;
		}
	}
	
	static void isEmpty() {
		if(top==-1) {
			System.out.println("Yes");
		} else {
			System.out.println("NO");
		}
	}
	
	static void isPeek() {
		System.out.println("Top most element:- "+stack[top]);
	}
	
	static void clear() {
		System.out.println("Stack had been cleared.");
		top = -1;
	}
	
	static void isFull(int size) {
		if((size-1) == top) {
			System.out.println("Stack is full");
		}
	}
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter the size of stack: ");
		int size = sc.nextInt();
		createStack(size);
		boolean flag = true;
		while(true) {
			System.out.println("-----------------Menu-------------------");
			System.out.println("1.Push\n2.Pop\n3.Display\n4.Peek\n5.Clear\n6.IsFull\n7.IsEmpty\n8.Exit");
			System.out.print("Enter your option:- ");
			int choice = sc.nextInt();
			switch (choice) {
			case 1: 
				System.out.println("Enter the element");
				int ele = sc.nextInt();
				push(ele);
			break;
			case 2:
				pop();
			break;
			case 3:
				display();
			break;
			case 4:
				isPeek();
				break;
			case 5:
				clear();
			break;
			case 6:
				isFull(size);
			break;
			case 7:
				isEmpty();
			break;
			case 8:
				System.out.println("Thank you... visit again..!!");
				System.exit(0);
//				flag = false;
			break;
			default:
				System.out.println("Wrong input..!!");
			}
		}
//		System.out.println("------------Program End--------------");
		
	}
}
