package ObjectPassingAndReturning;

public class ManiClass3 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Circle c1 = CircleManager.createCircle();
		CircleManager.displayCircle(c1);
		System.out.println("-------------------------");
		Circle c2 = CircleManager.createCircle();
		CircleManager.displayCircle(c2);
	}

}
