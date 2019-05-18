import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom' 
import Navigation from './components/Navigation';
import Lab from './components/Lab'
import ProfileEditor from './components/ProfileEditor';
import Search from './components/Search';
import Reviews from './components/Reviews';
import Messaging from './components/Messaging';
import Settings from './components/Settings';
import Account from './components/Account';
import PleaseLogin from './components/PleaseLogin';
import LoginManager from './js/LoginManager';
import { ManagePhotos } from './components/ManagePhotos';

class App extends Component {
  
  constructor(){
      super();
      this.Login = new LoginManager();
  }

  render() {
    let routing;
    
    if(!this.Login.IsLoggedIn()){
      routing =
              <div id="body" style={{
                display: "block"
              }}>
              <Route path="/" component={PleaseLogin} />
            </div>
    } else {
      routing = 
            <div id="body" style={{
                display: "block"
              }}> 
              <Route path="/please_login" component={PleaseLogin} />
              <Route path="/profile_editor" component={ProfileEditor} />
              <Route path="/search" component={Search} />
              <Route path="/reviews" component={Reviews} />
              <Route path="/messaging" component={Messaging} />
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