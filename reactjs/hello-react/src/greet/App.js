import React, { Component } from 'react';
import Greet from './Greet';

class App extends Component {

  render(){
    return(
      <div className="App">
        <Greet name= "Diana" heroName = "Wonder women"/>
      </div>
    )
  }
}

export default App;
