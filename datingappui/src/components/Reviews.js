import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DatingAppComponent from './DatingAppComponent';

export class Reviews extends DatingAppComponent {
    constructor(props){
        super(props);

        console.log("Reviews");
        console.log(this.props);
        this.state = {
            Messages: []
        };

        const { userid } = this.props.match.params;
        this.toUserId = userid;
    }

    render() {
        return (
            <div>Reviews of {this.toUserId}</div>
        );
    }
}

export default Reviews