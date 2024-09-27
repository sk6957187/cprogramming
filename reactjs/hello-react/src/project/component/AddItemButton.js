import React, {Component} from 'react'

class AddItemButton extends Component{
    constructor(props) {
        super(props);
        console.log("2-0");
    }
    componentDidMount() {
        console.log("2-0-0");
    }
    render() {
        console.log(2);
        return(<button className='btn btn-primary mx-2' onClick={this.props.onClick}>Click for add</button>)
    }
}

export default AddItemButton