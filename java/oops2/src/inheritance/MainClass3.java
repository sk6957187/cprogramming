package inheritance;

class AdobeFree{
	void read() {
		System.out.println("Read()..");
	}
}
class AdobePaid extends AdobeFree {
	void write() {
		System.out.println("Write()...");
	}
	void modify() {
		System.out.println("Modify...");
	}
}

public class MainClass3 {
	public static void main(String[] args) {
		AdobeFree a1 = new AdobeFree();
		a1.read();
		AdobePaid a2 = new AdobePaid();
		a2.read();
		a2.write();
		a2.modify();
	}

}
