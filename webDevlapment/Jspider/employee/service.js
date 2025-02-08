let employeeCount = 0;
let employees =  []; 

if (employees.length > 0) {
    employeeCount = employees[employees.length - 1].id; 
}

document.getElementById("employeeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("eName").value;
    let company = document.getElementById("company").value;
    let email = document.getElementById("eEmail").value;
    let mobile = document.getElementById("mobNo").value;
    let address = document.getElementById("add").value;

    if (!name || !company || !email || !mobile || !address) {
        alert("All fields are required!");
        return;
    }

    employeeCount++;

    let newEmployee = {
        id: employeeCount,
        name,
        company,
        email,
        mobile,
        address
    };

    employees.push(newEmployee);

    updateEmployeeTable();
    document.getElementById("employeeForm").reset();
});

function updateEmployeeTable() {
    let table = document.getElementById("employeeTable");
    table.innerHTML = '';

    employees.forEach(employee => {
        let head=["id", "name", "company", "email", "mobile", "address"];

        let tr = document.createElement("tr");
        head.forEach(key => {
            let td = document.createElement("td");
            td.textContent = employee[key];
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateEmployeeTable();
});
