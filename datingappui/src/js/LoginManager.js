import Sdk from './sdk'
import Configuration from '../js/Configuration'

export default function LoginManager(){

    var skd = new Sdk(new Configuration());

    function logout (){
        localStorage.clear();
    }

    function fbLogin (){
        window.fbAsyncInit();
        window.FB.login(function(response) {
            if (response.authResponse) {
             window.FB.api('/me', function(response) {
                localStorage.setItem("external_id", response.id);
                localStorage.setItem("idtype", "facebook");
             });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    this.logIn = function(platform){
        switch(platform){

        }
    }

    this.IsLoggedIn = function(){
        return localStorage.getItem("external_id") !== undefined;
    }
}
