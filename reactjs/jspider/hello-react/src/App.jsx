import React from 'react';
import Employee from './Employee';
import Student from './Student';
import './App.css';

function App() {
  console.log(React);
  return (
    <React.Fragment>
      <Student />
      <Employee/>
      <h1>Web Technology</h1>
      <p>Hello World</p>
      <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, quae odio sed velit voluptates iusto ipsum fugit cum numquam quidem rem odit vitae saepe perferendis atque molestiae, laudantium aperiam sint!</b>
    </React.Fragment>
  );
}

export default App;
