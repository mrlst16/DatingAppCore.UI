import React, { Component } from 'react'
import Login from '../components/Login'
import { Sdk } from '../js/sdk'
import { Configuration } from '../js/Configuration';

export class Lab extends Component {

    constructor(){
        super();
    }

    render() {
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = sdk.GetUser();

        console.log(window.fbAsyncInit);
        window.fbAsyncInit();
        console.log(window.FB);
        return(
            <div>
                <h1>This is the Lab Page</h1>
                
            </div>
        );
    };
}
export default Lab;