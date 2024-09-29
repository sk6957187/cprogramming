import React, { Component } from 'react';
import Navbar from './Navbar';
import TextForm from './TextForm';

class App extends Component {
  render(){
    return(
    <>
        <Navbar title='TextUtil'/>
        <div className="container my-3">
            <TextForm title='Text here!'/>
        </div>
    </>
    )
  }
}

export default App;
