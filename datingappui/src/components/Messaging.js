import React, { Component } from 'react'
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import { stat } from 'fs';
import DatingAppComponent from './DatingAppComponent';

export class Messaging extends DatingAppComponent {

    constructor(props) {
        super(props);

        console.log("Messaging");
        console.log(this.props);
        this.state = {
            Messages: []
        };

        const { userid } = this.props.match.params;
        this.toUserId = userid;

    }

    sendMessage(e) {
        e.preventDefault();
        console.log("Sending message");

        var message = document.getElementById("message").value;
        this.sdk.Post(
            "/api/messaging/send",
            {
                From: this.user.id,
                To: this.toUserId,
                Message: message
            }
        )
            .then((response) => {
                console.log("response from send");
                console.log(response);

            })
            .catch((error) => {
                console.log("From send ERROR")
                console.log(error);
            });

    }

    componentDidMount() {
        console.log("component did mount")
        var self = this;
        this.sdk.Post(
            "/api/messaging/read",
            {
                User1ID: this.user.id,
                User2ID: this.toUserId
            }
        )
            .then((response) => {
                console.log("response");
                console.log(response);
                if (response.data.sucess) {
                    self.state.Messages = response.data.result.messages;
                    self.setState(self.state);
                }
            })
            .catch((error) => {
                console.log("From get Photos ERROR")
                console.log(error);
            });
    }
    render() {

        return (
            <div>
                <h3>Messaging to User {this.toUserId}</h3>
                <ul>{this.state.Messages.map((x, i) =>
                    <li key={x.id}>{x.message}</li>
                )}
                </ul>

                <textarea id="message"></textarea>
                <br />
                <input type="button" value="Send" onClick={(e) => this.sendMessage(e)}></input>
            </div>
        );
    };
}
export default Messaging;