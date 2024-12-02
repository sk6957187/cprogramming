import React from 'react';
// import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {BrowserRouter as Router,  Switch,  Route,  Link} from 'react-router-dom';
import Module02 from "./module02/Module02";
// import Module03 from "./module03/Module03";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }
    componentDidMount() {
    }
    render() {
        // return <Module02/>;
        return <Router><Switch>
            <Route exact path='/' element={< Module02 />}></Route>
            <Route exact path='/about' element={< Module02 />}></Route>
            <Route exact path='/contact' element={< Module02 />}></Route> 
       </Switch></Router>;
    }
}

export default App;

