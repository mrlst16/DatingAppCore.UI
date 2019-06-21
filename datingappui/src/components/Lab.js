import React, { Component } from 'react'
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { HubConnection } from '@aspnet/signalr';
import DatingAppComponent from './DatingAppComponent';

export class Lab extends DatingAppComponent {

    constructor() {
        super();
        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null
        }



    }

    componentDidMount = () => {
        //const nick = window.prompt('Your name:', 'John');

        //const hubConnection = new HubConnection('http://localhost:30005/chatHub');
        const signalR = require("@aspnet/signalr");

        let connection = new signalR.HubConnectionBuilder()
            .withUrl("/chat")
            .build();
        console.log(signalR);
        console.log(connection);

        // const script = document.createElement("script");
        // script.src = "/static/libs/your_script.js";
        // script.async = true;
        //script.onload = () => this.scriptLoaded();

        // document.head.appendChild(script);
        //this.setState({ hubConnection, nick });


    }

    render() {
        return (
            <div>
                <h3>The Lab</h3>
                <div>Here goes chat</div>
            </div>
        );
    };
}
export default Lab;