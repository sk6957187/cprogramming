package intialization_block;

public class Demo {
	static int a;
	static {
		a=10;
	}
	int b;
	{
		b=20;
	}
	public static void main(String[] args) {
		System.out.println("Program starts");
		System.out.println(Demo.a);
		Demo ref = new Demo();
		System.err.println(ref.b);
//		Demo d1 = new Demo();
//		System.out.println(d1.b);
		System.out.println("Program ends");
	}
}
