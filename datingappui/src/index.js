import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom' 
import Login from './components/Login';
import Lab from './components/Lab'
import AnotherComponent from './components/AnotherComponent';

const routing = (
    <Router>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/another" component={AnotherComponent} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
