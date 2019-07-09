import React from 'react';
import PropTypes from 'prop-types';
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';

const Utils = function() {
    this.login = new LoginManager();
    this.config = new Configuration();
    this.sdk = new Sdk(this.config);
    this.user = this.login.getUser();
}

export default Utils;