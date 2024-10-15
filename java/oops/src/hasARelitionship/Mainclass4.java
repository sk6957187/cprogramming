package hasARelitionship;

class Printer{
	void write() {
		System.out.println("Write()...");
	}
	void write(int a) {
		System.out.println("Write(int)..");
	}
}
class Computer{
	static Printer out = new Printer();
}
public class Mainclass4 {
	public static void main(String[] args) {
		Computer.out.write();
		Computer.out.write(10);
	}
}
