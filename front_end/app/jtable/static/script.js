$(document).ready(function () {         
   $('#MyTableContainer').jtable({
        title: 'Table of people',
        columnResizable: false,
        //General options comes here

        actions: {
            listAction: '/GettingStarted/PersonList',
            createAction: '/GettingStarted/CreatePerson',
            updateAction: '/GettingStarted/UpdatePerson',
            deleteAction: '/GettingStarted/DeletePerson'
        },
        fields: {
            PersonId: {
                key: true,
                list: false
            },
            Name: {
                title: 'Author Name',
                width: '40%'
            },
            Age: {
                title: 'Age',
                width: '20%'
            },
            RecordDate: {
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
