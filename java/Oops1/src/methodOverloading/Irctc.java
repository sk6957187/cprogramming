package methodOverloading;

public class Irctc {
	void search(int trainNumber) {
		System.out.println("Search with train number.");
	}
	void search(String src, String dest) {
		System.out.println("Search with src to dest");
	}
	void search(long pnr) {
		System.out.println("Search with PNR");
	}
}
