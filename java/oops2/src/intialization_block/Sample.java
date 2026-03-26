package intialization_block;

public class Sample {
	static int num;
	static double val;
	static {
		num =12;
		val = 1.2;
	}
	public static void main(String[] args) {
		System.out.println("Program Starts");
		System.out.println(Sample.num);
		System.out.println(Sample.val);
		System.out.println("Program Endes");
	}
}
