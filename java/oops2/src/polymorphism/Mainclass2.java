package polymorphism;

class Whatsapp{
	void send(String s) {
		System.out.println("Text Message");
	}
	void send(Audio a) {	//Audio class created in Dummy file
		System.out.println("Audio Message");
	}
	void send(Image i) {	//Image class created in Dummy file
		System.out.println("Image Message");
	}
	void send(Video v) {	//Video class created in Dummy file
		System.out.println("Video Message");
	}
}
public class Mainclass2 {
	public static void main(String[] args) {
		Whatsapp ref = new Whatsapp();
		Rref.send("Hello");
		ref.send(new Audio());
		ref.send(new Video());
		ref.send(new Image());
	}
}
