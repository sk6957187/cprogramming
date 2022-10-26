import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import TemplateAadhar from "./component/template-Aadhar";
// import TemplateName from "./component/template-name";
import TemplateMastersheet from "./component/template-mastersheet";
import DataHandler from "./common/DataHandler";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
    fetch("/static/data/template-data.csv")
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    render() {
        var result = this.state.items;
        var resultArray = [], i;
        var templateData = DataHandler.getTableData(result);
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

