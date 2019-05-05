import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { Button } from 'react-bootstrap';

export class Login extends Component {
    constructor(){
        super();
    }

    logout = ()=>{
        localStorage.clear();
    }

    fbLogin = ()=>{
        console.log("Doing stuff with facebook");
        window.fbAsyncInit();
        console.log(window.FB);
        window.FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             window.FB.api('/me', function(response) {
                localStorage.setItem("external_id", response.id);
                localStorage.setItem("idtype", "facebook");
             });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    render() {
        var eid = localStorage.getItem("external_id");
        console.log("external_id = " + eid);

        return (
            <input type="button" value="Login with facebook" onClick={this.fbLogin} />
            
        );
    }
}

export default Login