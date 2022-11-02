import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {favoritecolor: "red"};
    console.log("App.constructor");
  }
  render() {
    console.log("App.render");
    return (
      <h1>My Favorite Color is</h1>
    );
  }
}


export default App;

