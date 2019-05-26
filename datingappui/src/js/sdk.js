import axios from 'axios'


export default function Sdk(config) {

    var config = config;

    this.Post = function (url, data) {
        return axios({
            method: 'post',
            url: config.ApiBaseUrl + url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword)
            },
        });
    }

    this.GetUser = function (data) {
        return this.Post("/api/users/get_user", data);
    }

    function LoginOrSignup(data) {
        console.log("LoginOrSignup");
        console.log(this);
        return this.Post("/api/users/login_or_signup", data);
    }

    // this.LoginOrSignupWithFacebook = function (userid) {
    //     return LoginOrSignup({
    //         User: {
    //             ExternalID: userid,
    //             IdType: 1
    //         }
    //     })
    //         .then((response) => {
    //             localStorage.setItem("user", JSON.stringify(response.data.Result.User));
    //             window.location.reload();
    //         }).catch((er) => {
    //             console.log("Error in Login Or Signup With Facebook");
    //             console.log(er);
    //         });
    // }

    this.GetProfile = function (userid, successCallback) {
        return this.GetUser({
            "IncludeProfile": "true",
            "UserID": userid
        }, successCallback)
    }

    this.SetProfile = function (userid, profile, successCallback) {
        return this.Post("/api/users/set_user_profile", { UserID: userid, Properties: profile }, successCallback);
    }

    this.SetSettings = function (userid, settings, successCallback) {
        return this.Post("/api/users/set_user_settings", { UserID: userid, Properties: settings }, successCallback);
    }

    this.GetUserPhotos = function (userid) {
        return this.Post("/api/users/get_user", {
            "IncludePhotos": "true",
            "UserID": userid
        });
    }

    this.SetUserPhotos = function (data) {
        return this.Post("/api/users/set_photos", data);
    }
}