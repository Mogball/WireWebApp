import React, {Component} from 'react';
import './css/AccountPanel.css';
import './effects';
import "./helper";

export default class StoreHeader extends Component {
    render() {
        return (
            <div className="account-panel-section-block indigo">
                <div className="container">
                    <div className="account-panel-container">
                        <ul>
                            <AccountDisplay
                                accountCompletion={this.props.user.completion}
                                accountPhoto={this.props.user.photo}/>
                            <AccountInfo
                                user={this.props.user}/>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

class AccountDisplay extends Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            // STUB data
            accountCompletion: props.accountCompletion ? props.accountCompletion : 0,
            accountPhoto: props.accountPhoto ? props.accountPhoto : null
        };

        // Bind functions
    }

    componentDidMount() {
        const canvas = this.refs.accountProgress;
        const ctx = canvas.getContext('2d');
        const hw = canvas.width / 2;
        const hh = canvas.height / 2;
        ctx.fillStyle = '#b2ff59';
        ctx.beginPath();
        ctx.moveTo(hw, hh);
        ctx.arc(hw, hh, 2 * hh, 0, Math.PI * this.state.accountCompletion / 50, false);
        ctx.fill();
    }

    render() {
        return (
            <li>
                <div className="profile-picture-container">
                    <div className="block">
                        <div className="profile-picture-assembly">
                            <canvas ref="accountProgress"/>
                            <div className="sub-block-1">
                                <div className="sub-block-2">
                                    <div className="profile-picture waves-effect">
                                        <img alt="profilePic"
                                             src={this.state.accountPhoto}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

class AccountInfo extends Component {

    render() {
        const user = this.props.user;
        const name = user.firstName + " " + user.lastName;
        return (
            <li className="account-info-toplevel">
                <h4>{name}</h4>
                <div className="account-info-container">
                    <div className="account-info">
                        <div className="label-block spread-vertical">
                            <InfoItem>Reputation</InfoItem>
                            <InfoItem>Active Postings</InfoItem>
                        </div>
                        <div className="value-block store spread-vertical">
                            <InfoItem>{this.props.user.reputation}</InfoItem>
                            <InfoItem>{this.props.user.postings}</InfoItem>
                        </div>
                    </div>
                    <div className="account-actions">
                        <div className="button-assembly store">
                            <div
                                className="button btn waves-effect waves-light">
                                <span>Make Posting</span>
                            </div>
                            <div
                                className="button btn waves-effect waves-light">
                                <span>My Postings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

const InfoItem = function (props) {
    return (
        <div className="isub-block-1">
            <div className="isub-block-2">
                <span><h5>{props.children}</h5></span>
            </div>
        </div>
    );
};
