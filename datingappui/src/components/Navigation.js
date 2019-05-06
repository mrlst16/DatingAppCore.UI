import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'
import LoginManager from '../js/LoginManager';

export class Navigation extends Component {
    constructor(){
        super();
        this.Login = new LoginManager();

    }

    logout = ()=>{
        console.log("logging out");
        this.Login.logout();
    }

    login = (platform)=>{
        console.log("Logging in via " + platform);
        this.Login.logIn(platform);
    }

    render() {
        var login = new LoginManager();
        var l = login.IsLoggedIn();
        console.log(l);
        let filler;
        if(l){
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
                <Nav.Link href="#" onClick={this.logout}>Log Out</Nav.Link>
                
                <Nav.Link href="/lab">Lab</Nav.Link>
            </Nav>
        } else {
            filler = 
            <Nav>
                <NavDropdown title="Login" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#" onClick={()=>{this.login("facebook")}}>Facebook</NavDropdown.Item>
                </NavDropdown>
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