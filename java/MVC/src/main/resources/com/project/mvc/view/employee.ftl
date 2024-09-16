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
                <td>${employee.personId} </td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.recordDate}</td>
            </tr>
        </#list>
    </table>
    <br>

</div>
</body>
</html>