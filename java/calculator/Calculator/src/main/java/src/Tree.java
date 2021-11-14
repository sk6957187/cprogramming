package src;

import java.util.ArrayList;

public class Tree {
    public String data;
    private Tree left;
    private Tree right;
    public static Tree createNode () {
        Tree treeNode = new Tree();
        treeNode.left = null;
        treeNode.right = null;
        return treeNode;
    }

    public Tree getRight() {
        return right;
    }

    public boolean isSymbol(String data) {
        if (data == null || data == "") {
            return false;
        }
        ArrayList<String> symbol = new ArrayList<String>();
        symbol.add("+");
        symbol.add("-");
        symbol.add("*");
        symbol.add("/");
        if (symbol.contains(data)) {
            return true;
        }
        return false;
    }
    private boolean isNewNodeHasHighPrecedence(Tree treeNode, String data) {
        if (treeNode == null || data == null || treeNode.data == null) {
            return false;
        }
        if (treeNode.data.equals(data)) {
            return false;
        }
        char ch = treeNode.data.charAt(0);
        char dataChar = data.charAt(0);
        switch(ch) {
            case '-':
            case '+':
                if (dataChar == '*' || dataChar == '/') {
                    return true;
                }
                break;
            case '*':
                if (dataChar == '/') {
                    return true;
                }
                break;
            case '/':
            default:
                break;
        }
        return false;
    }
    public Tree insertNode(Tree root, Tree newNode, String data) {
        if (root == null) {
            return newNode;
        }
        if (!this.isSymbol(root.data)) {
            if (this.isSymbol((data))) {
                newNode.left = root;
                root = newNode;
            }
        } else  {
            if (this.isSymbol(data)) {
                if (this.isNewNodeHasHighPrecedence(root, data)) {
                    root.right = this.insertNode(root.right, newNode, data);
                } else {
                    newNode.left = root;
                    root = newNode;
                }
            } else {
                root.right = this.insertNode(root.right, newNode, data);
            }
        }
        return root;
    }
    public void convertTreeToPosix(ArrayList<String> arr, Tree root) {
        if (arr == null) {
            arr = new ArrayList<String>();
        }
        if (root == null) {
            return;
        }
        this.convertTreeToPosix(arr, root.left);
        this.convertTreeToPosix(arr, root.right);
        arr.add(root.data);
    }
}
