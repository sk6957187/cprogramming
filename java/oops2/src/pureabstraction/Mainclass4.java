package pureabstraction;

interface Apollo{
	void run();
}
interface Bravo extends Apollo {
	void push();
}
class Discovery implements Bravo {
	@Override
	public void run() {
		System.out.println("run()...");
	}
	@Override
	public void push() {
		System.out.println("push()....");
	}
}
public class Mainclass4 {
	public static void main(String[] args) {
		Discovery d = new Discovery();
		d.run();
		d.push();
	}
}
