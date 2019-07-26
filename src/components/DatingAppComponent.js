import React, { Component } from 'react'
import LoginManager from '../js/LoginManager';
import Configuration from '../js/Configuration';
import Sdk from '../js/sdk';

export class DatingAppComponent extends Component {

    constructor(props) {
        super(props);
        
        this.props = props;
        this.login = new LoginManager();
        this.config = new Configuration();
        this.sdk = new Sdk(this.config);
        this.user = this.login.getUser();
    }
    
    setStateProperty(key, value) {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    }
}
export default DatingAppComponent;