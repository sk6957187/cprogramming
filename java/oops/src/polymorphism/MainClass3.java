package polymorphism;
class TestScript{
	void test(int a) {
		System.out.println(" AD_HOC_testing...");
	}
	void test(double d) {
		System.out.println(" santity_testing...");
	}
	void test(String s) {
		System.out.println(" Regresstion_testing...");
	}
}
public class MainClass3 {
	public static void main(String[] args) {
		TestScript t=new TestScript();
		t.test(1);
		t.test(234.88D);
		t.test("sumit");
	}

}
