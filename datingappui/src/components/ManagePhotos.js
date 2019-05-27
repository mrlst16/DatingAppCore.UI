import React, { Component } from 'react'
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import $ from 'jquery'
import axios from 'axios'

import Sortable, { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { ImgContainer, SortableImageContainer } from './SortableImages'


export class ManagePhotos extends Component {

    constructor() {
        super();

        this.state = {
            images: []
        }

        console.log("Manage Photos");
        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;

        sdk.GetUserPhotos(user.id)
            .then((response) => {
                console.log("response");
                console.log(response);
                if (response.data.Sucess) {
                    thisRef.state.images = [];
                    response.data.Result.Photos.forEach(function (item, index) {
                        thisRef.state.images.push({
                            ID: item.ID,
                            src: config.ApiBaseUrl + "/api/users/get_photo?id=" + item.ID,
                            Rank: item.Rank
                        });
                    });
                    thisRef.setState(thisRef.state);
                }
            })
            .catch((error) => {
                console.log("From get Photos ERROR")
                console.log(error);
            });
    }

    handlesubmitUpload(e) {
        e.preventDefault();

        var file1 = $("#file1")[0].files[0];

        var formData = new FormData();
        formData.append("files", file1);

        var config = new Configuration();
        var login = new LoginManager();

        axios({
            method: 'post',
            url: 'https://localhost:44387/api/users/upload_photo',
            data: formData,
            headers: {
                'Content-Type': 'multipart/formdata',
                'Access-Control-Allow-Origin': 'true',
                'ClientID': config.ClientID,
                'Authorization': 'Basic ' + btoa(config.ClientUserName + ":" + config.ClientPassword),
                "userid": login.getUser().id
            },
        }).then(function (response) {
            window.location.reload();
        }).catch(function (error) {
            console.log("Error posting data to ");
            console.log(error);
        });

    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({ images: arrayMove(this.state.images, oldIndex, newIndex) })
    }

    onSaveOrderClick() {
        console.log("Clicked Save Order")

        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;

        var data = {
            UserID: user.id,
            Photos: []
        }

        this.state.images.forEach(function (item, index) {
            data.Photos.push({
                ID: item.ID,
                Rank: index
            });
        });

        sdk.SetUserPhotos(data)
            .then((response) => {
            })
            .catch((error) => {
                console.log("From Set Photos ERROR")
                console.log(error);
            });
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <form id="fileinfo" method="post" encType="multipart/form-data" action="api/Users/UploadFiles" onSubmit={this.handlesubmitUpload}>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <p>Upload a photo</p>
                                            <input type="file" name="file" id="file1" accept="image/x-png,image/gif,image/jpeg" />
                                            <input type="submit" value="Upload" id="uploadBTN" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input type="submit" className="button" value="Save Order" onClick={() => { this.onSaveOrderClick() }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <ImgContainer images={this.state.images} onSortEnd={this.onSortEnd} />
                        </div>
                    </div>
                </div>


            </div>
        );
    };
}
export default ManagePhotos;