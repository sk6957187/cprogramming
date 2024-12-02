import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './hello-world/Hello';
import Greet from './greet/Greet';
import Welcome from './componets/Welcome';
import Message from './componets/Message';
import Table from './project/component/Table';
import Data from './componets/Data';
import Counter from './componets/Counter'



class App extends Component {


  render(){
    return(
      <div className="App">
        <Counter />
        <Data />
        {/*<Table/> */}
        {/* <Message /> */}
        {/* <Greet name= "Brush" heroName = "Batman"/>
          <p>This is children props!</p>
        <Greet name= "Clark" heroName = "Superman"/>
        <button>Action</button>
        <Greet name= "Diana" heroName = "Wonder women"/>
        <Welcome name ="Brush" heroName = "Batman"/>
        <Welcome  name= "Clark" heroName = "Superman"/>
        <Welcome name="Diana" heroName = "Wonder women"/>
        <Hello /> */}
      </div>
    )
  }
}



export default App;
