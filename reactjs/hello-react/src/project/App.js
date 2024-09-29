import React, { Component } from 'react';
import Table from './component/Table';
import AddItemButton from './component/AddItemButton';
import axios from 'axios';
import AddData from './component/AddData'

var apiDataLoad = "not_starterd";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            apiDataLoad: "not_starterd",
            data: [],
            showForm: false,
        };
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.saveData = this.saveData.bind(this);
        console.log(this.data);
    }
    loadApiData = () => {
        if (apiDataLoad === "not_starterd") {
            axios.get('http://localhost:8080/api/employees')

            .then(response => {
                console.log(response);
                this.setState({
                    data : response.data.Records,
                    apiDataLoad : "completed"
                });
                apiDataLoad = "completed";
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({
                    data : [],
                    apiDataLoad : "completed"
                });
                apiDataLoad = "completed";
            });
            apiDataLoad = "in_progress";
        }
    };
    componentDidMount() {
        this.loadApiData();
    };
    saveData = (data) => {
        console.log(data);
        var queryParam = "";
        queryParam += "person_id=" + data["personId"];
        queryParam += "&name=" + data["name"];
        queryParam += "&age=" + data["age"];
        queryParam += "&record_date=" + data["recordDate"];
        axios.get('http://localhost:8080/api/employees/add?'+queryParam)
        .then(response => {
            apiDataLoad = "not_starterd";
            this.loadApiData();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    handleShowForm = () => {
        this.setState({ showForm: true }); // Show the form when button is clicked
    };
    handleFormClose = () => {
        this.setState({ showForm: false }); // Hide the form
    };
    handleFormSubmit = (currentData) => {
        var data = this.state.data;
        data.push(currentData)
        this.setState({
            data : data
        });
    }

    render(){
        var methods = {onSubmit: this.handleFormSubmit, saveData: this.saveData};
        return(
            <div className="App">
                <AddItemButton onClick={this.handleShowForm} />
                {this.state.showForm && <AddData onCancel={this.handleFormClose} methods={methods}/>}
                <Table data={this.state.data}/>
            </div>
        );
  }
}

export default App;
