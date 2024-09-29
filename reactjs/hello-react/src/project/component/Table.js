import React, {Component} from 'react'

class Table extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        var data = this.props.data;
        return(<table className="table text-center">
              <thead><tr>
                <td>PersonId</td>
                <td>Name</td>
                <td>Age</td>
                <td>DOB</td>
            </tr></thead>
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
        )
    }
}

export default Table