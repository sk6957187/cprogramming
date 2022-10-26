import React from 'react';
import $S from "../../../interface/stack.js";

class PageFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        $S.log("PageFilter:componentDidMount");
    }
    render() {
        var filterOptions = this.props.data.filterOptions;
        if (!$S.isArray(filterOptions)) {
            filterOptions = [];
        }
        var self = this;
        var pageFilterComponent = filterOptions.map(function(el, i, arr) {
            var tdComponent = null, selectedValue = "";
            if ($S.isObject(el)) {
                if ($S.isArray(el.text) && el.type === "dropdown") {
                    tdComponent = el.text.map(function(el1, i1, arr1) {
                        if ($S.isObject(el1)) {
                            if ($S.isBooleanTrue(el1.selected) || el1.value === el.selectedValue) {
                                selectedValue = el1.value;
                            }
                        }
                        return <option key={i1} value={el1.value}>{el1.option}</option>;
                    });
                    tdComponent = <select className="form-control" name={el.selectName} value={selectedValue} onChange={self.props.methods.dropDownChange}>{tdComponent}</select>;
                } else if ($S.isArray(el.buttons) && el.type === "buttons") {
                    tdComponent = el.buttons.map(function(el1, i1, arr) {
                        var className = "btn ";
                        if ($S.isBooleanTrue(el1.selected)) {
                            className += "btn-secondary";
                        } else {
                            className += "btn-primary";
                        }
                        return <button key={i1} type="button" className={className} name={el1.name} onClick={self.props.methods.onClick} value={el1.value}>{el1.display}</button>;
                    });
                    tdComponent = <div className="btn-group" role="group" aria-label="Basic example">{tdComponent}</div>;
                }
            }
            return <td key={i}>{tdComponent}</td>;
        });
        if (pageFilterComponent.length > 0) {
            pageFilterComponent = <table><tbody>
                <tr>{pageFilterComponent}</tr>
            </tbody></table>;
        }
        return (<div className="PAGE-FILTER">{pageFilterComponent}</div>);
    }
}

export default PageFilter;
