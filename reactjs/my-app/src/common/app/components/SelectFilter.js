import React from 'react';
import $S from "../../../interface/stack.js";


class SelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        $S.log("SelectFilter:componentDidMount");
    }
    render() {
        var self = this;
        var list1Data = this.props.data.list1Data;
        var list2Data = this.props.data.list2Data;
        var list3Data = this.props.data.list3Data;
        var dateSelection = this.props.data.dateSelection;
        var dateSelectionRequiredPages = this.props.data.dateSelectionRequiredPages;

        var list1ItemNotFound = true;
        var list2ItemNotFound = true;
        var list3ItemNotFound = true;

        if (!$S.isArray(list1Data)) {
            list1Data = [];
        }
        if (!$S.isArray(list2Data)) {
            list2Data = [];
        }
        if (!$S.isArray(list3Data)) {
            list3Data = [];
        }
        if (!$S.isArray(dateSelection)) {
            dateSelection = [];
        }
        if (!$S.isArray(dateSelectionRequiredPages)) {
            dateSelectionRequiredPages = [];
        }
        var list1Dropdown = list1Data.map(function(el, i, arr) {
            if (el.id === self.props.data.currentList1Id) {
                list1ItemNotFound = false;
            }
            return <option key={i} value={el.id}>{el.name}</option>
        });
        var list2Dropdown = list2Data.map(function(el, i, arr) {
            if (el.name === self.props.data.currentList2Id) {
                list2ItemNotFound = false;
            }
            return <option key={i} value={el.name}>{el.toText}</option>
        });
        var list3Dropdown = list3Data.map(function(el, i, arr) {
            if (el.name === self.props.data.currentList3Id) {
                list3ItemNotFound = false;
            }
            return <option key={i} value={el.name}>{el.text}</option>
        });
        dateSelection = dateSelection.map(function(el, i, arr) {
            var className = "btn ";
            if (el.value === self.props.data.selectedDateType) {
                className += "btn-secondary";
            } else {
                className += "btn-primary";
            }
            return <button key={i} type="button" className={className} name="date-select" onClick={self.props.methods.onClick} value={el.value}>{el.name}</button>;
        });
        if (list1Dropdown.length > 0) {
            if (list1ItemNotFound) {
                $S.addElAt(list1Dropdown, 0, <option key={list1Dropdown.length}>{this.props.data.list1Text}</option>);
            }
            list1Dropdown = <td><select className="form-control" name="list1-select" onChange={this.props.methods.dropDownChange} value={this.props.data.currentList1Id}>{list1Dropdown}</select></td>;
        } else {
            list1Dropdown = null;
        }
        if (list2Dropdown.length > 0) {
            if (list2ItemNotFound) {
                $S.addElAt(list2Dropdown, 0, <option key={list2Dropdown.length}>{this.props.data.list2Text}</option>);
            }
            list2Dropdown = <td><select className="form-control" name="list2-select" onChange={this.props.methods.dropDownChange} value={this.props.data.currentList2Id}>{list2Dropdown}</select></td>;
        } else {
            list2Dropdown = null;
        }
        if (list3Dropdown.length > 0) {
            if (list3ItemNotFound) {
                $S.addElAt(list3Dropdown, 0, <option key={list3Dropdown.length}>{this.props.data.list3Text}</option>);
            }
            list3Dropdown = <td><select className="form-control" name="list3-select" onChange={this.props.methods.dropDownChange} value={this.props.data.currentList3Id}>{list3Dropdown}</select></td>;
        } else {
            list3Dropdown = null;
        }
        if (dateSelection.length > 0) {
            dateSelection = <td><div className="btn-group" role="group" aria-label="Basic example">
                            {dateSelection}
                        </div></td>;
        }
        if (dateSelectionRequiredPages.indexOf(this.props.currentPageName) < 0) {
            dateSelection = null;
        }
        var reloadButton = <td><button className="btn btn-primary" name="filter-reload" value="reload" onClick={this.props.methods.onClick}>Reload</button></td>;
        var toggleButton = <td><button className="btn btn-primary" name="footer-filter-toggle" value="toggle" onClick={this.props.methods.onClick}>Toggle</button></td>;
        if (!$S.isBooleanTrue(this.props.data.enableToggleButton)) {
            toggleButton = null;
        }
        if (!$S.isBooleanTrue(this.props.data.enableReloadButton)) {
            reloadButton = null;
        }
        if (this.props.data.firstTimeDataLoadStatus === "completed") {
            if (list1Data.length < 1) {
                list1Dropdown = null;
            }
            if (list2Data.length < 1) {
                list2Dropdown = null;
            }
            if (list3Data.length < 1) {
                list3Dropdown = null;
            }
            if (list1Data.length < 1 && list2Data.length < 1 && list3Data.length < 1) {
                dateSelection = null;
                reloadButton = null;
                toggleButton = null;
            }
        } else {
            list1Dropdown = null;
            list2Dropdown = null;
            list3Dropdown = null;
            dateSelection = null;
            reloadButton = null;
            toggleButton = null;
        }
        return (<div className="SELECT-FILTER">
                <div><table><tbody><tr>
                    {list1Dropdown}
                    {list2Dropdown}
                    {list3Dropdown}
                    {dateSelection}
                    {reloadButton}
                    {toggleButton}
                </tr></tbody></table></div>
            </div>);
    }
}

export default SelectFilter;

