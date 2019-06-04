import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { stat } from 'fs';

export class Matches extends Component {
    constructor() {
        super();

        this.state = {};
        this.state.matches = [];
    }

    componentDidMount() {
        var config = new Configuration();
        var sdk = new Sdk(config);
        var login = new LoginManager();
        var user = login.getUser();

        var self = this;

        sdk.Post("/api/matches/matches", {
            UserID: user.id
        }).then((response) => {
            console.log("Matches Success");
            console.log(response);
            var state = {};
            state.matches = response.data.result;
            self.setState(state);
        }).catch((error)=>{
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
                        this.state.matches.map((x, i)=>
                            <li>
                                <div>
                                    <h6>{x.id}</h6>
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