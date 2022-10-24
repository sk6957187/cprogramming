import React from 'react';
import $S from "../../../interface/stack.js";

class PageTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        $S.log("PageTab:componentDidMount");
    }
    render() {
        var self = this;
        var pageTabData = this.props.data.pageTab;
        var hidePageTab = $S.isBooleanTrue(this.props.data.hidePageTab);
        if (!$S.isArray(pageTabData) || hidePageTab) {
            pageTabData = [];
        }
        var pageTab = pageTabData.map(function(el, i, arr) {
            var closeLink = <span className="close-tab" name="close-tab" value={el} onClick={self.props.methods.onClick}>X</span>;
            var navLinkClass = "nav-link active";
            var tabDisplayText = self.props.methods.getTabDisplayText(el);
            if (arr.length === 1) {
                closeLink = null;
            }
            if(el === self.props.currentPageName) {
                closeLink = null;
                navLinkClass += " current-page";
            }
            return <li key={i} className="nav-item"><button className={navLinkClass}><span className="pr-5px" value={el} name="open-tab" onClick={self.props.methods.onClick}>{tabDisplayText}</span>{closeLink}</button></li>;
        });
        if (pageTab.length > 0) {
            pageTab = <ul className="nav nav-tabs">{pageTab}</ul>;
        }
        if (this.props.data.firstTimeDataLoadStatus !== "completed") {
            pageTab = null;
        }
        return (<div className="PAGE-TAB">{pageTab}</div>);
    }
}

export default PageTab;
