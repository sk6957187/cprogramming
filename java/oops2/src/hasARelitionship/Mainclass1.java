package hasARelitionship;

class Demo{
	void test() {
		System.out.println("Executing test()..");
	}
}
class Sample{
	Demo ref = new Demo();
}

public class Mainclass1 {
	public static void main(String[] args) {
		Sample obj = new Sample();
		obj.ref.test();
	}
}
