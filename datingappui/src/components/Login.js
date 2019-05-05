import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

export class Login extends Component {
    constructor(){
        super();
    }

    render() {
        var user = localStorage.getItem("externalid");
        if(user){
            return (
                <div id="userstamp">
                    <img src={localStorage.getItem("imgurl")} width="50" height="50"></img>
                </div>
            );
        }
        return (
            // <div>
             <h3>Dude its a login</h3>
            // <FacebookLogin
            // appId="209105475917952"
            // autoLoad={true}
            // fields="name,id,picture"
            // callback={(response=>{
            //     console.log(response);
            //     localStorage.setItem("externalid", response.id.toString());
            //     localStorage.setItem("externalname", response.name);
            //     localStorage.setItem("imgurl", response.picture.data.url);
            //     localStorage.setItem("idtype", "facebook");
            // })}
            // />
            // </div>
        );
    }
}

export default Login