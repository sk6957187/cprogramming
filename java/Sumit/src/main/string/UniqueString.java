package string;

public class UniqueString {
	public static void main(String[] args) {
		String str = "abacd";
		char[] ch = str.toCharArray();
		boolean flag = true;
		for(int i=0; i<ch.length-1; i++) {
			for(int j=i+1; j<ch.length; j++) {
				if(ch[i] == ch[j]) {
					flag = false;
				}
			}
		}
		if(flag) {
			System.out.println("Unique string.");
		} else {
			System.out.println("Not unique string.");
		}
	}
}
