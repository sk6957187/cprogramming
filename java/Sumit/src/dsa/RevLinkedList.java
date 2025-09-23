package dsa;

 class Node3{
	 int data;
	 Node next;
	 Node3(int ele){
		 this.data = ele;
	 }
 }
 
 class RevLinkedImpl{
		Node head, tail;
		void insert(int ele) {
			Node n = new Node(ele);
			if(head==null) {
				head = n;
				tail = n;
			} else {
				tail.next = n;
				tail = n;
			}
		}
		
		void display() {
			System.out.println("=====LinkedList data=====");
			if(head == null) {
				System.out.println("Empty...!!");
			} else {
				Node temp = head;
				while(temp.next != null) {
					System.out.print(temp.data+"->");
					temp = temp.next;
				}
				System.out.println(temp.data);
			}
		}
		
		void displayRev() {
			System.out.println("=====Reversed LinkedList data=====");
			if(head == null) {
				System.out.println("Empty...!!");
			} else {
				head = tail;
				Node temp = tail;
				while(temp.next != null) {
					System.out.print(temp.data+"->");
					temp = temp.next;
				}
				System.out.println(temp.data);
				
			}
		}
		
 }

public class RevLinkedList {
	public static void main(String[] args) {
		RevLinkedImpl l1 = new RevLinkedImpl();
		l1.insert(10);
		l1.insert(20);
		l1.insert(30);
		l1.insert(40);
		l1.display();
		l1.displayRev();
		l1.display();
	}
}
