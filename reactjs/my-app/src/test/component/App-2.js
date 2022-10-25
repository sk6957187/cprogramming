import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TemplateAadhar from "./component/template-Aadhar";
// import TemplateName from "./component/template-name";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return <TemplateAadhar name="asd" aadhar="1234"/>;
    }
}

export default App;

