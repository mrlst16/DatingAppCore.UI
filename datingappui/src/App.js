import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from '../src/components/Login'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom' 
import Navigation from './components/Navigation';
import Lab from './components/Lab'
import ProfileEditor from './components/ProfileEditor';
import Search from './components/Search';
import Reviews from './components/Reviews';
import Messaging from './components/Messaging';
import Settings from './components/Settings';
import Account from './components/Account';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation></Navigation>
        <Router>
          <div id="body">
            <Route path="/login" component={Login} />
            <Route path="/profile_editor" component={ProfileEditor} />
            <Route path="/search" component={Search} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/messaging" component={Messaging} />
            <Route path="/settings" component={Settings} />
            <Route path="/account" component={Account} />
            <Route path="/lab" component={Lab} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;