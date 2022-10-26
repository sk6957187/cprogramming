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
            <table className="table"><tbody>
                <tr>
                    <th className="text-center">{this.props.zone} </th>
                    <th className="text-right"> G-91 (L)</th>
                </tr>
                <tr>
                    <td></td>
                    <td className="text-right"> G-91 (L) </td>
                </tr>
            </tbody></table>
            <table className="table"><tbody>
                <tr>
                    <th className="text-center">{this.props.department}</th>
                    <th className="text-justify">(Bill unit no.: xyz-pqr)</th>
                </tr>

            </tbody></table>
            <div><h1/></div>
            <table className="table"><tbody>
                <tr>
                    <td>no........</td>
                    <td>section...........</td>
                    <td>Office: <b>SSE/MURI</b></td>
                    <td>Shop NO .................</td>
                    <td>W.O ..................For....................20....</td>
                </tr>
            </tbody></table>
            <TemplateMastersheetRow
                date="11 12 13 14"
                name1="Username-1"
                designation1="designation1"
                tickedNo1="PF-number-1"
                name2="Username-2"
                designation2="designation2"
                tickedNo2="PF-number-2"
                name3="Username-3"
                designation3="designation3"
                tickedNo3="PF-number-3"
            />
            <div>{this.props.checked}</div>
            <div>{this.props.division}</div>
        </div>);
    }
}

export default TemplateMastersheet;

