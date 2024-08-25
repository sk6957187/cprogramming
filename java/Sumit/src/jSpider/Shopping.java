package jSpider;

public class Shopping {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int t1 =599; int t2=799; int t3=399;
		int p1=2499;
		float tD=20;
		float tP = 30;
		int totalT = t1+t2+t3;
		float disT= totalT * tD/100;
		float disP = p1 * tP /100;
		float totalShop=totalT-disT+p1-disP;
		System.out.println("Total price is: "+totalShop);

	}

}
