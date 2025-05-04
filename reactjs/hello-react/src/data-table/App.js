import React, { Component } from 'react';
import '../App.css';
import DataTable from './DataTable';


class App extends Component {
  render() {
    return (
      <>
        <h2 className="center-heading fst-italic text-decoration-underline">DataTable in ReactJS!</h2>
        <DataTable />
      </>
    )
  }
}

export default App
