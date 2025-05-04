import React, {Component} from 'react'

class AddItemButton extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return(<button  className='btn btn-primary mx-2' onClick={this.props.onClick}>Click for add</button>)
    }
}

export default AddItemButton