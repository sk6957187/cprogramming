package string;

public class lastCharIsUpper {
	public static void main(String[] args) {
		String str = "Ram Is goad mAn";
		char[] ch = str.toCharArray();
		for(int i=0; i<ch.length; i++) {
			if(ch[i] >= 'A' && ch[i] <= 'Z') {
				ch[i] = (char)(ch[i]+32);
			}
			if(((i==ch.length-1 && ch[i]!=' ') || ch[i]!=' ' && ch[i+1]==' ')) {
				ch[i]=(char)(ch[i]-32);
			}
		}
		System.out.println(ch);
	}
}
