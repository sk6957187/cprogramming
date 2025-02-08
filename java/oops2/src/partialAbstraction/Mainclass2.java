package partialAbstraction;

abstract class Alpha{
	abstract void play();
	void run() {
		System.out.println("Executing run()..");
	}
}
class Beta extends Alpha{
	@Override
	void play() {
		System.out.println("Executing play()...");
	}
}
public class Mainclass2 {
	public static void main(String[] args) {
		Alpha a = new Beta();
		a.play();
		a.run();
	}
}
