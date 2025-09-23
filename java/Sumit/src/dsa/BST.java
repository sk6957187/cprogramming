package DSA;

class Node2{
	int data;
	Node2 left;
	Node2 right;
	Node2(int data){
		this.data = data;
	}
}
class BSTImpl{
	public void insert(Node2 root, int ele) {
		if(root.data > ele) {
			if(root.left == null){
				root.left = new Node2(ele);
				System.out.println(ele+" had been adden in left side of "+root.data);
			} else {
				insert(root.left, ele);
			}
		} else if(root.data < ele) {
			if(root.right == null) {
				root.right = new Node2(ele);
				System.out.println(ele+" had been adden in rigth side of "+root.data);
			} else {
				insert(root.right, ele);
			}
		}
	}
	public void preOrder(Node2 root) {
		if(root != null) {
			System.out.print(root.data +" ");
			preOrder(root.left);
			preOrder(root.right);
		}
	}
	
	public void inOrder(Node2 root) {
		if(root != null) {
			preOrder(root.left);
			System.out.print(root.data +" ");
			preOrder(root.right);
		}
	}
	
	public void postOrder(Node2 root) {
		if(root != null) {
			preOrder(root.left);
			preOrder(root.right);
			System.out.print(root.data +" ");
		}
	}
	
	public void search(Node2 root, int ele) {
		if(root==null) {
			System.out.println(ele+" is not available..!!");
		} else if(root.data==ele) {
			System.out.println(root.data);
		} else if(root.data>ele) {
			search(root.left, ele);
		} else if(root.data < ele) {
			search(root.right, ele);
		}
	}
}

public class BST {
	public static void main(String[] args) {
		int arr[] = {50,20,10,30,90,95,85};
		BSTImpl bstImpl = new BSTImpl();
		Node2 root = new Node2(arr[0]);
		for(int i=1; i<arr.length; i++) {
			bstImpl.insert(root, arr[i]);
		}
		System.out.println("=====PreOrder======");
		bstImpl.preOrder(root);
		System.out.println();
		System.out.println("=====Inorder=======");
		bstImpl.inOrder(root);
		System.out.println();
		System.out.println("=====PostOrder=====");
		bstImpl.postOrder(root);
		System.out.println();
		
		bstImpl.search(root, 90);
	}
}
