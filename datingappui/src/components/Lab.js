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
        const signalR = require("@aspnet/signalr");

        let connection = new signalR.HubConnectionBuilder()
            // .withUrl("/chathub")
            .withUrl("https://localhost:44387/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        console.log(signalR);
        console.log(connection);

        connection.on("ReceiveMessage", (x) => {
            console.log("On ReceiveMessage");
            console.log(x);
        });

        // connection.start()
        //     .then(() => connection.invoke("RegisterConversation", "user1", "user2"))
        //     .catch((error)=>{
        //         console.log("connection start error");
        //         console.log(error);
        //     });


        connection.start()
            .then(() => {
                console.log("Connected");
            })
            .catch((error) => {
                console.log("connection start error");
                console.log(error);
            });

        var millisecondsToWait = 2000;
        setTimeout(function () {
            // Whatever you want to do after the wait
            connection.invoke("RegisterConversation", "user1", "user2").then((response) => {
                console.log("RegisterConversation.Then");
                console.log(response);
            }).catch((error) => {
                console.log("Register Error");
                console.log(error);
            });
        }, millisecondsToWait);

        
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