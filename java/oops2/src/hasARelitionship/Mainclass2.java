package hasARelitionship;

class Engine{
	void power() {
		System.out.println("Power()......");
	}
}
class Driver{
	void driver() {
		System.out.println("Driver()............");
	}
}
class Car{
	Engine eng = new Engine();	//Composition -> Car has-a Engine
	Driver dr = new Driver();	//Aggregation -> Car has-a Driver
}
public class Mainclass2 {
	public static void main(String[] args) {
		Car cr = new Car();
		cr.eng.power();
		cr.dr.driver();
	}
}
