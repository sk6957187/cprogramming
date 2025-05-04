import React, { Component } from "react";
import axios from 'axios';

class Data extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(response => {
                console.log(response.data.results);
                this.setState({
                    data: response.data.results
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div>
                <h1>Welcome</h1>

                {/* Check if data is available before rendering */}
                {this.state.data.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} style={{ borderRadius: '50%' }}/>
                                    </td>
                                    <td>{user.name.first} {user.name.last}</td>
                                    <td>{user.email}</td>
                                    <td>{user.location.city}, {user.location.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        );
    }
}

export default Data;
