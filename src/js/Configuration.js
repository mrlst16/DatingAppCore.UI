export default function Configuration(){
    var devmode = false;
    this.DevMode = devmode;
    this.ApiBaseUrl =  (function(){
        return devmode ? "https://localhost:44387" : "https://165.22.73.20:3005";
    })();
    this.ClientID = "FCD9DE9B-49FB-4D47-A064-20E666F3967F";
    this.ClientUserName = "FCD9DE9B-49FB-4D47-A064-20E666F3967F";
    this.ClientPassword = "Password1!";

}