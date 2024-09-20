import React, {Component} from 'react'

class Table extends Component{
    render(){
        var data = [];
        data.push({"s_no":1, "name": "Sumit", "age": "22", "date": "20.09.2024s"});
        return( <table>
            <tr>
                <td>S.No</td>
                <td>Name</td>
                <td>Age</td>
                <td>Date</td>
            </tr>
        {data.map((el) => (
            <tr>
                <td>{el.s_no}</td>
                <td>{el.name}</td>
                <td>{el.age}</td>
                <td>{el.date}</td>
            </tr>
        ))}

        </table>
        )
    }
}

export default Table