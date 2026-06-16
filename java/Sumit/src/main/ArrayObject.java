package main;

public class ArrayObject {
	public static void main(String[] args) {
		Object obj[] = {10,10.08,"ab","abc",false, "A@B", true};
		int countStr =0;
		int countInt =0;
		int countChar = 0;
		int countDbl = 0;
		for (Object element : obj) {
			if(element instanceof String) {
				System.out.print(element+" ");
				countStr++;
			}
			if(element instanceof Integer) {
				System.out.print(element+" ");
				countInt++;
			}
			if(element instanceof Double) {
				System.out.print(element+" ");
				countDbl++;
			}
			if(element instanceof Character) {
				System.out.print(element+" ");
				countChar++;
			}
		}
		System.out.println();
		System.out.println("String count "+countStr);
		System.out.println("Integer count "+countInt);
		System.out.println("Double count "+countDbl);
		System.out.println("Charecter count "+countChar);
	}
}
