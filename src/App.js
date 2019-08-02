import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Navigation from './components/Navigation';
import Lab from './components/Lab'
import ProfileEditor from './components/ProfileEditor';
import Search from './components/Search';
import Settings from './components/Settings';
import LoginManager from './js/LoginManager';
import { ManagePhotos } from './components/ManagePhotos';
import Matches from './components/Matches';
import Messaging from './components/Messaging';
import Reviews from './components/reviewing/Reviews';
import DatingAppComponent from './components/DatingAppComponent';
import Error from '../src/components/Error'

class App extends DatingAppComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let routing;
    if (!this.login.isLoggedIn()) {
      routing =
        <div id="body" style={{
          display: "block"
        }}>
          <h1>Jessie, I Love you!!!!</h1>
          <Route path="/"
            render={() => { return <Error message="You don't have to pay me, but you do have to log in" /> }}
          />
        </div>
    } else {
      routing =
        <div id="body" style={{
          display: "block"
        }}>
          <Route path="/profile_editor" component={ProfileEditor} />
          <Route path="/search" component={Search} />
          <Route path="/matches" component={Matches} />
          <Route path="/messaging/:userid" component={Messaging} />
          <Route path="/reviews/:userid" component={Reviews} />
          <Route path="/settings" component={Settings} />
          <Route path="/myphotos" component={ManagePhotos} />
          <Route path="/lab" component={Lab} />
        </div>
    }

    return (
      <div className="App">
        <Navigation></Navigation>
        <Router>
          {routing}
        </Router>
      </div>
    );
  }
}

export default App;