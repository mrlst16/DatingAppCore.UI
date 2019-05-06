import Sdk from './sdk'
import Configuration from '../js/Configuration'

export default function LoginManager(){

    var skd = new Sdk(new Configuration());

    this.logout = function(){
        localStorage.clear();
        window.location.reload();
    }

    this.logIn = function(platform){
        switch(platform){
            case "facebook":
                fbLogin();
                break;
            default:
                fbLogin();
        }
    }

    this.IsLoggedIn = function(){
        return localStorage.getItem("external_id") !== null;
    }
    
    function fbLogin (){
        window.fbAsyncInit();
        window.FB.login(function(response) {
            if (response.authResponse) {
             window.FB.api('/me', function(response) {
                localStorage.setItem("external_id", response.id);
                localStorage.setItem("idtype", "facebook");
                window.location.reload();
             });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
}
