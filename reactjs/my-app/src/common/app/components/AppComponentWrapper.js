import React from 'react';
import Api from "../../Api";
import $S from "../../../interface/stack.js";

import Heading from "./Heading";
import SelectFilter from './SelectFilter';
import PageFilter from './PageFilter';
import Footer from "./Footer";


class AppComponentWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        $S.log("AppComponentWrapper:componentDidMount");
    }
    render() {
        var pageData = Api.generateFields(this.props, this.props.renderFieldRow, 0);
        var appComponentClassName = this.props.currentPageName;
        var pageComponentClass = "PAGE-DATA";
        var addContainerClass = this.props.data.addContainerClass;
        var toggleClickCount = this.props.data.toggleClickCount;
        if ($S.isString(appComponentClassName)) {
            appComponentClassName += " APP-COMPONENT";
        } else {
            appComponentClassName = "APP-COMPONENT";
        }
        if ($S.isNumber(toggleClickCount)) {
            appComponentClassName += " toggle-click-" + toggleClickCount;
        }
        if ($S.isObject(this.props.data) && $S.isStringV2(this.props.data.appComponentClassName)) {
            appComponentClassName += " " + this.props.data.appComponentClassName;
        }
        if ($S.isBooleanTrue(addContainerClass)) {
            pageComponentClass += " container";
        }
        return (<div className={appComponentClassName}>
                    <Heading data={this.props.data} methods={this.props.methods} history={this.props.history} currentPageName={this.props.currentPageName}/>
                    <div className={pageComponentClass}>
                        <SelectFilter data={this.props.data} methods={this.props.methods} history={this.props.history} currentPageName={this.props.currentPageName}/>
                        <PageFilter data={this.props.data} methods={this.props.methods} history={this.props.history} currentPageName={this.props.currentPageName}/>
                        <div className="PAGE-FIELDS">{pageData}</div>
                        <Footer data={this.props.data} methods={this.props.methods} history={this.props.history} currentPageName={this.props.currentPageName}/>
                    </div>
                </div>);
    }
}
export default AppComponentWrapper;

