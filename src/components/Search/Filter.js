import React, { useState } from 'react'
import DatingApp from '../Utils';
import { Form, Button } from 'react-bootstrap'
import Utils from '../Utils';
import DatingAppComponent from '../DatingAppComponent';

class Filter extends DatingAppComponent {

    constructor(props) {
        super(props);
        this.state = {
            age_from: 18,
            age_to: 65
        };
    }

    componentDidMount() {
        var self = this;
        function calculateAge(birthday) { // birthday is a date
            var birthdayDate = new Date(birthday);
            var ageDifMs = Date.now() - birthdayDate.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        this.sdk.GetProfile(this.user.id)
            .then((response => {
                if (response.data.Sucess) {
                    var state = self.state;
                    state = response.data.Result.Settings;
                    if (state['birthdayfrom']) {
                        state.age_to = calculateAge(state["birthdayfrom"]);
                    }
                    if (state['birthdayto']) {
                        state.age_from = calculateAge(state["birthdayto"]);
                    }
                    self.setState(state);
                }

            })).catch((error) => {
                console.log("error");
                console.log(error);
            });
    }

    save(event) {
        event.preventDefault();
        this.sdk.SetSettings(this.user.id, this.getSearchParams())
            .then((response) => {
                console.log("From handle submit callback");
                console.log(response);
            }).catch((error) => {
                console.log("Error setting user settings");
                console.log(error);
            });
    }

    setStateProp(key, value) {
        var state = this.state;
        state[key] = value;
        this.setState(state);
    }

    getSearchParams() {
        var result = {};

        Object.keys(this.state).map((k, i) => {
            if (this.state[k] && this.state[k] != 'off') {
                if (k == 'birthdayfrom' || k == 'birthdayto') return;
                if (k == 'age_from') {
                    var today = new Date();
                    today.setUTCFullYear(today.getUTCFullYear() - parseInt(this.state[k]))
                    result['birthdayto'] = today.getUTCMonth() + '/' + today.getUTCDate() + '/' + today.getUTCFullYear();
                    return;
                }

                if (k == 'age_to') {
                    var today = new Date();
                    today.setUTCFullYear(today.getUTCFullYear() - parseInt(this.state[k]))
                    result['birthdayfrom'] = today.getUTCMonth() + '/' + today.getUTCDate() + '/' + today.getUTCFullYear();
                    return;
                }

                result[k] = this.state[k];
            }
        });
        console.log(result);
        return result;
    }

    render() {
        return <div className="container">
            <h3>Filter</h3>
            <div className="row">
                <div className="col-4">
                    Sex
            </div>
                <div className="col-8">
                    M <input type="radio" value="m" checked={(this.state.sex && this.state.sex === "m") ? "checked" : ""} label="M" name="sex" onChange={() => this.setStateProp('sex', 'm')} />
                    F <input type="radio" value="f" checked={(this.state.sex && this.state.sex === "f") ? "checked" : ""} label="F" name="sex" onChange={() => this.setStateProp('sex', 'f')} />
                    off <input type="radio" value="off" checked={(this.state.sex && this.state.sex === "off") ? "checked" : ""} label="Off" name="sex" onChange={() => this.setStateProp('sex', 'off')} />
                </div>

            </div>

            <div className="row">
                <div className="col-4">
                    Gender
            </div>
                <div className="col-8">
                    M <input type="radio" value="m" checked={(this.state.gender && this.state.gender === "m") ? "checked" : ""} label="M" name="gender" onChange={() => this.setStateProp('gender', 'm')} />
                    F <input type="radio" value="f" checked={(this.state.gender && this.state.gender === "f") ? "checked" : ""} label="F" name="gender" onChange={() => this.setStateProp('gender', 'f')} />
                    Off <input type="radio" value="off" checked={(this.state.gender && this.state.gender === "off") ? "checked" : ""} label="Off" name="gender" onChange={() => this.setStateProp('gender', 'off')} />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    Feelings about dogs
            </div>
                <div className="col-8">
                    Love Them <input type="radio" value="t" checked={(this.state.dogs && this.state.dogs === "t") ? "checked" : ""} name="dogs" onChange={() => this.setStateProp('dogs', 't')} />
                    Not A Fan <input type="radio" value="f" checked={(this.state.dogs && this.state.dogs === "f") ? "checked" : ""} name="dogs" onChange={() => this.setStateProp('dogs', 'f')} />
                    Neutral <input type="radio" value="n" checked={(this.state.dogs && this.state.dogs === "n") ? "checked" : ""} name="dogs" onChange={() => this.setStateProp('dogs', 'n')} />
                    Off <input type="radio" value="off" checked={(this.state.dogs && this.state.dogs === "off") ? "checked" : ""} label="Off" name="dogs" onChange={() => this.setStateProp('dogs', 'off')} />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    Age From <input type="number" value={this.state.age_from} onChange={(e) => this.setStateProp('age_from', e.target.value)} />
                </div>
                <div className="col-6">
                    Age To <input type="number" value={this.state.age_to} onChange={(e) => this.setStateProp('age_to', e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <input type="button" value="Search" onClick={(e) => {
                        let searchParams = this.getSearchParams();
                        this.props.onSearchClick(searchParams);
                    }} />
                    <input type="button" value="Save" onClick={(e) => {
                        this.save(e);
                    }} />
                </div>
            </div>
        </div>;
    }
}

export default Filter;