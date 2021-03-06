import Sdk from './sdk'
import Configuration from '../js/Configuration'
import axios from 'axios'
import { debug } from 'util';

export default function LoginManager() {
    this.logout = function () {
        localStorage.clear();
        window.User = null;
        window.location.reload();
    }

    this.logIn = function (platform) {
        switch (platform) {
            case "facebook":
                fbLogin();
                break;
            default:
                fbLogin();
        }
    }

    this.isLoggedIn = function () {
        return localStorage.getItem("user") !== null;
    }

    this.getUser = function () {
        return JSON.parse(localStorage.getItem("user"));
    }

    function fbLogin() {
        window.fbAsyncInit();
        window.FB.login(function (response) {
            if (response.authResponse) {
                window.FB.api('/me?fields=id,name,birthday,gender', function (response) {
                    try {
                        var config = new Configuration();
                        localStorage.setItem("external_id", response.id);
                        localStorage.setItem("idtype", "facebook");
                        var sdk = new Sdk(config);

                        sdk.Post("/api/users/login_or_signup", {
                            User: {
                                ExternalID: response.id,
                                IdType: 1,
                                UserName: response.name,
                                Birthday: response.birthday
                            }
                        }).then((res) => {
                            localStorage.setItem("user", JSON.stringify(res.data.result.user));
                            window.location.reload();
                        });
                    } catch (ex) {
                        console.log("An Exception was thrown while logging in via facebook");
                        console.log(ex);
                    }
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
}