$(document).ready(function() {
var baseApiUrl = "http://localhost:8080";
function displayData(data) {
var records = data["Records"];
var recordHtml = "";
var inputForm = "<form>";
inputForm += "</form>";
var actionButton = "<button type='button' class='btn btn-primary' onclick='showForm()'>click here</button>";
for (var i=0; i<records.length; i++) {
    recordHtml += "<tr><td>"+records[i]["personId"]+"</td>";
    recordHtml += "<td>"+records[i]["name"]+"</td>";
    recordHtml += "<td>"+records[i]["age"]+"</td>";
    recordHtml += "<td>"+records[i]["recordDate"]+"</td></tr>";
}
var finalHtml = "<table class='table'>" + recordHtml + "</table>" + inputForm + actionButton;
$("#container").html(finalHtml);
}
function getData() {
$.get(baseApiUrl + "/api/employees", function(data, status){
    displayData(data);
});
}
getData();
});

// Array to store employee data
const employees = [];

// JavaScript function to show the form
function showForm() {
document.getElementById('employeeForm').style.display = 'block';
}
// Function to add employee data to array and display it in the table
function addEmployee() {

// Get form values
const personId = document.getElementsByName('person_id')[0].value;
const name = document.getElementsByName('name')[0].value;
const age = document.getElementsByName('age')[0].value;
const recordDate = document.getElementsByName('record_date')[0].value;
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