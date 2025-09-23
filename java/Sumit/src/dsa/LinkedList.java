package DSA;

class Node{
	int data;
	Node next;
	Node(int data){
		this.data = data;
	}
}

class LinkedImpl{
	Node head, tail;
	
	void insert(int ele) {
		Node n = new Node(ele);
		if(head == null) {
			head = n;
			tail = n;
		} else {
			tail.next = n;
			tail = n;
		}
		System.out.println(ele+" had been inserted inside Linkedlist..!!");
	}
	
	void view() {
		System.out.println("=====LinkedList data=====");
		if(head == null) {
			System.out.println("Empty...!!");
		} else {
			Node temp = head;
//			while(temp != null) {
//				System.out.print(temp.data+"->");
//				temp = temp.next;
//			}
			while(temp.next != null) {
				System.out.print(temp.data+"->");
				temp = temp.next;
			}
			System.out.println(temp.data);
		}
	}
	
	void delete(int n) {
		Node temp = head;
		if(head == null) {
			System.out.println("Empty...!!");
			return;
		}
		if(head.data == n) {
			head = head.next;
			return;
		}
		while(temp.next != null && temp.next.data != n) {
			temp = temp.next;
		}
		if(temp.next != null) {
			System.out.println(temp.next.data+" is deleted..!!");
			temp.next = temp.next.next;
		} else {
			System.out.println("Element not found..!!");
		}
	}
	
	void insertHead(int ele) {
		Node n = new Node(ele);
		if(head == null) {
			head = n;
			tail = n;
			System.out.println(head.data+" had been added in head of Linkedlist..!!");
		} else {
			Node temp = head;
			head = n;
			head.next = temp;
			System.out.println(head.data+" had been added in head of Linkedlist..!!");
		}
	}
}



public class LinkedList {
	
	public static void main(String[] args) {
		LinkedImpl l1 = new LinkedImpl();
		l1.insert(10);
		l1.insert(20);
		l1.insert(30);
		l1.insert(40);
		l1.insert(50);
		l1.view();
		l1.delete(20);
		l1.view();
		l1.insertHead(5);
		l1.view();
	}
}
