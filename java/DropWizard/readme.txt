15.08.2024
---------------
Main function --> Dropwizard Application.run()
Controller --> new Service and new dB
service --> db.update() --> db.getEmployeeData() --> db.readFileData() --> db.convertFileDataToEmployeeData()


/employees
---------------
Read data from file and return json data
controller.getEmployees() --> service.getEmployee() -->db.update() --> employeeCsv.getEmployees() --> employee.value()


