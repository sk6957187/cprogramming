package ObjectPassingAndReturning;

public class MainClass2 {

	public static void main(String[] args) {
		Product p1 = ProductHelper.createProduct();
		ProductHelper.displayProductInfo(p1);
		System.out.println("--------------------------");
		Product p2 = ProductHelper.createProduct();
		ProductHelper.displayProductInfo(p2);

	}

}
