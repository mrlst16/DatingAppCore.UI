import React, { Component } from 'react'
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Form from 'react-bootstrap/FormControl';
import $ from 'jquery'
import axios from 'axios'


export class ManagePhotos extends Component {

    constructor() {
        super();
    }

    handlesubmit(e) {
        e.preventDefault();

        var file1 = $("#file1")[0].files[0];

        var formData = new FormData();
        formData.append("files", file1);

        var config = new Configuration();
        var login = new LoginManager();

        axios({
            method: 'post',
            url: 'https://localhost:44387/api/users/uploadfiles',
            data: formData,
            headers: {
                'Content-Type': 'multipart/formdata',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword),
                "userid" : login.getUser().ID
            },
        }).then(function (response) {
            console.log("Successfully posted data to ");
            console.log(response);
        }).catch(function (error) {
            console.log("Error posting data to ");
            console.log(error);
        });

    }

    render() {

        var login = new LoginManager();
        var sdk = new Sdk(new Configuration());

        return (
            <div>
                <form id="fileinfo" method="post" encType="multipart/form-data" action="api/Users/UploadFiles"  onSubmit={this.handlesubmit}>
                    <div className="form-group">
                        <div className="col-md-10">
                            <p>Upload a photo</p>
                            <input type="file" name="file" id="file1" accept="image/x-png,image/gif,image/jpeg" />
                            <input type="submit" value="Upload" id="uploadBTN" />
                        </div>
                    </div>

                </form>
            </div>
        );
    };
}
export default ManagePhotos;