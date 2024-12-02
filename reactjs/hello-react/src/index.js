import React from 'react';
//import ReactDOM from 'react-dom/client';

import ReactDOM from 'react-dom';
//import App from './hello-world/App';
//import App from './greet/App';
//import App from './project/App';
//import App from './functionClick/App';
//import App from './navbar/App'
//import App from './App'
//import App from './data-table/App';
// import App from './daily-report';
import DailyReport from './daily-report';


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
