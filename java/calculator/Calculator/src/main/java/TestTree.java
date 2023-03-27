//import src.Tree;

import src.Stack;
import src.Tree;

import java.util.ArrayList;
import java.lang.String;

public class TestTree {
    private Tree tempTree = new Tree();
    private int getResult(ArrayList<String> posixArray) {
        int result;
        int a,b,c = 0, i;
        int temp;
        Stack stack = new Stack();
        for(i=0; i<posixArray.size(); i++) {
            if(!tempTree.isSymbol(posixArray.get(i))) {
                stack.push(Integer.parseInt(posixArray.get(i)));
                continue;
            }
            a = stack.pop();
            b = stack.pop();
            if(posixArray.get(i).equals("+")) {
                c = a+b;
            }
            if(posixArray.get(i).equals("-")) {
                c = b-a;
            }
            if(posixArray.get(i).equals("*")) {
                c = a*b;
            }
            if(posixArray.get(i).equals("/")) {
                c = b/a;
            }
            stack.push(c);
        }
        result = stack.pop();
        return result;
    }

    public static void main(String[] args) {
        TestTree testTree = new TestTree();
        //2 -1*2-2+30/5=2-2-2+6=4
        //2-1+3=4
        //12 + 3 - 1 = 14
        //3+2-5*3/2 = 3+2-5*1 = 0
        //3+2-5*4/2 = -5
        //12 -1*2-2+30/5 = 12-2-2+6=14
        String input = "3+2-5*4/2";
        ArrayList<String> arrOfinput = Stack.tokenizeStringNumeric(input);
        System.out.println(arrOfinput);
        Tree root = null;
//        for (int i=0; i<input.length(); i++) {
//            Tree treeNode = Tree.createNode();
//            treeNode.data = input.substring(i, i+1);
//            root = treeNode.insertNode(root, treeNode, treeNode.data);
//        }
        for (int i=0; i<arrOfinput.size(); i++) {
            Tree treeNode = Tree.createNode();
            treeNode.data = arrOfinput.get(i);
            root = treeNode.insertNode(root, treeNode, treeNode.data);
        }
        ArrayList<String> arr = new ArrayList<String>();
        testTree.tempTree.convertTreeToPosix(arr, root);
        int result = testTree.getResult(arr);
        //String[] str = testTree.tempTree.split("+");
      //String[] arrOfstr = str.split("+");
        System.out.println(arr);
        System.out.println(result);
        //System.out.println(str);
    }
}
