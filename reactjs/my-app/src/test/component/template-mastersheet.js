import React from 'react';
import DataHandler from "../common/DataHandler";
import TemplateMastersheetRow from "./template-mastersheet-row";
class TemplateMastersheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    render() {
        console.log("TemplateMastersheet:render");
        var templateData = {};
        var pageData = this.props.pageData;
        templateData.zone = this.props.zone;
        templateData.department = this.props.department;
        templateData.billUnitNo =  "";
        templateData.username1 = "";
        templateData.designation1 = "";
        templateData.tickedNo1 = "";
        templateData.username2 = "";
        templateData.designation2 = "";
        templateData.tickedNo2 = "";
        templateData.username3 = "";
        templateData.designation3 = "";
        templateData.tickedNo3 = "";
        if (DataHandler.isArray(pageData)) {
             if (pageData.length > 0 && DataHandler.isObject(pageData[0])) {
                templateData.username1 = pageData[0].username;
                templateData.designation1 = pageData[0].designation;
                templateData.tickedNo1 = pageData[0].pf_number;
                templateData.billUnitNo =  pageData[0].bill_unit_no;
                templateData.headquater = pageData[0].hq;
            }
            if (pageData.length > 1 && DataHandler.isObject(pageData[1])) {
                templateData.username2 = pageData[1].username;
                templateData.designation2 = pageData[1].designation;
                templateData.tickedNo2 = pageData[1].pf_number;
            }
            if (pageData.length > 2 && DataHandler.isObject(pageData[2])) {
                templateData.username3 = pageData[2].username;
                templateData.designation3 = pageData[2].designation;
                templateData.tickedNo3 = pageData[2].pf_number;
            }
        }
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

