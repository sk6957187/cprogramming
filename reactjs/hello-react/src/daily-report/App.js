import React, { Component } from "react";
import DailyReport from "./DailyReport";
import SimpleTable from "./Data";

class App extends Component {
  render() {
    return (
      <>
        <h1 className="text-decoration-underline">Daily Report</h1>
        hii
        <DailyReport />
        {/* < SimpleTable /> */}
      </>
    );
  }
}

export default App;
