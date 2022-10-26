import React from 'react';
import TemplateMastersheetUserRow from "./template-mastersheet-user-row";
class TemplateMastersheetRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        var dataLoop = [11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10, "",""];
        return (<table className="table-bordered"><tbody>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Ticked No.</th>
                    <th colSpan="16">Date</th>
                    <th colSpan="4">Period</th>
                    <th colSpan="7">11.11.2022 - 10.12.2022</th>
                    <th colSpan="4"></th>
                    <th>Total NO. of days</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    {dataLoop.map((x, i) =>
                        <td>{x}</td>
                    )}
                </tr>

            <TemplateMastersheetUserRow
                name = {this.props.name1}
                designation = {this.props.designation1}
                tickedNo = {this.props.tickedNo1}         
                dataLoop = {dataLoop}
            />
            <TemplateMastersheetUserRow
                name = {this.props.name2}
                designation = {this.props.designation2}
                tickedNo = {this.props.tickedNo2}         
                dataLoop = {dataLoop}
            />
            <TemplateMastersheetUserRow
                name = {this.props.name3}
                designation = {this.props.designation3}
                tickedNo = {this.props.tickedNo3}         
                dataLoop = {dataLoop}
            />
        </tbody></table>);
    }
}

export default TemplateMastersheetRow;

