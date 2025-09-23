package DSA;

import java.util.Scanner;

public class Queue {
	static int[] queue;
	static int front;
	static int rear;
	
	static void createQueue(int n) {
		queue = new int[n];
		front = 0;
		rear = 0;
		System.out.println("Queue is created with size: "+n);
	}
	
	static void enQueue(int ele) {
		if(rear>=queue.length) {
			System.out.println("Queue is full...!!");
		} else  {
			queue[rear++] = ele;
			System.out.println(ele+" has been added..!!");
		}
	}
	
	static void display() {
		if(rear == front) {
			System.out.println("Queue is empty..!!");
		}
		for(int i=0; i<rear; i++) {
			System.out.println(queue[i]);
		}
	}
	
	static void deQueue() {
		if(rear==front) {
			System.out.println("Queue is full...!!");
		} else {
			System.out.println(queue[front]+" had been deleted");
			for(int i=front; i<rear-1; i++) {
				queue[i] = queue[i+1];
			}
		}
		
	}
	
	static void clear() {
		rear = front;
		System.out.println("Queue is Clear..!!");
	}
	
	static void isEmpty() {
		if(rear == front) {
			System.out.println("Queue is Empty...!!");
		} else {
			System.out.println("Queue is not empty..!!");
		}
	}
	static void isFull() {
		if(rear>=queue.length) {
			System.out.println("Queue is full...!!");
		} else {
			System.out.println("Queue is not full...!!");
		}
	}
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		while(true) {
			System.out.println("----------------Menu--------------------");
			System.out.println("1.Create Queue\n2.Enqueue\n3.Display\n4.Dequeue\n5.clear\n6.IsEmpty\n7.IsFull\n8.Exit");
//			System.err.println("111Enter your choice:-");
			int choice = sc.nextInt();
			switch(choice) {
			case 1:
				System.out.println("Enter size of queue");
				int size = sc.nextInt();
				createQueue(size);
			break;
			case 2:
				System.out.println("Enter the element:");
				int ele = sc.nextInt();
				enQueue(ele);
			break;
			case 3:
				display();
			break;
			case 4:
				deQueue();
				break;
			case 5:
				clear();
				break;
			case 6:
				isEmpty();
				break;
			case 7:
				isFull();
				break;
			case 8:
				System.out.println("Thank You!!");
				System.exit(0);
				break;
			default:
				System.out.println("Worng input..!!");
			}
		}
		
		
	}
}
