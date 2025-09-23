import React from "react";
import '../App.css';

function FunApp() {
    let a = 100;
    let arr = [
        { id: 1, name: "cake", price: 100 },
        { id: 2, name: "pastry", price: 200 },
        { id: 3, name: "cookies", price: 300 }
    ];

    return (
        <React.Fragment>
            <h1 className="text">App</h1>
            <h1>The value: {a}</h1>
            <h1>The price of {arr[0].name} is {arr[0].price}.</h1>

            <table border="1px" cellPadding="10" >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Dish</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default FunApp;
