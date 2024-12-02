import React from 'react';
import $S from "../../../interface/stack.js";


class Errors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        $S.log("Errors:componentDidMount");
    }
    render() {
        var errorsData = this.props.data.errorsData;
        if (!$S.isArray(errorsData)) {
            errorsData = [];
        }
        var errors = errorsData.map(function(el, i, arr) {
            var alertComponent;
            var index = (i+1) + ")";
            if ($S.isString(el) || $S.isNumeric(el)) {
                alertComponent = <div key={i} className="alert alert-danger" role="alert">{index} {el}</div>;
            } else if ($S.isObject(el) && $S.isString(el.href)) {
                alertComponent = <div key={i} className="alert alert-danger" role="alert">
                  {index} Erorr in <a href={el.href} className="alert-link">{el.text}</a></div>;
            } else if ($S.isObject(el) && $S.isString(el.code)) {
                alertComponent = <div key={i} className="alert alert-danger" role="alert">
                                    <code>{index}{el.code}</code>
                                </div>;
            } else if ($S.isObject(el) && $S.isString(el.reason)) {
                alertComponent = <div key={i} className="alert alert-danger" role="alert">
                                    {el.reason}: <code>{el.data}</code>
                                </div>;
            } else {
                alertComponent = <div key={i} className="alert alert-danger" role="alert">{index} Unknown error</div>;
            }
            return alertComponent;
        });
        return (<div className="ERRORS">{errors}</div>);
    }
}

export default Errors;

