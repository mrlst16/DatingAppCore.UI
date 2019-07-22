import React, { Component } from 'react'
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import { stat } from 'fs';
import DatingAppComponent from './DatingAppComponent';

export class Messaging extends DatingAppComponent {

    constructor(props) {
        super(props);

        this.state = {
            Messages: []
        };

        const { userid } = this.props.match.params;
        this.toUserId = userid;

        this.connection = null;
        this.registerConversation = this.registerConversation.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.addMessageToDisplay = this.addMessageToDisplay.bind(this);
        this.unRegisterConversation = this.unRegisterConversation.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.sdk.ReadMessages(this.user.id, this.toUserId)
            .then((response) => {
                if (response.data.sucess) {
                    self.state.Messages = response.data.result.messages;
                    self.setState(self.state);
                }
            })
            .catch((error) => {
                console.log("From get Photos ERROR")
                console.log(error);
            });

            const signalR = require("@aspnet/signalr");

            this.connection = new signalR.HubConnectionBuilder()
                .withUrl("https://localhost:44387/chatHub")
                .configureLogging(signalR.LogLevel.Information)
                .build();
    
            this.connection.on("ReceiveMessage", (from, to, message) => {
                console.log("On ReceiveMessage");
                console.log("from: " + from + "; to: " + to + "; message: " + message);
                // this.addMessageToDisplay("from: " + from + "; to: " + to + "; message: " + message)
                var state = self.state;
                state.Messages.push({
                    id: "some id",
                    message: message
                });
                self.setState(state);
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
                    self.registerConversation();
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

    registerConversation() {
        if (this.user.id && this.toUserId) {
            this.connection.invoke("RegisterConversation", this.user.id, this.toUserId)
                .then(() => {
                    console.log("RegisterConversation Success");
                }).catch((error) => {
                    console.log("RegisterConversation Error");
                    console.log(error);
                });
        }
    }

    unRegisterConversation() {
        if (this.user.id && this.toUserId) {
            this.connection.invoke("UnRegisterConversation", this.user.id, this.toUserId)
                .then(() => {
                    console.log("UnRegisterConversation Success");
                }).catch((error) => {
                    console.log("UnRegisterConversation Error");
                    console.log(error);
                });
        }
    }

    sendMessage() {
        console.log("sending message");
        console.log(this.state);
        var message = document.getElementById("message").value;
        if (this.user.id && this.toUserId && message) {
            this.connection.invoke("SendMessage", this.user.id, this.toUserId, message)
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
                <h3>Messaging to User {this.toUserId}</h3>
                <ul id="messages">{this.state.Messages.map((x, i) =>
                    <li key={x.id}>{x.message}</li>
                )}
                </ul>

                <textarea id="message"></textarea>
                <br />
                <input type="button" value="Send" onClick={() => this.sendMessage()}></input>
            </div>
        );
    };
}
export default Messaging;