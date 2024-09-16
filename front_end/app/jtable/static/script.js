$(document).ready(function () {         
   $('#MyTableContainer').jtable({
        title: 'Table of people',
        columnResizable: false,
        sorting: true,
        paging: true,
        actions: {
            listAction: 'http://localhost:8080/employees',
            createAction: 'http://localhost:8080/GettingStarted/CreatePerson',
            updateAction: 'http://localhost:8080/GettingStarted/UpdatePerson',
            deleteAction: 'http://localhost:8080/GettingStarted/DeletePerson'
        },
        fields: {
            personId: {
                key: true,
                list: false
            },
            name: {
                title: 'Author Name',
                width: '40%'
            },
            age: {
                title: 'Age',
                width: '20%'
            },
            recordDate: {
                title: 'Record date',
                width: '30%',
                type: 'date',
                create: false,
                edit: false
            }
        }
    });
    $('#MyTableContainer').jtable('load'); 
});
