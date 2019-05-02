import axios from 'axios'


export function Sdk(config){

    console.log(config);
    var config = config;

    function Post(url, data){
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
            console.log(response);
            return response;
        }).catch(function (error) {
            console.log(error);
            return null;
        });
    }
    
    this.GetUser = function(){
        return Post(config.ApiBaseUrl + "/api/users/get_user", {})
    }
}