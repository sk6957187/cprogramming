import React, { Component } from 'react';
import FunctionClick from './FunctionClick';
import ClassClick from './ClassClick';
import EventBind from './EventBind';

class App extends Component {

  render(){
    return(
      <div className="App">
        {/* <FunctionClick />
        <ClassClick /> */}
        <EventBind/>
      </div>
    )
  }
}

export default App;
