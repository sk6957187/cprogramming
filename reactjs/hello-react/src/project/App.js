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
        console.log("0-0");
    }
    componentDidMount() {
        console.log("0-0-0");
        return;
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
    }

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
        console.log(0);
        var methods = {onSubmit: this.handleFormSubmit};
        return(
            <div className="App">
                <Table data={this.state.data}/>
                <AddItemButton onClick={this.handleShowForm} />
                {this.state.showForm && <AddData onCancel={this.handleFormClose} methods={methods}/>}
                
            </div>
        );
  }
}

export default App;
