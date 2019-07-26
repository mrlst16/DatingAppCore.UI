import React, { Component } from 'react'
import DatingAppComponent from '../DatingAppComponent';
import ReviewEditor from './ReviewEditor';

export class Reviews extends DatingAppComponent {
    constructor(props) {
        super(props);

        console.log("Reviews");
        console.log(this.props);
        this.state = {
            ToUserId: '',
            BadgesAndCount: []
        };

        const { userid } = this.props.match.params;
        this.state.ToUserId = userid;

    }

    componentDidMount() {
        console.log("Component did mount");

        var self = this;
        this.sdk.Get("/api/reviews/get_review?userid=" + this.state.ToUserId)
            .then((response) => {
                console.log("response");
                console.log(response);
                if (response.data.sucess) {
                    console.log("Success balls");
                    var state = self.state;
                    state.BadgesAndCount = response.data.result.badgesTable;
                    self.setState(state);
                    console.log("this.state 1");
                    console.log(self.state);
                }
            }).catch((ex) => {
                console.log("Getiting client badges CATCH")
                console.log(ex);
            });

        console.log("this.state 2");
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <div>Reviews of {this.state.ToUserId}</div>
                <div className="reviewBoard">
                    <table>
                        <thead>
                            <th>Badge</th>
                            <th>Count</th>
                        </thead>
                        <tbody>
                            {
                                this.state.BadgesAndCount.map((x, i) =>
                                    <tr key={x.id}>
                                        <td key="">{x.name}</td>
                                        <td key="">{x.count}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="addReview">
                    <ReviewEditor ToUserId={this.state.ToUserId}></ReviewEditor>
                </div>
            </div>
        );
    }
}

export default Reviews