package typeCasting;

public class MainClass3 {
	public static void main(String[] args) {
		Biryani b = new Biryani();
		Zomato.addFood(b);
		Pizza p = new Pizza();
		Zomato.addFood(p);
		MasalaDosa md = new MasalaDosa();
		Zomato.addFood(md);
	}
}
