package main;

public class ArrayObject {
	public static void main(String[] args) {
		Object obj[] = {10,10.08,"ab","abc",false, "A@B", true};
		int countStr =0;
		int countInt =0;
		int countChar = 0;
		int countDbl = 0;
		for(int i=0; i<obj.length; i++) {
			if(obj[i] instanceof String) {
				System.out.print(obj[i]+" ");
				countStr++;
			}
			if(obj[i] instanceof Integer) {
				System.out.print(obj[i]+" ");
				Integer a = (Integer)obj[i];
				countInt++;
			}
			if(obj[i] instanceof Double) {
				System.out.print(obj[i]+" ");
				countDbl++;
			}
			if(obj[i] instanceof Character) {
				System.out.print(obj[i]+" ");
				countChar++;
			}
		}
		System.out.println("String count "+countStr);
		System.out.println("Integer count "+countInt);
		System.out.println("Double count "+countDbl);
		System.out.println("Charecter count "+countChar);
	}
}
