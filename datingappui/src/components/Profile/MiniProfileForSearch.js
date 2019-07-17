import React, { Component } from 'react'
import LoginManager from "../../js/LoginManager";
import Configuration from "../../js/Configuration";
import Sdk from "../../js/sdk";
import DatingAppComponent from '../DatingAppComponent';


export class MiniProfileForSearch extends DatingAppComponent {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            images: [],
            User: {
                Profile: []
            }
        };

    }

    componentDidMount() {
        var self = this;
        this.sdk.GetUser(
            {
                UserID: this.props.UserID,
                IncludeProfile: true,
                IncludePhotos: true
            }
        )
            .then((response) => {
                if (response.data.Sucess) {
                    var user = self.formatUser(response.data.Result);
                    self.state.User = user;
                    self.setState(self.state);
                }
            })
            .catch((error) => {
                console.log("From get Photos ERROR")
                console.log(error);
            });
    }

    formatUser(user) {
        if (user.Profile["sex"]) {
            user.Profile["sex"] = user.Profile["gender"] == 'f' ? 'female' : 'male'
        }
        if (user.Profile["gender"]) {
            user.Profile["gender"] = user.Profile["gender"] == 'f' ? 'female' : 'male'
        }
        if (user.Profile["dogs"]) {
            var feelingsOnDogs = user.Profile["dogs"];
            switch (feelingsOnDogs) {
                case 't':
                    feelingsOnDogs = 'Love Them';
                    break;
                case 'f':
                    feelingsOnDogs = 'Not a fan';
                    break;
                case 'n':
                    feelingsOnDogs = 'Neutral';
                    break;
                default:
                    feelingsOnDogs = 'Neutral';
            }
            user.Profile["dogs"] = feelingsOnDogs;
        }
        return user;
    }

    render() {
        var img = <span />;
        var self = this;
        if (this.state.User.Photos) {
            var src = this.config.ApiBaseUrl + "/api/users/get_photo?userid=" + this.state.User.Photos[0].UserID + "&filename=" + this.state.User.Photos[0].FileName
            img =
                <img style={{
                    maxHeight: 150
                }
                } src={src} />
        }
        return (
            <div style={{
                width: "60%"
            }}>
                <div className="image_container row">
                    {this.state.User.UserName}
                </div>
                <div className="image_container row">
                    {img}
                </div>
                <div className="row">
                    <div className="container">
                        {
                            Object.keys(this.state.User.Profile).map((x, i) =>
                                <div className="row" key={i}>
                                    <div className="col-1" key={i}>{x}</div>
                                    <div className="col-11"> {this.state.User.Profile[x]}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="swipe_container">
                    <input type="button" value="No" onClick={this.props.onSelectNo} />
                    <input type="button" value="Yes" onClick={this.props.onSelectYes} />
                </div>
            </div>
        );
    };
}
export default MiniProfileForSearch;