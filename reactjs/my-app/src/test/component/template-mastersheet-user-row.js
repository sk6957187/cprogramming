import React from 'react';

class TemplateMastersheetUserRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        var dataLoop = this.props.dataLoop;
        return (<tr className="text-center user-row">
                <td>{this.props.name}</td>
                <td>{this.props.designation}</td>
                <td>{this.props.tickedNo}</td>
                {dataLoop.map((el, i) =>
                    <td key={i}></td>
                )}
            </tr>);
    }
}

export default TemplateMastersheetUserRow;

