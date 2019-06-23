import React, { Component } from 'react'
import DatingAppComponent from '../DatingAppComponent';
import Sdk from '../../js/sdk';
import Configuration from '../../js/Configuration';

export class ReviewEditor extends DatingAppComponent {
    constructor(props) {
        super(props);

        console.log("Review Editor");
        console.log(this.props);
        this.state = {
            ToUserId: this.props.ToUserId,
            BadgeOptions: [],
            BadgeSelections: []
        };
    }

    componentDidMount() {
        var self = this;
        this.sdk.Get("/api/reviews/get_client_badges")
            .then((response) => {
                if (response.data.result.sucess) {
                    var state = self.state;
                    state.BadgeOptions = response.data.result.result;
                    self.setState(state);
                }
            }).catch((ex) => {
                console.log("Getiting client badges CATCH")
                console.log(ex);
            });
    }

    handleChange(event, item) {
        if (event.target.checked) {
            var state = this.state;
            state.BadgeSelections.push(item);
            this.setState(state);
        } else {
            var state = this.state;
            var filtered = state.BadgeSelections.filter(function (value, index, arr) {
                return value.id != item.id;
            });
            state.BadgeSelections = filtered;
            this.setState(state);
        }
    }

    handleSubmit() {
        console.log("handling submit");
        var config = new Configuration();
        var sdk = new Sdk(config);

        sdk.Post("/api/reviews/send", {
            SenderID: this.user.id,
            ReceiverID: this.state.ToUserId,
            Badges: this.state.BadgeSelections
        })
            .then((response) => {
                console.log(response);
                if (response.data.result.sucess) {
                    console.log("success");

                }
            }).catch((ex) => {
                console.log("Getiting client badges CATCH")
                console.log(ex);
            });
    }

    render() {
        return (
            <div>
                <div>Add a Review of {this.state.ToUserId}</div>
                {
                    this.state.BadgeOptions.map((x, i) =>
                        <div key={x.id}>
                            <span>{x.name}</span>
                            <input type="checkbox" name="badges" key={x.id} onClick={(e) => this.handleChange(e, x)}></input>
                        </div>
                    )
                }
                <div>
                    <input type="submit" onClick={(e) => this.handleSubmit()}></input>
                </div>
            </div>
        );
    }
}

export default ReviewEditor