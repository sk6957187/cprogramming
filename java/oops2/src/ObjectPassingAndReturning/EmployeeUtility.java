package ObjectPassingAndReturning;

import java.util.Scanner;

public class EmployeeUtility {
	static void displayEmployeeDetails(Employee e) {
		System.out.println("EID "+ e.eid);
		System.out.println("CTC "+e.ctc);
	}
	static Employee createEmployee() {
		Scanner sc = new Scanner(System.in);
		System.out.println("Enter EID");
		int id = sc.nextInt();
		System.out.println("Enter CTC");
		double c = sc.nextDouble();
		Employee emp = new Employee(id,c);
		return emp;
	}

}
