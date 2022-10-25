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
                section="No....Section....Office SSE/MURI Shop NO ...."
                neme="Name Designation Ticked N0. Date  11.12.2022-10.01.2023  Total NO. of days"
            />;
    }
}

export default App;

