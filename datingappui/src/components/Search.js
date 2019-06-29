import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { Error } from './Error';
import ReactDOM from 'react-dom';
import { stat } from 'fs';
import MiniProfileForSearch from './Profile/MiniProfileForSearch';
import DatingAppComponent from './DatingAppComponent';

export class Search extends DatingAppComponent {
    constructor() {
        super();
        this.state = { PotentialMatches: [] };
        var self = this;

        new Promise((resolve) => {
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(resolve);
            } else {
                throw new Error("Navigation is not turned on");
            }
        }).then((r) => {
            this.sdk.RecordUserLocation(this.user.id, r.coords.latitude, r.coords.longitude)
                .then((response => {
                })).catch((error) => {
                    console.log("error");
                    console.log(error);
                });
        }).catch((er) => {
            console.log("Error in RecordUserLocation");
            console.log(er);
        });
    }

    componentDidMount() {
        var thisRef = this;

        this.sdk.PotentialMatches(this.user.id)
            .then((response) => {
                thisRef.setState({ PotentialMatches: response.data.result });
            });
    }

    recordSwipe(answer, user, index) {
        var self = this;
        this.sdk.Swipe(this.user.id, user.id, answer)
            .then((response) => {
                if (response.data.sucess) {
                    var state = this.state;
                    state.PotentialMatches.splice(index, 1);
                    self.setState(state);
                }
            });
    }

    render() {
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
                                        <MiniProfileForSearch
                                            onSelectNo={(e) => this.recordSwipe(false, x, i)}
                                            onSelectYes={(e) => this.recordSwipe(true, x, i)}
                                            UserID={x.id}
                                        />
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