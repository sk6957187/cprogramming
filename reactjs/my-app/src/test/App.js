import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import TemplateAadhar from "./component/template-Aadhar";
// import TemplateName from "./component/template-name";
import TemplateMastersheet from "./component/template-mastersheet";
import DataHandler from "./common/DataHandler";
var dataLoadStatus = "not-started";
var items;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
        console.log("App.constructor");
    }
    componentDidMount() {
        console.log("App.componentDidMount");
        if (dataLoadStatus !== "not-started") {
            return;
        }
        dataLoadStatus = "in-progress";
        fetch("/static/data/template-data.csv")
          .then(res => res.text())
          .then(
            (result) => {
                dataLoadStatus = "completed";
                console.log("ApiResponse received");
                items = result;
              this.setState({
                isLoaded: false
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              // this.setState({
              //   isLoaded: false,
              // });
            }
          )
    }
    render() {
        console.log("App.render");
        var result = items;
        var resultArray = [], i;
        var pageData = [
            {pageName: 'page-1', username: 'Username-111', designation: 'Designation-11', pf_number: 'Ticket no-1', hq: 'hq', bill_unit_no: "bill-unit-no"},
            {pageName: 'page-1', username: 'Username-222', designation: 'Designation-1', pf_number: 'Ticket no-1', hq: 'hq', bill_unit_no: "bill-unit-no"},
            {pageName: 'page-1', username: 'Username-3', designation: 'Designation-1', pf_number: 'Ticket no-1', hq: 'hq', bill_unit_no: "bill-unit-no"}
        ];
        var templateData = [pageData[0]];//DataHandler.getTableData(result);
        
        pageData = null;
        var printData = [];
        for (i=0; i<templateData.length; i++) {
            printData.push(
                <TemplateMastersheet
                    key={i}
                    pageData={templateData[i]}
                    zone="S.E.R"
                    department="............S&T..............Department"
                    checked="Checked by ........"
                    division="SER/PP/KGP (DTP)-4-2011"
                />
            );
        }
        return printData;
    }
}

export default App;

