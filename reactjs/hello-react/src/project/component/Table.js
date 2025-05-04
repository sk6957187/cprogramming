import React, {Component} from 'react'

class Table extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        var data = this.props.data;
        return(
        <div className="col-md-8">
            <table className="table table-bordered text-center table-striped">
                <thead >
                    <tr style={{ fontWeight: 'bold' }}>
                        <td>PersonId</td>
                        <td>Name</td>
                        <td>Age</td>
                        <td>DOB</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el, index, arr) => (
                    <tr key={index}>
                        <td>{el.personId}</td>
                        <td>{el.name}</td>
                        <td>{el.age}</td>
                        <td>{el.recordDate}</td>
                    </tr> 
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Table