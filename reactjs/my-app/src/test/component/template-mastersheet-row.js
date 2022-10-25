import React from 'react';
class TemplateMastersheetRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        return (<table>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>{this.props.date}</td>
            </tr>
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.designation}</td>
                <td>{this.props.tickedNo}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>);
    }
}

export default TemplateMastersheetRow;

