import React, { Component } from 'react'
import DatingAppComponent from '../DatingAppComponent';
import ReviewEditor from './ReviewEditor';

export class Reviews extends DatingAppComponent {
    constructor(props) {
        super(props);

        console.log("Reviews");
        console.log(this.props);
        this.state = {
            ToUserId: ''
        };

        const { userid } = this.props.match.params;
        this.state.ToUserId = userid;
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <div>Reviews of {this.state.ToUserId}</div>
                <div className="reviewBoard">

                </div>
                <div className="addReview">
                    <ReviewEditor ToUserId={this.state.ToUserId}></ReviewEditor>
                </div>
            </div>
        );
    }
}

export default Reviews