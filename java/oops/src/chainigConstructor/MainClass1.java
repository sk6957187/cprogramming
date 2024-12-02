package chainigConstructor;

class Hotel{
	Hotel(){
		System.out.println("KFC");
	}
	Hotel(int a){
		this("and");
		System.out.println("Dominoes");
	}
	Hotel(String s){
		this();
		System.out.println("McDonalds");
	}
}

public class MainClass1 {
	public static void main(String[] args) {
		Hotel h1 = new Hotel(1);
		
	}

}
