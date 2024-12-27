package string;

public class swap1stToLastInWord {
	public static void main(String[] args) {
		String str = "Ram is a good man";
		System.out.println(str);
		char[] ch = str.toCharArray();
		int k=0;
		for(int i=0; i<ch.length; i++) {
			if(i==0 && ch[i]!=' ' || ch[i]!=' '&&ch[i-1]==' ') {
				k=i;
			} else if(((i==ch.length-1 && ch[i]!=' ') || ch[i]!=' ' && ch[i+1]==' ')) {
				char temp = ch[k];
				ch[k]=ch[i];
				ch[i]=temp;
			}
			
		}
		System.out.println(ch);
	}
}
