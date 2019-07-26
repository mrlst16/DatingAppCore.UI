import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Error extends Component {
    
    constructor() {
        super();
        
    }

    render() {
        return (
            <div>
                <h3 className="error_heading">{this.props.heading}</h3>
                <div className="error_message">{this.props.message}</div>
            </div>
        );
    }
}

export default Error