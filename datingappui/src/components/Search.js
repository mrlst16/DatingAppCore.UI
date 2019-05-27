import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { Error } from './Error';
import { resolve } from 'url';

export class Search extends Component {
    constructor() {
        super();

        var self = this;

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
                "Lat" : r.coords.latitude,
                "Lon" : r.coords.longitude
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

    render() {
        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;

        
        sdk.Post("/api/matches/potential_matches", {
            UserID : user.id
        }).then((response)=>{
            console.log("Response from getting potential matches");
            console.log(response);
        });

        let page;
        if (!navigator.geolocation) {
            page = <Error heading="No Geolocation" message="Please Enable Geolocation to search for your Potential Match!"></Error>
        } else {
            ///Normal page flow
            page =
                <div>
                    <h3>Search</h3>
                    <div>
                        
                    </div>
                </div>
        }

        return (
            <div>
                {page}
            </div>
        );
    }
}

export default Search