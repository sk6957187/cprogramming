import React from 'react';
import "./module02.css";
class Module02 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return <div><h1>Introduction</h1>
        <div className="username">Name- Sumit Kumar</div> 
        <div>B.Tech- Haldia Institute Of technology </div>
        <div>Branch- Electronics And Communication Engineering</div>
        <h2>Image</h2>
        <img src="Image.jpg" width="250" height="300"/>
        <h2>My facebook link</h2>
        <a href="https://www.facebook.com/profile.php?id=100008807775895" target="_blank" > profile</a></div>
    }
}

export default Module02;

