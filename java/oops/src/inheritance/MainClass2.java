package inheritance;

class Alpha {
	int a=10;
	void play() {
		System.out.println("Executing play()..");
	}
}
class Beta extends Alpha {
	int b =20;
	void send() {
		System.out.println("Executing send()..");
	}
}

public class MainClass2 {
	public static void main(String[] args) {
		Beta ref = new Beta();
		System.out.println(ref.a);
		ref.play();
		System.out.println(ref.b);
		ref.send();
	}
}
