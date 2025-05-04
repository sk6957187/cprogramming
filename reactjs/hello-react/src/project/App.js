import React, { Component } from 'react';
import Table from './component/Table';
import AddItemButton from './component/AddItemButton';
import axios from 'axios';
import AddData from './component/AddData'
//import { Popconfirm, Table, Button, Space, Input, Form } from 'antd';
import { Button, Space, Input} from 'antd';
var apiDataLoad = "not_starterd";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            apiDataLoad: "not_starterd",
            data: [],
            filteredData:[],
            showForm: false,
            searchText:"",
        };
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.saveData = this.saveData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.globalSearch = this.globalSearch.bind(this);
        console.log(this.data);
    }
    loadApiData = () => {
        if (this.state.apiDataLoad === "not_starterd") {
            this.setState({ apiDataLoad: "in_progress" });
            axios.get('http://localhost:8080/api/employees')

            .then(response => {
                console.log(response);
                this.setState({
                    data : response.data.Records,
                    filteredData: response.data.Records,
                    apiDataLoad : "completed"
                });
                apiDataLoad = "completed";
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({
                    data : [],
                    filteredData:[],
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
        .then(() => {
            this.setState({apiDataLoad: "not_starterd"});
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
        this.setState({data : data});
    }
    handleSearch = (e) => {
        this.setState({ searchText: e.target.value });
    };
    globalSearch = () =>{
        const {data, searchText} = this.state;
        const filteredData = data.filter(item => 
            item.name.toLowerCase().includes(searchText.toLowerCase())||
            item.age.toString().includes(searchText) ||
            item.personId.toString().includes(searchText)
        );
        this.setState({filteredData});
    };
    highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) => 
            part.toLowerCase() === highlight.toLowerCase() ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
        );
    };


    render(){
        //const { searchText, filteredData } = this.state;
        var searchText = this.state.searchText;
        var filteredData = this.state.filteredData;
        var methods = {onSubmit: this.handleFormSubmit, saveData: this.saveData};
        return(
            <div className="Table">
                <Space className="d-grid gap-2 d-md-flex justify-content-md-end"   style = {{marginBottom: 16}}>
                    <Input placeholder="Enter Search Text" onChange={this.handleSearch} type="text" allowClear value={this.state.searchText} />
                    <Button type="primary"  onClick={this.globalSearch}>Search</Button>
                </Space>
                <AddItemButton onClick={this.handleShowForm} />
                {this.state.showForm && <AddData onCancel={this.handleFormClose} methods={methods}/>}
                <Table data={filteredData.map(item => ({
                        ...item,
                        name: this.highlightText(item.name, searchText),
                        age: this.highlightText(item.age.toString(), searchText),
                        personId: this.highlightText(item.personId.toString(),searchText)
                    }))}
                />
            </div>
        );
  }
}

export default App;
