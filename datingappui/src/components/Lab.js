import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import {User} from '../dtos/user'
import Login from '../components/Login'
import SDK, { Sdk } from '../js/sdk'
import { Configuration } from '../js/Configuration';

export class Lab extends Component {

    constructor(){
        super();
    }

    render() {
        var config = new Configuration();
        var sdk = new Sdk(config);
        sdk.GetUser();
        return(<Login></Login>);
    };
}
export default Lab;