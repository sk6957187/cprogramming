package downCasting;

public class Zepto {
	static void buyVegetables(Vegetable p) {
		if(p instanceof potato) {
			System.out.println("Potato in Kg");
		}
		else if(p instanceof Lemon) {
			System.out.println("lemon in piece");
		}
		else if(p instanceof Coriander) {
			System.out.println("Coriander in Bundles");
		}
	}
}
