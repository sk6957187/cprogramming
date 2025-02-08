package pureabstraction;
interface Delta {
	void play();
	void disp();
}
class Example implements Delta {
	@Override
	public void disp() {
		System.out.println("Disp()....");
	}
	@Override
	public void play() {
		System.out.println("Play()...");
	}
}
public class Mainclass2 {
	public static void main(String[] args) {
		Delta ref = new Example();
		ref.play();
		ref.disp();
	}
}
