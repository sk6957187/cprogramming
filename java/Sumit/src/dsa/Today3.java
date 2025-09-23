package dsa;
import java.util.Queue;
import java.util.Set;
import java.util.Stack;
import java.util.Arrays;
import java.util.LinkedList;

public class Today3 {
	static int[] queue;
	static int front;
	static int rear;
	
	static void createQueue(int n) {
		queue = new int[n];
		front = 0;
		rear = 0;
		System.out.println("Queue is created with size: "+n);
	}
	static void insert(int ele) {
		if(rear >= queue.length) {
			System.out.println("full");
			return;
		} 
		queue[rear++] = ele;
		System.out.println(ele + "is added.");
	}
	
	static void display() {
		if(front == rear) {
			System.out.println("Empty..!!");
		}
		for(int i= front; i<rear; i++) {
			System.out.print(queue[i] + "->");
		}
		System.out.println();
	}
	static void dequeue() {
		if(rear == front) {
			System.out.println("Empty..!!");
			return;
		}
		for(int i=0; i<rear-1; i++) {
			queue[i]=queue[i+1];
		}
		rear--;
		display();
	}
	
	public static void main(String[] args) {
		Stack<Integer> st = new Stack<>();
		st.push(10);
		st.push(20);
		System.out.println(st);
		
		System.out.println(st.pop());
		st.isEmpty();
		System.out.println(st.peek());
		

		
		
		
	}
}
