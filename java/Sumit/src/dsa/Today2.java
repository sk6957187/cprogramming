package dsa;

import java.util.Stack;

//"3[a]2[bc]"
//"3[a2[c]]"
//"2[abc]3[cd]ef"

public class Today2 {
	static String stackPrint(String str) {
		String res = "";	//adceceadcece
		Stack<Integer> count = new Stack<>();	//3
		Stack<String> stringStack = new Stack<>();		//
		int k =0;	//0
		for(char ch : str.toCharArray()) {
			if(Character.isDigit(ch)) {
				k = k * 10 + (ch - '0');
			} else if(ch == '[') {
				count.push(k);
				stringStack.push(res);
				res = "";
				k=0;
			}else if(ch == ']') {
				int repeat = count.pop();	//2
				String prev = stringStack.pop(); 	//""
				for(int i=1; i<=repeat; i++) {
					prev = prev+res;
				}
				res = prev;
			}else {
				res = res+ch;
			}
		}
		return res;
	}
	public static void main(String[] args) {
		String str = "3[ad2[ce]]";
		String res = stackPrint(str);
		System.out.println(res);
	}
}

