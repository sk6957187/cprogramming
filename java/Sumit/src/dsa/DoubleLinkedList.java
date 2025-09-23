package DSA;

class Node1 {
    int data;
    Node1 next;
    Node1 prev;

    Node1(int data) {
        this.data = data;
    }
}

class LinkedImpl1 {
    Node1 head, tail;

    void insert(int ele) {
        Node1 n = new Node1(ele);
        if (head == null) {
            head = n;
            tail = n;
//            System.out.println(n.prev + " "+tail);
        } else {
            n.prev = tail;
            tail.next = n;
            tail = n;
//            System.out.println(n.prev + " "+tail);
        }
        System.out.println(ele + " has been inserted into the doubly linked list!");
    }

    void display() {
        if (head == null) {
            System.out.println("Doubly Linked List is empty...!!");
            return;
        }
        System.out.println("===== Doubly Linked List (head to tail) =====");
        Node1 temp = head;
        while (temp != null) {
            System.out.print(temp.data + " <-> ");
            temp = temp.next;
        }
        System.out.println();
    }

    void displayReverse() {
        if (tail == null) {
            System.out.println("Doubly Linked List is empty!");
            return;
        }
        System.out.println("===== Doubly Linked List (tail to head) =====");
        Node1 temp = tail;
        while (temp != null) {
            System.out.print(temp.data + " <-> ");
            temp = temp.prev;
        }
        System.out.println("null");
    }

    void delete(int ele) {
        if (head == null) {
            System.out.println("Doubly Linked List is empty!");
            return;
        }
        Node1 temp = head;

        if (head.data == ele) {
            head = head.next;
            if (head != null) {
            	head.prev = null;
            }
            else {
            	tail = null;
            }
            System.out.println(ele + " has been deleted from the list!");
            return;
        }

        while (temp != null && temp.data != ele) {
            temp = temp.next;
        }
        if (temp != null) {
            if (temp.next != null) {
            	temp.next.prev = temp.prev;
            }
            else {
            	tail = temp.prev;
            }
            if (temp.prev != null) {
            	temp.prev.next = temp.next;
            }
            System.out.println(ele + " has been deleted from the list!");
        } else {
            System.out.println(ele + " is not found in the list!");
        }
    }
}

public class DoubleLinkedList {
    public static void main(String[] args) {
        LinkedImpl1 l1 = new LinkedImpl1();
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
