package typeCasting;

public class MainClass2 {
	public static void main(String[] args) {
		Apple a = new Apple();
		FruitBasket.addToBasket(a);
		Mango b = new Mango();
		FruitBasket.addToBasket(b);
		Grape g = new Grape();
		FruitBasket.addToBasket(g);
		Orange o = new Orange();
		FruitBasket.addToBasket(o);
	}
}
