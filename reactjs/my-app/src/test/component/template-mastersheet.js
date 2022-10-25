import React from 'react';
import TemplateMastersheetRow from "./template-mastersheet-row";
class TemplateMastersheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return (<div>
            <div>{this.props.zone}</div>
            <div>{this.props.department}</div>
            <div><h1/></div>
            <div>{this.props.section}</div>
            <div>{this.props.neme}</div>
            <TemplateMastersheetRow
                name="Tanmay Sikaar"
                designation="Tech(SM)-1"
                tickedNo="50700770131"
                date="11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 1 2 3 4 5 6 7 8 9 10"
            />
        </div>);
    }
}

export default TemplateMastersheet;

