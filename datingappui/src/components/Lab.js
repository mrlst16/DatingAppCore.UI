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
        var sdk = new Sdk(new Configuration());
        var user = login.getUser();
        var thisRef = this;

        sdk.PostReturnPromise("/api/users/get_user", {
            "IncludePhotos": "true",
            "UserID": user.ID
        }).then((response) => {
            if(response.data.Sucess){
                thisRef.state.images = [];
                console.log(response.data.Result.Photos);
                response.data.Result.Photos.forEach(function(item, index){
                    console.log('item');
                    console.log(item.ID);
                    console.log('index: ' + index);
                    thisRef.state.images.push("https://localhost:44387/api/users/photo?id=" + item.ID);
                });
                thisRef.setState(thisRef.state);
            }
        })
            .catch((error) => {
                console.log("From get Photos ERROR")
                console.log(error);
            });
    }

    componentDidMount(){
        console.log("component mounted");
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({ images: arrayMove(this.state.images, oldIndex, newIndex) })
    }

    render() {

        

        return (

            <div>
                <ImgContainer images={this.state.images} onSortEnd={this.onSortEnd} />
                {/* <img async src="https://localhost:44387/api/users/photo?id=E39CB262-2433-4F04-8F6B-16452F6FE4BC" style={{
                    width: "100px",
                    height: "100px",
                    border: "solid black 2px"
                }}></img> */}

            </div>
        );
    };
}
export default Lab;