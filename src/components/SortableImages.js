import React, { Component } from 'react'
import Sortable, { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'

export class Image extends Component {

    constructor() {
        super();
        this.state = {
            style: { 
                height: 175,
                width: 300,
                border : "3px solid red",
                borderStyle: 'hidden'
            }
        }
    }

    handleMouseOver = ()=>{
        this.setState({style: {...this.state.style, borderStyle: "inset"}})
    }

    handleMouseOut = ()=>{
        this.setState({style: {...this.state.style, borderStyle: "hidden"}})
    }

    render() {
        return (
            <div>
                <img onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} src={this.props.image} style={this.state.style} />
            </div>
        );
    }
}

export const ImgContainer = SortableContainer((props) => {
    return (
        <div>
            {props.images.map((image, index) => <SortableImageContainer key={image.src} index={index} image={image.src} />)}
        </div>
    )
});

export const SortableImageContainer = SortableElement((props)=>{
    return (
        <Image image={props.image} />
    );
});