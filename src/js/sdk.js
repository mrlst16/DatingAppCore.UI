import axios from 'axios'

export default function Sdk(config) {

    this.Get = function (url) {
        return axios({
            method: 'get',
            url: config.ApiBaseUrl + url,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword),
                'Cache-Control': 'no-cache',
                'accept-encoding': 'gzip, deflate'
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
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword),
                'Accept': '*/*',
                'Cache-Control': 'no-cache',
                'accept-encoding': 'gzip, deflate'
            },
        });
    }

    this.GetUser = function (data) {
        return this.Post("/api/users/get_user", data);
    }

    function LoginOrSignup(data) {
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

    this.SetSettings = function (userid, settings) {
        return this.Post("/api/users/set_user_settings", { UserID: userid, Properties: settings });
    }

    this.UploadPhoto = function (formData, userid) {
        return axios({
            method: 'post',
            url: config.ApiBaseUrl + '/api/users/upload_photo',
            data: formData,
            headers: {
                'Content-Type': 'multipart/formdata',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword),
                "userid": userid
            }
        });
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

    this.GetUserMatches = function (userid) {
        return this.Post("/api/matches/matches", {
            UserID: userid
        });
    }

    this.ReadMessages = function (user1, user2) {
        return this.Post(
            "/api/messaging/read",
            {
                User1ID: user1,
                User2ID: user2
            }
        )
    }

    this.SendMessage = function (from, to, message) {
        return this.Post(
            "/api/messaging/send",
            {
                From: from,
                To: to,
                Message: message
            }
        );
    }

    this.RecordUserLocation = function (userid, lat, lon) {
        return this.Post("/api/users/record_user_location", {
            "UserID": userid,
            "Lat": lat,
            "Lon": lon
        });
    }

    this.PotentialMatches = function (userid) {
        return this.Post("/api/matches/potential_matches", {
            UserID: userid
        });
    }

    this.Swipe = function (from, to, isLike) {
        return this.Post("/api/matches/swipe", {
            UserFromID: from,
            UserToID: to,
            IsLike: isLike
        })
    }

    this.SearchUsers = function (userid, searchParameters) {
        var data = {
            UserID: userid,
            Filter: []
        };

        Object.keys(searchParameters).map((k, i) => {
            let kvp = {
                Key: k,
                Value: searchParameters[k]
            };
            data.Filter.push(kvp);
        });

        return this.Post("/api/matches/search_users", data);
    }
}