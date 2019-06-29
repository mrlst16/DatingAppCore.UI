import Sdk from './sdk'
import Configuration from '../js/Configuration'

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
                window.FB.api('/me', function (response) {
                    try {
                        var config = new Configuration();
                        localStorage.setItem("external_id", response.id);
                        localStorage.setItem("idtype", "facebook");
                        var sdk = new Sdk(config);
                        console.log("sdk");
                        console.log(sdk);

                        sdk.Post("/api/users/login_or_signup", {
                            User: {
                                ExternalID: response.id,
                                IdType: 1
                            }
                        }).then((res) => {
                            console.log("then");
                            console.log(res);
                            localStorage.setItem("user", JSON.stringify(res.data.result.user));
                            window.location.reload();
                        });

                        // sdk.LoginOrSignupWithFacebook(response.id);
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
