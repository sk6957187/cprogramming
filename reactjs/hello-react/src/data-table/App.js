import React, { Component } from 'react';
import '../App.css';
import DataTable from './DataTable';
//import Hello from '../hello-world/Hello';
//hello-react/src/App.css


class App extends Component {
  render() {
    return (
      <>
        <h2 className="center-heading fst-italic text-decoration-underline">DatTable in ReactJS!</h2>
        <DataTable />
      </>
    )
  }
}

export default App
