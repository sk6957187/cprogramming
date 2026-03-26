<html lang="en">
<body>
    <div>
        <h1>Hello!!</h1>
        <table border="1">
            <tr>
                <th>Person ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Record Date</th>
            </tr>
            <#list employees as employee>
                <tr>
                    <td>${employee.personId}</td>
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                    <td>${employee.recordDate}</td>
                </tr>
            </#list>
        </table>

        <!-- Button to show the form -->
        <button onclick="showForm()">Add new Employee</button>


        <!-- Table for displaying employee data -->
        <h2>Employee List</h2>
        <table>
            <thead>
                <tr>
                    <th>Person ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Record Date</th>
                </tr>
            </thead>
            <tbody id="employeeTable">
                <!-- Dynamic content will be added here -->
            </tbody>
        </table>


        <!-- Form for user input, initially hidden -->
        <div id="employeeForm" style="display: none;">
            <h1>Enter Employee Details</h1>
            <form id="employeeFormElement" action="/api/employees/view/add">
            <table border="1">
                <tr>
                    <th>Person ID (max 3 digits)</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Record Date</th>
                </tr>
                <tr>
                    <td><input type="text" name="person_id" maxlength="3" required></td>
                    <td><input type="text" name="name" required></td>
                    <td><input type="number" name="age" min="0" required></td>
                    <td><input type="date" name="record_date" required></td>
                </tr>
            </table>
            <br>
            <input type="submit" value="Submit">
            </form>
        </div>
    </div>

    <script>
        // Array to store employee data
        const employees = [];

        // JavaScript function to show the form
        function showForm() {
            document.getElementById('employeeForm').style.display = 'block';
        }
        // Function to add employee data to array and display it in the table
        function addEmployee(event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const personId = document.getElementsByName('personId')[0].value;
            const name = document.getElementsByName('name')[0].value;
            const age = document.getElementsByName('age')[0].value;
            const recordDate = document.getElementsByName('recordDate')[0].value;
            // Create a new employee object
            const newEmployee = {
                 personId: personId,
                 name: name,
                 age: age,
                 recordDate: recordDate
            };
            employees.push(newEmployee);


                    // Update the table to display the new employee
                    const employeeTable = document.getElementById('employeeTable');
                    const newRow = employeeTable.insertRow();
                    var newRowItem = "<tr><td>"+newEmployee.personId+"</td>";
                    newRowItem = newRowItem + "<td>"+newEmployee.name+"</td>";
                    newRowItem = newRowItem + "<td>"+newEmployee.age+"</td>";
                    newRowItem = newRowItem + "<td>"+newEmployee.recordDate+"</td></tr>";
                    newRow.innerHTML = newRowItem;

                    // Hide the form after submission
                    document.getElementById('employeeForm').style.display = 'none';

                    // Clear the form inputs
                    document.getElementById('employeeFormElement').reset();
        }
    </script>
</body>
</html>
