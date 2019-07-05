import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { stat } from 'fs';
import MiniProfile from './Profile/MiniProfile';
import DatingAppComponent from './DatingAppComponent';

export class Matches extends DatingAppComponent {
    constructor(props) {
        super(props);

        this.state = {
            matches: []
        };
    }

    componentDidMount() {
        var self = this;
        console.log(this);
        this.sdk.GetUserMatches(this.user.id)
            .then((response) => {
                var state = {};
                state.matches = response.data.result;
                self.setState(state);
            }).catch((error) => {
                console.log("Matches Error");
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3>Matches</h3>
                <ul>
                    {
                        this.state.matches.map((x, i) =>
                            <li>
                                <div>
                                    <MiniProfile UserID={x.id}></MiniProfile>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Matches