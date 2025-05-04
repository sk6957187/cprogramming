package string;

public class firstCharIsUpper {
	
	public static void main(String[] args) {
		String str ="Ram is a goAd man";
		char ch[] = str.toCharArray();
		for(int i=0; i<ch.length; i++) {
			if(ch[i]>='A' && ch[i]<='Z') {
				ch[i] = (char)(ch[i]+32);
			}
			if((i==0 && ch[i]!='c') || (ch[i]!=' ' && ch[i-1]==' ')) {
				ch[i] = (char)(ch[i]-32);  
			}
		}
		System.out.println(ch);
	}
 }