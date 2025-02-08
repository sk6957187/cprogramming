package typeCasting;

class A{
	void test() {
		System.out.println("Executing test()...");
	}
}
class B extends A{
	void disp() {
		System.out.println("disp()....");
	}
}
class C extends B{
	void play() {
		System.out.println("play()....");
	}
}
public class MainClass1 {
	public static void main(String[] args) {
		C c1 = new C();
		c1.test();
		c1.disp();
		c1.play();
		B b1 = c1;	//Upcasting: c->B
		b1.test();
		b1.disp();
		A a1 = b1;	//Upcasting: B->A
		a1.test();
		A a2 = new C();	//Upcasting: C--->A
		a2.test();
	}
}
