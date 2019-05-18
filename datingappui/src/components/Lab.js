import React, { Component } from 'react'
import Login from './Login'
import Sdk from '../js/sdk'
import Configuration from '../js/Configuration';
import LoginManager from '../js/LoginManager';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import Form from 'react-bootstrap/FormControl';
import axios from 'axios'
import Sortable, { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import {ImgContainer, SortableImageContainer} from './SortableImages'

export class Lab extends Component {

    constructor() {
        super();
        this.state = {
            images: [
                'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.kidsmathgamesonline.com%2Fimages%2Fpictures%2Fnumbers600%2Fnumber1.jpg&imgrefurl=http%3A%2F%2Fwww.kidsmathgamesonline.com%2Fpictures%2Fnumbers%2Fnumber1.html&docid=dBFJkb6XAUiDXM&tbnid=4I_roiWegvStRM%3A&vet=10ahUKEwjGh5vZo6HiAhVyUt8KHb6dBC4QMwhwKAgwCA..i&w=600&h=600&bih=663&biw=767&q=number&ved=0ahUKEwjGh5vZo6HiAhVyUt8KHb6dBC4QMwhwKAgwCA&iact=mrc&uact=8',
                'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.playosmo.com%2Fimages%2Fgames%2Fnumbers%2Ftiles%2F1b9307e.numbers-tile-2.png&imgrefurl=https%3A%2F%2Fwww.playosmo.com%2Fen%2Fnumbers%2F&docid=ymCXdibLwcO7HM&tbnid=3OaGqL0atj1QaM%3A&vet=10ahUKEwjGh5vZo6HiAhVyUt8KHb6dBC4QMwiKASgVMBU..i&w=237&h=238&bih=663&biw=767&q=number&ved=0ahUKEwjGh5vZo6HiAhVyUt8KHb6dBC4QMwiKASgVMBU&iact=mrc&uact=8',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasqOXMj1Fw1gkpVMlgUiXC9yCJe2dw-Db8ShDsBcIqb89roHJ',
                'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn3.volusion.com%2Fmavpp.cfwce%2Fv%2Fvspfiles%2Fphotos%2FCS1059-3000-2.jpg&imgrefurl=https%3A%2F%2Fwww.colorstaronline.com%2FAdult_8_inch_Jersey_Number_Team_Pack_in_Pink_p%2Fcs1059-3000.htm&docid=Jfi98rM8fWxXWM&tbnid=GrMRHWLTg_TriM%3A&vet=10ahUKEwjGh5vZo6HiAhVyUt8KHb6dBC4QMwhyKAowCg..i&w=911&h=1200&bih=663&biw=767&q=number&ved=0ahUKEwjGh5vZo6HiAhVyUt8KHb6dBC4QMwhyKAowCg&iact=mrc&uact=8'
            ]
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({ images: arrayMove(this.state.images, oldIndex, newIndex) })
    }

    render() {

        var login = new LoginManager();
        var sdk = new Sdk(new Configuration());

        return (

            <div>
                {/* <ImgContainer images={this.state.images} onSortEnd={this.onSortEnd} /> */}
                <img async src="https://localhost:44387/api/users/photo?id=E39CB262-2433-4F04-8F6B-16452F6FE4BC" style={{
                    width: "100px",
                    height: "100px",
                    border: "solid black 2px"
                }}></img>

            </div>
        );
    };
}
export default Lab;