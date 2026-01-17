package main;


public class Today {
//	static void printPattern(int n) {
//		int b=1;
//		while(b<=n) {
//			int j=1;
//			while(j<=2*(n-b)+1) {
//				System.out.print(b+" ");
//				j++;
//			}
//			System.out.println();
//			b++;
//		}
//		int a=n-1;
//		for(int i=2; i<=n; i++) {
//			for(int j=1; j<=2*i-1; j++) {
//				System.out.print(a+" ");
//			}
//			System.out.println();
//			a--;
//		}
//		
//	}
//	
//	public static void main(String[] args) {
//		Scanner sc =new Scanner(System.in);
//		int n = sc.nextInt();
//		printPattern(n);
		
//		for(int i=1; i<=n; i++) {
//			for(int j=1; j<=2*(n-i)+1; j++) {
//				System.out.print(i+" ");
//			}
//			System.out.println();
//		}
		
//		int b=1;
//		while(b<=n) {
//			int j=1;
//			while(j<=2*(n-b)+1) {
//				System.out.print(b+" ");
//				j++;
//			}
//			System.out.println();
//			b++;
//		}
//		int a=n-1;
//		for(int i=2; i<=n; i++) {
//			for(int j=1; j<=2*i-1; j++) {
//				System.out.print(a+" ");
//			}
//			System.out.println();
//			a--;
//		}
//	hm.put(ch, hm.getOrDefault(hm, 0)+1);
//		sc.close();
//	}

	
	
	
//	public static void main(String[] args) {
//		Scanner sc = new Scanner(System.in);
//		String str = sc.next();
//		HashMap<Character, Integer> hm = new HashMap<>(); 
//		for(int i=0; i<str.length(); i++) {
//			char ch = str.charAt(i);
//
//			if(hm.containsKey(ch)) {
//				hm.put(ch, hm.get(ch)+1);
//			}else {
//				hm.put(ch, 1);
//			}
//		}
//		Set<Character> keys = hm.keySet();
//		for(char key: keys) {
//			System.out.println(key+" "+ hm.get(key));
//		}
//	}
	
	
	public static void main(String[] args) {
		String str = "3[a2[c]]";
		int l = str.length();
		String res = "";
		
		int a=0;
		int b=0;
		int num = 0;
		for(int i=0;i<str.length(); i++) {
			
			char ch = str.charAt(i);
			if(ch >= 48 && ch<= 57) {
				num = str.charAt(i)-48;
			
			}
			if(ch == '[') {
				a=i+1;
				for(int j=i+1; j<l; j++) {
					char cha = str.charAt(j);
					if(cha ==']') {
						b=j;
						i=j;

//						System.out.println(a+" "+b);
//						break;
					}
				}
				boolean flag = false;
				String temp = "";
				System.out.println(num+" vbnmj");
				for(int m=0; m<num; m++) {
					System.out.println(a+" "+b);
					System.out.println(str.substring(a,b));
					temp = temp+str.substring(a,b);
					flag = true;
					
				}
				if(flag) {
					res = res+temp;
					num=0;
				}
			}
		}
//		System.out.println(res);
	}
	
}


