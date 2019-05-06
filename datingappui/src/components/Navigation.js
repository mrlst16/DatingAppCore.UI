import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'
import LoginManager from '../js/LoginManager';
import Login from '../components/Login'

export class Navigation extends Component {
    constructor(){
        super();
    }

    render() {

        var loggedIn = false;
        let filler;
        if(!loggedIn){
            filler = 
            <Nav className="mr-auto">
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/messaging">Messaging</Nav.Link>
                <Nav.Link href="/reviews">Reviews</Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile_editor">Profile Editor</NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider></NavDropdown.Divider>
                    <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
                </NavDropdown>
                <Login></Login>
                <Nav.Link href="/lab">Lab</Nav.Link>
            </Nav>
        } else {
            filler = 
            <Nav>
                <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>
        }

        return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="home">Dating App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {filler}
            </Navbar.Collapse>
        </Navbar> 
        );
    }
}

export default Navigation