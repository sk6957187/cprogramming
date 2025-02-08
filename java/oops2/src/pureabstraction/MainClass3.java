package pureabstraction;
interface Alpha {
	void test();
}
interface Beta {
	void send();
}
class Gamma implements Alpha,Beta {
	@Override
	public void send() {
		System.out.println("send()...");
	}
	@Override
	public void test() {
		System.out.println("Test()...");
	}
}
public class MainClass3 {
	public static void main(String[] args) {
		Gamma ref = new Gamma();
		ref.send();
		ref.test();
	}
}
