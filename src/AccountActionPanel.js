import React, {Component} from 'react';
import './css/materialize.css';
import './css/AccountActionPanel.css';
import prop from './config';

export default class AccountActionPanel extends Component {
    constructor(props) {
        super(props);
        this.showSend = this.showSend.bind(this);
        this.showRequest = this.showRequest.bind(this);
        this.hideSend = this.hideSend.bind(this);
        this.hideRequest = this.hideRequest.bind(this);
        this.action = this.action.bind(this);
    }

    showSend() {
        this.props.popupManager.showPopup("Send");
        document.getElementById("Send").className = "popup-type-1 show";
    }

    showRequest() {
        this.props.popupManager.showPopup("Request");
        document.getElementById("Request").className = "popup-type-1 show";
    }

    hideSend() {
        this.props.popupManager.hidePopup("Send");
        document.getElementById("Send").className = "popup-type-1";
    }

    hideRequest() {
        this.props.popupManager.hidePopup("Request");
        document.getElementById("Request").className = "popup-type-1";
    }

    componentDidMount() {
        this.props.popupManager.addPopup("Send",
            <SRPopup key="Send" title="Send" hideDeposit={this.hideSend}/>
        );
        this.props.popupManager.addPopup("Request",
            <SRPopup key="Request" title="Request" hideDeposit={this.hideRequest}/>
        );
    }

    action(label) {
        if (label === "Send") {
            this.showSend();
        } else if (label === "Request") {
            this.showRequest();
        }
    }

    render() {
        const actionLabels = prop.cfg.actionPanel.actionLabels.map((label) => {
            return (
                <ActionButton onClickAction={this.action} label={label} key={label}/>
            );
        });
        return (
            <div className="action-panel-toplevel indigo z-depth-2">
                <div className="container">
                    <div className="super-block">
                        <div className="block-1"/>
                        <div className="action-panel-block center">
                            <ul>
                                {actionLabels}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        if (this.props.onClickAction) {
            this.props.onClickAction(this.props.label);
        }
    }

    render() {
        return (
            <li onClick={this.clicked}>
                <div className="waves-effect button-container">
                    <a className="action-button">
                        <span>{this.props.label}</span>
                    </a>
                </div>
            </li>
        );
    }
}

class SRPopup extends Component {
    constructor(props) {
        super(props);
        this.exit = this.exit.bind(this);
    }

    exit() {
        this.props.hideDeposit();
        this.refs.popupInputField.value = "";
        this.refs.recipientInfoField.value = "";
    }

    render() {
        return (
            <div id={this.props.title} className="popup-type-1">
                <div style={{display: "flex", height: "100%", width: "100%"}}>
                    <div style={{flex: 1}} onClick={this.exit}/>
                    <div style={{
                        height: "100%", width: "100%", display: "flex", flexDirection: 'column',
                        maxWidth: 800, margin: 'auto'
                    }}>
                        <div className="BT-padding" onClick={this.exit}/>
                        <div className="popup-window z-depth-2 center">
                            <div className="popup-title-block teal lighten-1 z-depth-1">
                                <h1>{this.props.title}</h1>
                            </div>
                            <div>
                                <div className="amount-input-container">
                                    <input placeholder="Email/Phone Number"
                                           ref="recipientInfoField"/>
                                </div>
                                <div className="amount-input-container secondary">
                                    <input placeholder="Amount" ref="popupInputField"/>
                                </div>
                            </div>
                            <div className="row popup-buttons">
                                <div
                                    onClick={this.exit}
                                    className="btn-large waves-effect waves-light purple-btn">
                                    <span>Cancel</span>
                                </div>
                                <div className="btn-large waves-effect waves-light purple-btn">
                                    <span>{this.props.title}</span>
                                </div>
                            </div>
                        </div>
                        <div className="BT-padding" onClick={this.exit}/>
                    </div>
                    <div style={{flex: 1}} onClick={this.exit}/>
                </div>
            </div>
        );
    }
}