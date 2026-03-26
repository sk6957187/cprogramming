package methodOverloading;

public class MainClass2 {
	public static void main(String[] args) {
		Irctc ref = new Irctc();
		ref.search(12091);
		ref.search("KSR", "PNBE");
		ref.search(1233456789097L);
	}
	
}
