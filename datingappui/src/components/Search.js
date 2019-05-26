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

        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;
    }

    checkGeoLocationOn() {
        return new Promise((resolve) => {


        });
        // if (!navigator.geolocation) {
        //     console.log("geolocation not supported")
        // } else {
        //     var balls = document.getElementById('balls');
        //     function showPosition(position) {
        //         console.log('this cgot called')
        //         balls.innerHTML = "Latitude: " + position.coords.latitude +
        //             "<br>Longitude: " + position.coords.longitude;
        //     }
        //     navigator.geolocation.getCurrentPosition(showPosition, function (e) {
        //         console.log(e);
        //     });

        // }
    }

    render() {
        // new Promise((resove, reject) => {
        //     if (!navigator.geolocation) {
        //         reject();
        //     } else {
        //         return navigator.geolocation.getCurrentPosition(resolve);
        //     }
        // }).then((response) => {
        //     console.log("resonse from custom promise");
        //     console.log(response);
        // }).catch((error) => {
        //     console.log("error from the custom promise");
        //     console.log(error);
        // });

        new Promise((resolve) => {
            console.log('Initial');
            if (navigator.geolocation) {
                return navigator.geolocation.getCurrentPosition(resolve);
            } else {
                throw new Error("Navigation is not turned on");
            }
        }).then((r) => {
            console.log("Doing then");
            console.log(r);
        }).catch((er) => {
            console.log("ruh roh");
            console.log(er);
        })

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