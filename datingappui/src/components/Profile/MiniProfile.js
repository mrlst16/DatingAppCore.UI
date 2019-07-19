import React, { Component } from 'react'
import LoginManager from "../../js/LoginManager";
import Configuration from "../../js/Configuration";
import Sdk from "../../js/sdk";


export class MiniProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        }
        this.props = props;

        this.state = {
            images: [],
            User: {
                Profile: []
            }
        };

        this.config = new Configuration();
        this.sdk = new Sdk(this.config);
    }

    componentDidMount() {
        var self = this;
        this.sdk.GetUser(
            {
                UserID: this.props.UserID,
                IncludeProfile: true,
                IncludePhotos: true,
                IncludeReviews: true
            }
        )
            .then((response) => {
                console.log("response");
                console.log(response);
                if (response.data.Sucess) {
                    self.state.images = [];
                    response.data.Result.Photos.forEach(function (item, index) {
                        self.state.images.push({
                            ID: item.ID,
                            src: self.config.ApiBaseUrl + "/api/users/get_photo?id=" + item.ID,
                            Rank: item.Rank
                        });
                    });
                    self.state.User = response.data.Result;
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
                <h3>{this.state.User.UserName}</h3>
                <div className="image_container">
                    <img src={this.state.images[0]} />
                </div>
                <div>
                    <ul>
                        {
                            Object.keys(this.state.User.Profile).map((x, i) =>
                                <li>{x} : {this.state.User.Profile[x]}</li>
                            )
                        }
                    </ul>
                </div>
                <a href={"messaging/" + this.state.User.ID}>Message</a>
                <a href={"reviews/" + this.state.User.ID}>Reviews</a>
            </div>
        );
    };
}
export default MiniProfile;