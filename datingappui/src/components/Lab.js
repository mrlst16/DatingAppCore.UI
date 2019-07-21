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
        }

        this.connection = null;
        this.registerConversation = this.registerConversation.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addMessageToDisplay = this.addMessageToDisplay.bind(this);
    }

    componentDidMount = () => {
        const signalR = require("@aspnet/signalr");

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:44387/chatHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.on("ReceiveMessage", (from, to, message) => {
            console.log("On ReceiveMessage");
            console.log("from: " + from + "; to: " + to + "; message: " + message);
            this.addMessageToDisplay("from: " + from + "; to: " + to + "; message: " + message)
        });

        this.connection.on("RegisterComplete", (user, message) => {
            console.log("On RegisterComplete");
            console.log("user");
            console.log(user);
            console.log("message");
            console.log(message);
        });

        this.connection.start()
            .then(() => {
                console.log("Connected");
            })
            .catch((error) => {
                console.log("connection start error");
                console.log(error);
            });
    }

    addMessageToDisplay(message) {
        var ul = document.getElementById('messages');
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(message));
        ul.appendChild(li);
    }

    setStateProperty(key, value) {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    }

    registerConversation() {
        if (this.state.from && this.state.to) {
            this.connection.invoke("RegisterConversation", this.state.from, this.state.to)
                .then(() => {
                    console.log("RegisterConversation Success");
                }).catch((error) => {
                    console.log("RegisterConversation Error");
                    console.log(error);
                });
        }
    }

    sendMessage() {
        console.log(this.state);
        if (this.state.from && this.state.to && this.state.message) {
            this.connection.invoke("SendMessage", this.state.from, this.state.to, this.state.message)
                .then((response) => {
                    console.log("SendMessage Success");
                }).catch((error) => {
                    console.log("SendMessage Error");
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div>
                <h3>The Lab</h3>
                <div>Here goes chat</div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            From
                        </div>
                        <div className="col-6">
                            To
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            B720EFB5-6DBC-4F5D-8AA8-D1516158B207<input type="radio" value="B720EFB5-6DBC-4F5D-8AA8-D1516158B207" name="from" onClick={() => { this.setStateProperty('from', 'B720EFB5-6DBC-4F5D-8AA8-D1516158B207') }}></input>
                        </div>
                        <div className="col-6">
                            B720EFB5-6DBC-4F5D-8AA8-D1516158B207<input type="radio" value="B720EFB5-6DBC-4F5D-8AA8-D1516158B207" name="to" onClick={() => { this.setStateProperty('to', 'B720EFB5-6DBC-4F5D-8AA8-D1516158B207') }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            C5919193-4E0F-4984-92F7-F3F4C9DACFD9<input type="radio" value="C5919193-4E0F-4984-92F7-F3F4C9DACFD9" name="from" onClick={() => { this.setStateProperty('from', 'C5919193-4E0F-4984-92F7-F3F4C9DACFD9') }}></input>
                        </div>
                        <div className="col-6">
                            C5919193-4E0F-4984-92F7-F3F4C9DACFD9<input type="radio" value="C5919193-4E0F-4984-92F7-F3F4C9DACFD9" name="to" onClick={() => { this.setStateProperty('to', 'C5919193-4E0F-4984-92F7-F3F4C9DACFD9') }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            A7BF0AAB-C3BC-4524-BCC3-FADE75585A66<input type="radio" value="A7BF0AAB-C3BC-4524-BCC3-FADE75585A66" name="from" onClick={() => { this.setStateProperty('from', 'A7BF0AAB-C3BC-4524-BCC3-FADE75585A66') }}></input>
                        </div>
                        <div className="col-6">
                            A7BF0AAB-C3BC-4524-BCC3-FADE75585A66 <input type="radio" value="A7BF0AAB-C3BC-4524-BCC3-FADE75585A66" name="to" onClick={() => { this.setStateProperty('to', 'A7BF0AAB-C3BC-4524-BCC3-FADE75585A66') }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            Message:
                        </div>
                        <div className="col-6">
                            <input type="text" id="message" value={this.state.message} onChange={(e) => { this.setStateProperty("message", e.target.value); }}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="button" value="Register" onClick={this.registerConversation}></input>
                        </div>
                        <div className="col-6">
                            <input type="button" value="Send" onClick={this.sendMessage}></input>
                        </div>
                    </div>
                </div>


                <ul id="messages">

                </ul>
            </div>
        );
    };
}
export default Lab;