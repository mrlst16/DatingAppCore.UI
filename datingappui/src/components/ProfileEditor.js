import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap'
import Sdk from '../js/sdk';
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';

export class ProfileEditor extends Component {
    constructor(props){
        super(props);
        
        this.state = {};
        // var login = new LoginManager();
        // var sdk = new Sdk(new Configuration());
        // var user = login.getUser();
        // console.log(user);
        
        // var self = this;
        // sdk.PostReturnPromise("/api/users/login_or_signup", {
        //     "IncludeProfile": "true",
        //     "UserID" : user.ID
        // }).then((response=>{
        //     console.log("response");
        //     console.log(response);
        //     self.state = response.data.Result.Profile;
        //     self.setState(self.state);
        // })).catch((error)=>{
        //     console.log(error);
        // });
        this.TryGetStateFromApi();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    TryGetStateFromApi(){
        // var result = {};
        // try {
        //     var Login = new LoginManager();
        //     var sdk = new Sdk(new Configuration());
        //     var user = Login.getUser();
            
        //     sdk.GetProfile(user.ID, function(response){
        //         result = response.data.Result.Profile;
        //         console.log("response");
        //         console.log(response);
        //         console.log("result so far");
        //         console.log(result);
        //         if(result === null || result === "undefined"){
        //             console.log("This is either null or undefined;");
        //             result = {};
        //         }
        //     });
        //     console.log("At end of try the result is....");
        //     console.log(result);
        // } catch (error) {
        //     console.log("Error retreiving user profile");
        //     console.log(error);
        //     result = {};
        // }

        var login = new LoginManager();
        var sdk = new Sdk(new Configuration());
        var user = login.getUser();
        console.log(user);

        var self = this;
        sdk.PostReturnPromise("/api/users/get_user", {
            "IncludeProfile": "true",
            "UserID" : user.ID
        }).then((response=>{
            console.log("response");
            console.log(response);
            if(response.data.Result){
                self.state = response.data.Result.Profile;
                self.setState(self.state);
                console.log("self.state");
                console.log(self.state);
            }
            
        })).catch((error)=>{
            console.log("error");
            console.log(error);
        });
        // return result;
    }

    handleChange(event){
        var state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        console.log(this.state);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        try {
            var Login = new LoginManager();
            var sdk = new Sdk(new Configuration());
            var user = Login.getUser();
            
            console.log("About to try and set profile")
            sdk.SetProfile(user.ID, this.state, function(response){
                console.log("From handle submit callback");
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
                width:"80%",
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
                        M <input type="radio" value="m" label="M" name="sex" value="m" onChange={this.handleChange}/>
                        F <input type="radio" value="f" label="F" name="sex" value="f" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            How were you born?
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="Gender">
                        <Form.Label>Gender &nbsp; </Form.Label>
                        M <input type="radio" value="m" label="M" name="gender" value="m" onChange={this.handleChange}/>
                        F <input type="radio" value="f" label="F" name="gender" value="f" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            How do you want others to identify you?
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit"  onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default ProfileEditor