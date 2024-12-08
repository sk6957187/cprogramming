package partialAbstraction;

abstract class Demo{
	abstract void test();
	abstract void disp();
}
class Sample extends Demo {
	@Override
	void test() {
		System.out.println("Executing test()..");
	}
	@Override
	void disp() {
		System.out.println("Executing disp....");
	}
}
public class Mainclass1 {
	public static void main(String[] args) {
		Demo d1 = new Sample();
		d1.test();
		d1.disp();
	}
}
