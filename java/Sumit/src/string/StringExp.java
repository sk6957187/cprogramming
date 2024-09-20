package string;

public class StringExp {

	public static void main(String[] args) {
//	1.charAt-->
		System.out.println("CharAt()-->");
		String str = "Developer";
		System.out.println(str.charAt(2));
		System.out.println(str.charAt(4));
		System.out.println(str.charAt(6));
//		System.out.println(str.charAt(12)); --> StringIndexOfBoundException but program compile and run		
		
//	2.length()-->
		System.out.println("length()-->");
		String s1 = "BTM";
		System.out.println(s1.length());
		String s2 = "Java_SE22";
		System.out.println(s2.length());
		String s3 = "Software Engineer";
		System.out.println(s3.length());
	
//	3.toCharArray()-->
		System.out.println("toCharArray-->");
		String s4="Tiger";
		char[] ch = s4.toCharArray();
		for(int i =0; i<ch.length; i++) {
			System.out.print(ch[i]+" ");
		}
		System.out.println();
//	4.indexOf()-->
		System.out.println("indexOf-->");
		String s41="Developer";
		System.out.println(s41.indexOf('v'));
		System.out.println(s41.indexOf('l'));
		System.out.println(s41.indexOf('h'));
		int a = s41.indexOf('e');
		int b = s41.indexOf('e', a+1);
		int c = s41.indexOf('e', b+1);
		System.out.print(a+" ");
		System.out.print(b+" ");
		System.out.print(c+" \n");
	
//	5.lastIndexOf()-->
		System.out.println("lastIndexOf-->");
		String s51="Developer";
		System.out.println('p');
		System.out.println('o');
		System.out.println('n');
		System.out.println('e');
		int x = s51.lastIndexOf('e');
		int y = s51.lastIndexOf('e',x-1);
		int z = s51.lastIndexOf('e', y-1);
		System.out.print(x+" ");
		System.out.print(y+" ");
		System.out.print(z+" \n");
		
//	6. contains(), startsWith(), endsWith()-->
		System.out.println("contains(), startsWith(), endsWith()-->");
		String s6= "Engineering";
		System.out.println(s6.contains("job"));  //false
		System.out.println(s6.contains("gin"));	//true
		System.out.println(s6.contains("engine"));	//f
		System.out.println(s6.contains("Eng"));	//t
		System.out.println(s6.contains("i ng"));	//f
		System.out.println(s6.contains("ring"));	//t
		
//	7.equals(), equalsIgnoreCase()-->
		System.out.println("equals(), equalsIgnoreCase()-->");
		String s7 = "j2ee";
		System.out.println(s7.equals("J2ee"));	//f
		System.out.println(s7.equals("j2ee"));	//t
		System.out.println(s7.equals("adv java"));	//f
		System.out.println(s7.equalsIgnoreCase("J2ee"));	//t
		System.out.println(s7.equalsIgnoreCase("j2ee"));	//t
		System.out.println(s7.equalsIgnoreCase("adv java"));	//f
		
//	8.toupperCase(), toLowerCase()-->
		System.out.println("toupperCase(), toLowerCase()-->");
		String s8="Java_SE22";
		System.out.println(s8.toUpperCase());
		System.out.println(s8.toLowerCase());
		System.out.println(s8);
		
//	9.sustring()-->
		System.out.println("substring()-->");
		String s9 = "Developer";
		System.out.println(s9.substring(6));
		System.out.println(s9.substring(4));
		System.out.println(s9.substring(3,8));
		System.out.println(s9.substring(0,7));
	
//	10. trim()-->
		System.out.println("trim()");
		String s10="     core    java    ";
		System.out.println("-->"+s10+"<--");
		System.out.println("-->"+s10.trim()+"<--");
		
//	11. split()-->
		System.out.println("split()-->");
		String s11 = "Java is an object oriented programming langauage";
		String[] arr=s11.split(" ");
		for(int i=0; i<arr.length; i++) {
			System.out.println(arr[i]);
		}
		System.out.println(arr.getClass().getSimpleName());
		
	}

}
