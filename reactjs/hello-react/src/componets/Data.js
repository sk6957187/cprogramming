import React, { Component } from "react";
import axios from 'axios';

class Data extends Component {
    state={
        data : []
    }

    componentDidMount(){
        axios.get('https://randomuser.me/api/?results=10')
        .then(response => {
            console.log(response.data.results);
            this.setState({
                data : response.data.results
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });   
    }
    

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <h3>{this.state.data.map((item, key) => <UserInfo key = {key} {...item} />)}</h3>
            </div>
        )
    }
}

function UserInfo({ 
    name, email, location, dob, phone, picture 
}) {
    return (
        <div >
            <img src={picture.thumbnail} alt="User Thumbnail" />
            <p>Name: {name.title}{name.first} {name.last}</p>
            <p>Email: {email}</p>
            <p>Location: {location.city}, {location.country}</p>
            <p>Date of Birth: {new Date(dob.date).toLocaleDateString()}</p>
            <p>Phone: {phone}</p>
        </div>
    );
}

export default Data