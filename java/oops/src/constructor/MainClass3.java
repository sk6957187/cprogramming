package constructor;

class Iphone16{
	Iphone16(){
		System.out.println("Iphone16");
	}
	Iphone16(int a){
		System.out.println("Iphone16 Plus");
	}
	Iphone16(double d){
		System.out.println("Iphone16 Pro");
	}
	Iphone16(String s){
		System.out.println("Iphone16 Pro ax");
	}
}

public class MainClass3 {

	public static void main(String[] args) {
		Iphone16 i1 = new Iphone16();
		Iphone16 i2 = new Iphone16(10);
		Iphone16 i3 = new Iphone16(10.6);
		Iphone16 i4 = new Iphone16("Hi");

	}

}
