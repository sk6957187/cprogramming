package downCasting;

class Delta{
	void run() {
		System.out.println("Executing run()..");
	}
}
class Example extends Delta{
	void send() {
		System.out.println("Executing send()...");
	}
}

public class MainClass1 {
	public static void main(String[] args) {
		Delta d = new Example(); //-> Upcasting
		d.run();
		Example e = (Example)d; //-> DownCasting
		e.run();
		e.send();
	}
}
