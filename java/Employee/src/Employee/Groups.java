package Employee;

public class Groups {
    Employee[] employees;
    private int counter;

    public Groups() {
        counter=0;
        employees=new Employee[100];
    }


    public void EmployeeAdd(int count){
//    	Employee temp;
//    	for(int i=0;i<count;i++){
//    		temp = UserService.readEmployee();
//    		employees[counter] = temp;
//    		counter++;
//    	}

        String name2 = "ABC";
        String name1 = "DEF";
        int salary1 = 223;
        int salary2 = 321;
        int employeeId1 = 2;
        int employeeId2 = 1;
        employees[counter] = new Employee(employeeId1, name1, salary1);
        counter++;
        employees[counter] = new Employee(employeeId2, name2, salary2);
        counter++;
    }
    public int getCounter(){
        return counter;
    }
    public void Display(){
        for(int i=0;i<counter;i++)
        {
            System.out.println(employees[i].toString());
            System.out.println("1");
        }
    }
}
