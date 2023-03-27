import React from 'react';
import $S from "../../../interface/stack.js";

import AppComponentWrapper from "./AppComponentWrapper";


class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageName: ""
        };
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    _callAppMethod(method, arg) {
        if ($S.isFunction(method)) {
            return method(arg);
        }
        return arg;
    }
    onClick(e) {
        this._callAppMethod(this.props.methods.onClick, e);
    }
    onChange(e) {
        this._callAppMethod(this.props.methods.onChange, e);
    }
    dropDownChange(e) {
        this._callAppMethod(this.props.methods.dropDownChange, e);
    }
    onFormSubmit(e) {
        this._callAppMethod(this.props.methods.onFormSubmit, e);
    }
    componentDidUpdate(prevProps, prevState) {
        var arg = {"currentPageName": this.props.currentPageName};
        arg["prevPageName"] = this.state.currentPageName;
        if (this.props.match) {
            arg["params"] = this.props.match.params;
        }
        var isComponentUpdate = this._callAppMethod(this.props.methods.isComponentUpdate, arg);
        if ($S.isBooleanTrue(isComponentUpdate)) {
            $S.log("AppComponent:componentDidUpdate");
            this.setState({currentPageName: this.props.currentPageName});
            if ($S.isFunction(this.props.methods.pageComponentDidUpdate)) {
                this.props.methods.pageComponentDidUpdate(this.props.currentPageName, this.props.match.params);
            }
        }
    }
    componentDidMount() {
        $S.log("AppComponent:componentDidMount");
        if ($S.isFunction(this.props.methods.registerChildAttribute)) {
            this.props.methods.registerChildAttribute("history", this.props.history);
        }
        var params;
        if (this.props.match) {
            params = this.props.match.params;
        }
        if ($S.isFunction(this.props.methods.pageComponentDidMount)) {
            this.props.methods.pageComponentDidMount(this.props.currentPageName, params);
        }
    }
    render() {
        return (<AppComponentWrapper data={this.props.data} history={this.props.history}
            currentPageName={this.props.currentPageName} renderFieldRow={this.props.renderFieldRow}
            methods={this.props.methods} onClick={this.onClick} onFormSubmit={this.onFormSubmit} onChange={this.onChange} dropDownChange={this.dropDownChange}/>);
    }
}

export default AppComponent;

