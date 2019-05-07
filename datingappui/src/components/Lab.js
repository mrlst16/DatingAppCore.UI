import React, { Component } from 'react'
import Login from './Login'
import { Sdk } from '../js/sdk'
import { Configuration } from '../js/Configuration';

export class Lab extends Component {

    constructor(){
        super();
    }

    render() {
        
        
        return(
            <div>
                
                <h1>This is the Lab Page</h1>
                {/* <Login></Login> */}
            </div>
        );
    };
}
export default Lab;