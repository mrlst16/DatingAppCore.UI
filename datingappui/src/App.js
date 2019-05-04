import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from '../src/components/Login'
import AnotherComponent from '../src/components/AnotherComponent'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom' 
import {Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Navbar>;
        <Router>
          <div id="body">
            <Route path="/login" component={Login} />
            <Route path="/another" component={AnotherComponent} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;