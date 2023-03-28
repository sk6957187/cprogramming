package Employee;

import java.util.Scanner;

public class UserService {
    static Employee readEmployee() {
        String name;
        int employeeId, salary;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Employee ID : ");
        employeeId = sc.nextInt();
        System.out.println("Enter Employee Name : ");
        name = sc.next();
        System.out.println("Enter The Salary : ");
        salary = sc.nextInt();
        return new Employee(employeeId, name, salary);
    }
}
