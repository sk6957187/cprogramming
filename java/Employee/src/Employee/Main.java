package Employee;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Groups A = new Groups();

        Scanner sc=new Scanner(System.in);
        System.out.println("How many Employees you Want To Add_________");
        int count = 2;
//        count = sc.nextInt();
        A.EmployeeAdd(count);


        System.out.println("All The Employees are_________");
        A.Display();
        System.out.println("Enter (1) for Sort By Employee Id (2) for sort by Employee Name (3) for Sort By Salary");
        int choice=sc.nextInt();
        Comparison C = new Comparison();
        switch (choice) {
            case 1:
                Idsort id=C;
                id.SortbyID(A);
                break;
            case 2:
                NameSort name=C;
                name.sortByName(A);
                break;
            case 3:
                SalarySort sal=C;
                sal.SortbySalary(A);
                break;
            default:
                System.out.println("Invalid..");
        }
        A.Display();
        System.out.println("Program end.");
    }
}