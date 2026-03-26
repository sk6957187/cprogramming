package dsa;

import java.util.Scanner;
import java.util.Stack;


class Node4{
	Node4 next;
	Node4 prev;
	int data;
	Node4(int d){
		this.data = d;
	}
}

class doubleLinked{
	Node4 head, tail;
	
	void insert(int ele) {
		Node4 n = new Node4(ele);
		if(head == null) {
			head = n;
			tail = n;
		} else {
			n.prev = tail;
			tail.next = n;
			tail = n;
		}
		System.out.println(ele + " has been inserted into the doubly linked list!");
	}
	
	void display() {
		if (head == null) {
			System.out.println("Empty ....!!");
			return;
		}
		System.out.println("=================Doubly linked list===================");
		Node4 temp = head;
		while (temp != null) {
			System.out.print(temp.data + " <-> ");
			temp = temp.next;
		}
		System.out.println("null");
	}

	void displayReverse() {
		if (tail == null) {
			System.out.println("Empty.....!!");
			return;
		}
		System.out.println("=======================Reverse================");
		Node4 temp = tail;
		while (temp != null) {
			System.out.print(temp.data + " <-> ");
			temp = temp.prev;
		}
		System.out.println("null");
	}

	void delete(int ele) {
		if (head == null) {
			System.out.println("Empty....!!");
			return;
		}
		Node4 temp = head;
		if (head.data == ele) {
			head = head.next;
			if (head != null) {
				head.prev = null;
			} else {
				tail = null;
			}
			System.out.println(ele + " has been deleted from the list");
			return;
		}
		while (temp != null && temp.data != ele) {
			temp = temp.next;
		}
		if (temp != null) {
			if (temp.next != null) {
				temp.next.prev = temp.prev;
			} else {
				tail = temp.prev;
			}
			if (temp.prev != null) {
				temp.prev.next = temp.next;
			}
			System.out.println(ele + " has been deleted");
		} else {
			System.out.println("Not found...!!");
		}
	}

}

public class Today{
	
	
	public static void main(String[] args) {
		doubleLinked l1 = new doubleLinked();
        l1.insert(10);
        l1.insert(20);
        l1.insert(30);
        l1.display();
        l1.displayReverse();
        l1.delete(20);
        l1.display();
        l1.displayReverse();
        l1.delete(10);
        l1.delete(30);
        l1.display();
	}
}
