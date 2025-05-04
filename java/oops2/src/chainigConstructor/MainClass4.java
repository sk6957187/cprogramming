package chainigConstructor;

class Demo{
	Demo(){
		System.out.println("Demo()...");
	}
}
class Sample extends Demo{
	Sample(){
		super();
		System.out.println("Sample()....");
	}
}

public class MainClass4 {
	public static void main(String[] args) {
		Sample s  = new Sample();
	}

}
