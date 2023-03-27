package src;

import java.util.ArrayList;

public class Stack {
    private int top = -1;
    private ArrayList<Integer> stack = new ArrayList<Integer>();
    public void push(int num) {
        if (stack.size() <= top+1) {
            stack.add(num);
        } else {
            stack.add(top+1, num);
        }
        top = top + 1;
    }
    public int pop() {
        if (top == -1) {
            return 0;
        }
        int result = stack.get(top);
        top = top-1;
        return result;
    }

    public ArrayList<Integer> getStack() {
        return stack;
    }
    public static ArrayList<String> tokenizeString(String str, ArrayList<String> tokens) {
        ArrayList<String> result = new ArrayList<String>();
        if (str == null || tokens == null) {
            return result;
        }
        str = str.replace(" ", "");
        String[] temp;
        String temp2;
        int i;
        for(String token : tokens) {
            temp = str.split(token);
            temp2 = "";
            for (i=1; i<temp.length; i++) {
                if (token.equals("\\*")) {
                    token = "*";
                }
                if (token.equals("\\+")) {
                    token = "+";
                }
                temp2 += temp[i-1] + "," + token + ",";
            }
            temp2 += temp[i-1];
            str = temp2;
        }
        temp = str.split(",");
        for(i=0;i<temp.length;i++) {
            result.add(temp[i]);
        }
        return result;
    }

    public static ArrayList<String> tokenizeStringNumeric(String str) {
        ArrayList<String> tokens = new ArrayList<String>();
        tokens.add("\\+");
        tokens.add("\\*");
        tokens.add("-");
        tokens.add("/");
        return tokenizeString(str, tokens);
    }
}
