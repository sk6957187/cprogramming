package chainigConstructor;

class City{
	City(){
		System.out.println("NEW YORK");
	}
	City(int a){
		this();
		System.out.println("LONDON");
	}
	City(double d){
		this(10);
		System.out.println("PARIS");
	}
}

public class MainClass2 {
	public static void main(String[] args) {
		City c1 = new City(1.2);
	}

}
