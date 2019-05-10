import axios from 'axios'


export default function Sdk(config){

    var config = config;

    function Post(url, data, succssCallback){
        axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization' : 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword)
            },
        }).then(function (response) {
            console.log("Successfully posted data to " + url);
            if(succssCallback !== null && succssCallback !== undefined){
                succssCallback(response);
            }
        }).catch(function (error) {
            console.log("Error posting data to " + url);
            console.log(error);
        });
        return this;
    }

    this.PostReturnPromise = function(url, data, succssCallback){
        return axios({
            method: 'post',
            url: config.ApiBaseUrl + url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization' : 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword)
            },
        });
    }

    this.GetUser = function(data, successCallback){
        return Post(config.ApiBaseUrl + "/api/users/get_user", data, successCallback);
    }

    function LoginOrSignup(data, successCallback){
        return Post(config.ApiBaseUrl + "/api/users/login_or_signup", data, successCallback);
    }

    this.LoginOrSignupWithFacebook = function(userid){
        return LoginOrSignup({
            User:{
                ExternalID: userid,
                IdType: 1
            }
        }, function(response){
            localStorage.setItem("user", JSON.stringify(response.data.Result.User));
            window.location.reload();
        });
    }

    this.GetProfile = function(userid, successCallback){
        return this.GetUser({
            "IncludeProfile": "true",
            "UserID" : userid
        }, successCallback)
    }

    this.SetProfile = function(userid, profile, successCallback){
        return Post(config.ApiBaseUrl + "/api/users/set_user_settings", {UserID: userid, Profile: profile}, successCallback);
    }

    this.SetSettings = function(userid, settings, successCallback){
        return Post(config.ApiBaseUrl + "/api/users/set_user_settings", {UserID: userid, Settings: settings}, successCallback);
    }
}