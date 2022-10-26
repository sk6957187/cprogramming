import React from 'react';
class TemplateAadhar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return (<div>
            <div>{this.props.name}</div>
            <div>{this.props.aadhar}</div>
        </div>);
    }
}

export default TemplateAadhar;

