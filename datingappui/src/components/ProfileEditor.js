import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';

export class ProfileEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.TryGetStateFromApi();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    TryGetStateFromApi() {
        console.log("In TryGetStateFromApi");
        var login = new LoginManager();
        var sdk = new Sdk(new Configuration());
        var user = login.getUser();
        console.log(user);
        var self = this;
        sdk.Post("/api/users/get_user", {
            "IncludeProfile": "true",
            "UserID": user.id 
        }).then((response => {
            console.log(response);
            if (response.data.Result) {
                self.state = response.data.Result.Profile;
                self.setState(self.state);
            }
        })).catch((error) => {
            console.log("error");
            console.log(error);
        });
    }

    handleChange(event) {
        var state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        try {
            var Login = new LoginManager();
            var sdk = new Sdk(new Configuration());
            var user = Login.getUser();

            sdk.SetProfile(user.id, this.state)
                .then((response) => {
                    console.log(response);
                });

        } catch (error) {
            console.log("Error retreiving user profile");
            console.log(error);
        }
    }

    render() {
        return (
            <div style={{
                width: "80%",
                "marginLeft": "auto",
                "marginRight": "auto"
            }}>
                <h3>ProfileEditor</h3>
                <Form>
                    <Form.Group controlId="Bio">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Let's talk about you..." name="bio" value={this.state.bio} onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            Tell us about yourself
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="Sex">
                        <Form.Label>Sex &nbsp; </Form.Label>
                        M <input type="radio" value="m" checked={(this.state.sex && this.state.sex === "m") ? "checked" : ""} label="M" name="sex" value="m" onChange={this.handleChange} />
                        F <input type="radio" value="f" checked={(this.state.sex && this.state.sex === "f") ? "checked" : ""} label="F" name="sex" value="f" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            How were you born?
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="Gender">
                        <Form.Label>Gender &nbsp; </Form.Label>
                        M <input type="radio" value="m" checked={(this.state.gender && this.state.gender === "m") ? "checked" : ""} label="M" name="gender" onChange={this.handleChange} />
                        F <input type="radio" value="f" checked={(this.state.gender && this.state.gender === "f") ? "checked" : ""} label="F" name="gender" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            How do you want others to identify you?
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="Dogs">
                        <Form.Label>Love Dogs? &nbsp; </Form.Label>
                        Love Them <input type="radio" value="t" checked={(this.state.dogs && this.state.dogs === "t") ? "checked" : ""} name="dogs" onChange={this.handleChange} />
                        Not A Fan <input type="radio" value="f" checked={(this.state.dogs && this.state.dogs === "f") ? "checked" : ""} name="dogs" onChange={this.handleChange} />
                        Neutral <input type="radio" value="n" checked={(this.state.dogs && this.state.dogs === "n") ? "checked" : ""} name="dogs" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            Do you love dogs?
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default ProfileEditor