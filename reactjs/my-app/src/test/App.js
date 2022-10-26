import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import TemplateAadhar from "./component/template-Aadhar";
// import TemplateName from "./component/template-name";
import TemplateMastersheet from "./component/template-mastersheet";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return <TemplateMastersheet
                zone="S.E.R"
                department=".....S&T.....Department"
                section=".1"
                checked="Checked by ........"
                division="SER/PP/KGP (DTP)-4-2011"
            />;
    }
}

export default App;

