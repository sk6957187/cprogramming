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
        var templateData = {};
        var pageData = this.props.pageData;
        templateData.zone = this.props.zone;
        templateData.department = this.props.department;
        templateData.billUnitNo = "xyz-pqr";
        templateData.username1 = "Username1";
        templateData.designation1 = "designation1";
        templateData.tickedNo1 = "PF-number-1";
        templateData.username2 = "Username-2";
        templateData.designation2 = "designation2";
        templateData.tickedNo2 = "PF-number-2";
        templateData.username3 = "Username-3";
        templateData.designation3 = "designation3";
        templateData.tickedNo3 = "PF-number-3";
        templateData.headquater = "HQ-XYZ";

        return (<div>
            <table className="table"><tbody>
                <tr className="no-border">
                    <th className="text-center"><h3>{templateData.zone}</h3> </th>
                    <td className="text-right"> G-91 (L)</td>
                </tr>
                <tr className="no-border">
                    <td></td>
                    <td className="text-right"> G-91 (L) </td>
                </tr>
            </tbody></table>
            <table className="table"><tbody>
                <tr className= "no-border">
                    <th className="text-center">{templateData.department}</th>
                    <th className="text-center">(Bill unit no.: {templateData.billUnitNo})</th>
                </tr>
            </tbody></table>
            <table className="table"><tbody>
                <tr className="no-border">
                    <td>no........</td>
                    <td>section...........</td>
                    <td>Office: <b>SSE/Sig/MURI</b></td>
                    <td>Shop NO .................</td>
                    <td>W.O ..................For....................20....</td>
                </tr>
            </tbody></table>
            <TemplateMastersheetRow
                name1={templateData.username1}
                designation1={templateData.designation1}
                tickedNo1={templateData.tickedNo1}
                name2={templateData.username2}
                designation2={templateData.designation2}
                tickedNo2={templateData.tickedNo2}
                name3={templateData.username3}
                designation3={templateData.designation3}
                tickedNo3={templateData.tickedNo3}
                headquater={templateData.headquater}
            />
            <div>{this.props.checked}</div>
            <div>{this.props.division}</div>
        </div>);
    }
}

export default TemplateMastersheet;

