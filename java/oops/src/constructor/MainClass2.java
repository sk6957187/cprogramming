package constructor;

class Employee{
	Employee(double ctc){
		System.out.println("Engineer");
	}
	Employee(double d, int bonus){
		System.out.println("Team Leader");
	}
	Employee(double d, int bonus, int incentives){
		System.out.println("Manager");
	}
}

public class MainClass2 {
	public static void main(String[] args) {
		Employee a1 = new Employee(3.5);
		Employee a2 = new Employee(3.5,2);
		Employee a3 = new Employee(3.5,2,6);
	}

}
