package polymorphism;

class Irctc{
	void search(int trainNumber) {
		System.out.println("Train Schedule.");
	}
	void search(String src, String dest) {
		System.out.println("List of train.");
	}
	void search(String pnr) {
		System.out.println("Ticket Details");
	}
}
public class Mainclass1 {
	public static void main(String[] args) {
		Irctc obj = new Irctc();
		obj.search(12391);
		obj.search("KSR","MAS");
		obj.search("J123456");
	}

}
