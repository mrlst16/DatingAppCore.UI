import LoginManager from "../../js/LoginManager";
import Configuration from "../../js/Configuration";
import Sdk from "../../js/sdk";


export class MiniProfile extends Component {

    constructor() {
        super();

        this.state = {
            images: []
        }

        console.log("MiniProfile");
        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;
        
        
    }

    render() {

        return (
            <div>
                
            </div>
        );
    };
}
export default MiniProfile;