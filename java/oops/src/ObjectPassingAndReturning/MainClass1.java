package ObjectPassingAndReturning;

public class MainClass1   {
	public static void main(String[] args) {
		System.out.println("Employee e1:-");
		Employee e1 = EmployeeUtility.createEmployee();
		EmployeeUtility.displayEmployeeDetails(e1);
		System.out.println("\nEmployee e2:-");
		Employee e2 = EmployeeUtility.createEmployee();
		EmployeeUtility.displayEmployeeDetails(e2);
		System.out.println("\nEmployee e3:-");
		Employee e3 = EmployeeUtility.createEmployee();
		EmployeeUtility.displayEmployeeDetails(e3);
		System.out.println("\nEmployee e4:-");
		Employee e4 = EmployeeUtility.createEmployee();
		EmployeeUtility.displayEmployeeDetails(e4);
	}
	
	

}
