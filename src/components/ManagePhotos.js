import React, { Component } from 'react'
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import $ from 'jquery'
import axios from 'axios'
import DatingAppComponent from '../components/DatingAppComponent'

import Sortable, { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { ImgContainer, SortableImageContainer } from './SortableImages'


export class ManagePhotos extends DatingAppComponent {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        }

        this.handlesubmitUpload = this.handlesubmitUpload.bind(this);

        var thisRef = this;

        this.sdk.GetUserPhotos(this.user.id)
            .then((response) => {
                if (response.data.Sucess) {
                    thisRef.state.images = [];
                    response.data.Result.Photos.forEach(function (item, index) {
                        thisRef.state.images.push({
                            ID: item.ID,
                            src: thisRef.config.ApiBaseUrl + "/api/users/get_photo?userid=" + thisRef.user.id + "&filename=" + item.FileName,
                            Rank: item.Rank
                        });
                    });
                    thisRef.setState(thisRef.state);
                }
            })
            .catch((error) => {
                console.log("From get GetUserPhotos ERROR")
                console.log(error);
            });
    }

    handlesubmitUpload(e) {
        e.preventDefault();

        var file1 = $("#file1")[0].files[0];

        var formData = new FormData();
        formData.append("files", file1);

        this.sdk.UploadPhoto(formData, this.user.id)
            .then(function (response) {
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
        var thisRef = this;

        var data = {
            UserID: this.user.id,
            Photos: []
        }

        this.state.images.forEach(function (item, index) {
            data.Photos.push({
                ID: item.ID,
                Rank: index
            });
        });

        this.sdk.SetUserPhotos(data)
            .then((response) => {
            })
            .catch((error) => {
                console.log("From SetUserPhotos ERROR")
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