package class_object;

class Pen{
	double price;
	String color;
	void writing() {
		System.out.println("Writing pen cost : "+ price);
	}
	void drawing() {
		System.out.println("Drawing pen color is : "+color);
	}
}

public class Program1 {
	public static void main(String[] args) {
		Pen p1 = new Pen();
		p1.price = 10;
		p1.color = "Blue";
		p1.writing();
		
		Pen p2 = new Pen();
		p2.price = 20;
		p2.color = "Black";
		p2.drawing();
		
		Pen p3 = new Pen();
		p3.price = 30;
		p3.color = "red";
		p3.drawing();
		p3.writing();
	}
}
