package intialization_block;

public class Example {
	static int a;
	static {
		a=10;
	}
	static {
		a=20;
	}
	static {
		a=30;
	}
	public static void main(String[] args) {
		System.out.println("Prog. start");
		System.out.println(Example.a);
		System.out.println("Prog. ends");
	}
}
