import React, {Component} from 'react'

class Table extends Component{
    constructor(props) {
        super(props);
        console.log("1-0");
    }
    componentDidMount() {
        console.log("1-0-0");
    }
    render() {
        console.log(1);
        var data = this.props.data;
        return(<table className='table'>
              <thead><tr>
                <td>PersonId</td>
                <td>Name</td>
                <td>Age</td>
                <td>RecordDate</td>
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