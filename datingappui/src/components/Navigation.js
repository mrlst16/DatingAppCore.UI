import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'
import LoginManager from '../js/LoginManager';
import DatingAppComponent from '../components/DatingAppComponent';

export class Navigation extends DatingAppComponent {
    constructor(props){
        super(props);
    }

    LogOutUser = ()=>{
        this.login.logout();
    }

    LogInUser = (platform)=>{
        this.login.logIn(platform);
    }

    render() {
        let filler;
        if(this.login.isLoggedIn()){
            console.log("The user is logged in");
            console.log(this.login.getUser());
            filler = 
            <Nav className="mr-auto">
                <Nav.Link href="/search">Search</Nav.Link>
                <Nav.Link href="/matches">Matches</Nav.Link>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile_editor">Profile Editor</NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="/myphotos">My Photos</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" onClick={this.LogOutUser}>Log Out</Nav.Link>
            </Nav>
        } else {
            filler = 
            <Nav>
                <NavDropdown title="Login" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#" onClick={()=>{this.LogInUser("facebook")}}>Facebook</NavDropdown.Item>
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