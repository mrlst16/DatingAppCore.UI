import React, { Component } from 'react'
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import { stat } from 'fs';

export class Messaging extends Component {

    constructor(props) {
        super(props);

        console.log("Messaging");
        this.props = props;

        this.state = {
            Messages: []
        };
        this.config = new Configuration();
        this.sdk = new Sdk(this.config);

    }

    componentDidMount() {
        console.log("component did mount")
        var self = this;
        this.sdk.Post(
            "/api/messaging/read",
            {
                UserID: this.props.UserID
            }
        )
            .then((response) => {
                console.log("response");
                console.log(response);
                if (response.data.Sucess) {
                    var state = self.state;
                    stat.Messages = response.data.Result.Messages;
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
                <h3>Messaging to User {this.User.id}</h3>
                {/* <ul>{this.state.Messages.map((x, i) =>
                    <li>x.Content</li>
                )}
                </ul> */}
            </div>
        );
    };
}
export default Messaging;