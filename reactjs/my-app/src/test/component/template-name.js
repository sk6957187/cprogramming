import React from 'react';
class TemplateName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return (<div>
            <div>{this.props.name}</div>
        </div>);
    }
}

export default TemplateName;

