import axios from 'axios'

export default function Sdk(config) {

    var config = config;

    this.Get = function (url) {
        return axios({
            method: 'get',
            url: config.ApiBaseUrl + url,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword)
            }
        });
    }

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