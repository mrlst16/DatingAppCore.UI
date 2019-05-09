import React, { Component } from 'react'
import Login from './Login'
import  Sdk from '../js/sdk'
import Configuration  from '../js/Configuration';
import LoginManager from '../js/LoginManager';

export class Lab extends Component {

    constructor(){
        super();
    }

    render() {
        
        var login = new LoginManager();
        var sdk = new Sdk(new Configuration());
        
        sdk.PostReturnPromise("/api/users/get_user", {
            "IncludeProfile": "true",
            "UserID" : login.getUser().ID
        }).then((response=>{
            console.log("response");
            console.log(response);
        }))
        return(
            <div>
                
                <h1>This is the Lab Page</h1>
                

            </div>
        );
    };
}
export default Lab;