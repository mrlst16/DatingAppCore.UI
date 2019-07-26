import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { Button } from 'react-bootstrap';
import LoginManager from '../js/LoginManager'
import {Navbar, Nav, NavDropdown, Form} from 'react-bootstrap'

export class Login extends Component {
    constructor(){
        super();
        this.Login = new LoginManager();
    }

    login = (platform)=>{
        console.log("Logging in via " + platform);
        this.Login.logIn(platform);
    }

    render() {

        return (
            <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item href="#" onClick={()=>{this.login("facebook")}}>Facebook</NavDropdown.Item>
            </NavDropdown>
        );
    }
}

export default Login