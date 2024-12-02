package inheritance;

class Demo {
	void test() {
		System.out.println("Executing test()...");
	}
}
class Sample extends Demo{
	void disp() {
		System.out.println("Executing dip()...");
	}
}

public class MainClass1 {
	public static void main(String[] args) {
	Demo d = new Demo();
	d.test();
	Sample s = new Sample();
	s.disp(); 
	s.test();
	
	}

}
