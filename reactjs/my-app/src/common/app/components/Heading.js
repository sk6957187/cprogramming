import React from 'react';
import $S from "../../../interface/stack.js";
import Api from "../../Api";

class Heading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
        $S.log("Heading:componentDidMount");
    }
    render() {
        var appHeadingData = this.props.data.appHeading;
        var appHeading = null;
        if ($S.isArray(appHeadingData)) {
            appHeading = Api.generateFields(this.props, appHeadingData, 0);
        }
        return (<div className="HEADING">
                {appHeading}
            </div>);
    }
}

export default Heading;

