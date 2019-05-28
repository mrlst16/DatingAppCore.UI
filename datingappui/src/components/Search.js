import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { Error } from './Error';
import ReactDOM from 'react-dom';
import { stat } from 'fs';

export class Search extends Component {
    constructor() {
        super();
        this.state = { PotentialMatches: [] };
        var self = this;

        var login = new LoginManager();
        this.sdk = new Sdk(new Configuration());
        var user = login.getUser();
        this.user = user;

        new Promise((resolve) => {
            console.log('Initial');
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(resolve);
            } else {
                throw new Error("Navigation is not turned on");
            }
        }).then((r) => {
            var login = new LoginManager();
            var sdk = new Sdk(new Configuration());
            var user = login.getUser();

            console.log(user);

            sdk.Post("/api/users/record_user_location", {
                "UserID": user.id,
                "Lat": r.coords.latitude,
                "Lon": r.coords.longitude
            }).then((response => {
            })).catch((error) => {
                console.log("error");
                console.log(error);
            });

        }).catch((er) => {
            console.log("ruh roh");
            console.log(er);
        });
    }

    componentDidMount() {
        console.log("Component did mount");
        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;

        sdk.Post("/api/matches/potential_matches", {
            UserID: user.id
        }).then((response) => {
            console.log("Response from getting potential matches");
            console.log(response);
            thisRef.setState({ PotentialMatches: response.data.result });
        });
    }

    recordSwipe(answer, user) {
        console.log("Recording swipe " + answer + " for user " + user.id);
        console.log(this.user);

        var self = this;
        this.sdk.Post("/api/matches/swipe", {
            UserFromID: this.user.id,
            UserToID: user.id,
            IsLike: answer
        }).then((response) => {
            console.log("Response from recording swipe");
            console.log(response);
            var state = this.state;
            state.PotentialMatches.pop(user);
            self.setState(state);
        });
    }

    render() {
        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;

        let page;
        if (!navigator.geolocation) {
            page = <Error heading="No Geolocation" message="Please Enable Geolocation to search for your Potential Match!"></Error>
        } else {
            ///Normal page flow
            page =
                <div>
                    <h3>Search</h3>
                    <div>
                        <ul>
                            {
                                this.state.PotentialMatches.map((x, i) => {
                                    return <li key={x.id}>
                                        <div>
                                            <div className="image_container">
                                                Images will go here
                                            </div>
                                            <div className="swipe_container" data-obj={JSON.stringify(x)}>
                                                <input type="button" value="Yes" onClick={(e) => this.recordSwipe(false, x)} />
                                                <input type="button" value="Yes" onClick={(e) => this.recordSwipe(true, x)} />
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
        }

        return (
            <div id="page">
                {page}
            </div>
        );
    }
}

export default Search