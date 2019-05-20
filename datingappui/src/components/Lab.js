import React, { Component } from 'react'
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Form from 'react-bootstrap/FormControl';
import axios from 'axios'
import Sortable, { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { ImgContainer, SortableImageContainer } from './SortableImages'

export class Lab extends Component {

    constructor() {
        super();
        this.state = {
            images: []
        }

        var login = new LoginManager();
        var config = new Configuration();
        var sdk = new Sdk(config);
        var user = login.getUser();
        var thisRef = this;

        sdk.SetUserPhotos(user.ID)
            .then((response) => {
                if (response.data.Sucess) {
                    
                }
            })
            .catch((error) => {
                console.log("From get Photos ERROR")
                console.log(error);
            });
    }

    render() {
        return (
            <div>
            </div>
        );
    };
}
export default Lab;