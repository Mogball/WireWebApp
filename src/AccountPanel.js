import React, {Component} from 'react';
import './css/AccountPanel.css';
import func from './helper';
import './effects';

export default class AccountPanel extends Component {
    render() {
        return (
            <div className="account-panel-section-block indigo">
                <div className="container">
                    <div className="account-panel-container">
                        <ul>
                            <AccountDisplay
                                accountCompletion={this.props.accountCompletion}
                                accountPhoto={this.props.accountPhoto}/>
                            <AccountInfo
                                user={this.props.user}
                                popupManager={this.props.popupManager}
                                walletItems={this.props.walletItems}/>
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
    constructor(props) {
        super(props);
        this.hideDeposit = this.hideDeposit.bind(this);
        this.hideWithdraw = this.hideWithdraw.bind(this);
        this.clickedDeposit = this.clickedDeposit.bind(this);
        this.clickedWithdraw = this.clickedWithdraw.bind(this);
    }

    hideDeposit() {
        this.props.popupManager.hidePopup("Deposit");
        document.getElementById("Deposit").className = "popup-type-1";
    }

    hideWithdraw() {
        this.props.popupManager.hidePopup("Withdraw");
        document.getElementById("Withdraw").className = 'popup-type-1';
    }

    clickedDeposit() {
        this.props.popupManager.showPopup("Deposit");
        document.getElementById("Deposit").className = "popup-type-1 show";
    }

    clickedWithdraw() {
        this.props.popupManager.showPopup("Withdraw");
        document.getElementById("Withdraw").className = "popup-type-1 show";
    }

    componentDidMount() {
        this.props.popupManager.addPopup("Deposit",
            <WDPopup walletItems={this.props.walletItems} title="Deposit"
                     key="Deposit" hideDeposit={this.hideDeposit}/>
        );
        this.props.popupManager.addPopup("Withdraw",
            <WDPopup walletItems={this.props.walletItems} title="Withdraw"
                     checkBalance={true}
                     key="Withdraw" hideDeposit={this.hideWithdraw}/>
        );
    }

    render() {
        const name = this.props.user.firstName + " " + this.props.user.lastName;
        return (
            <li className="account-info-toplevel">
                <h4>{name}</h4>
                <div className="account-info-container">
                    <div className="account-info">
                        <div className="label-block spread-vertical">
                            <InfoItem>Balance</InfoItem>
                            <InfoItem>Points</InfoItem>
                        </div>
                        <div className="value-block spread-vertical">
                            <InfoItem>{func.formatMoney(this.props.user.balance)}</InfoItem>
                            <InfoItem>{func.formatComma(this.props.user.balancePoints)}</InfoItem>
                        </div>
                    </div>
                    <div className="account-actions">
                        <div className="button-assembly">
                            <div
                                onClick={this.clickedDeposit}
                                className="button btn waves-effect waves-light">
                                <span>Deposit</span>
                            </div>
                            <div
                                onClick={this.clickedWithdraw}
                                className="button btn waves-effect waves-light">
                                <span>Withdraw</span>
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

class WDPopup extends Component {
    constructor(props) {
        super(props);
        this.exit = this.exit.bind(this);
        this.handleWalletItemClick = this.handleWalletItemClick.bind(this);
        this.state = {clickedItem: null};
    }

    exit() {
        this.props.hideDeposit();
        this.refs.popupInputField.value = "";
        this.setState({clickedItem: null});
    }

    handleWalletItemClick(item) {
        if (item.name === this.state.clickedItem) {
            this.setState({clickedItem: null});
        } else {
            this.setState({clickedItem: item.name});
        }
    }

    render() {
        return (
            <div id={this.props.title} className="popup-type-1">
                <div style={{display: "flex", height: "100%", width: "100%"}}>
                    <div style={{flex: 1}} onClick={this.exit}/>
                    <div style={{
                        height: "100%", width: "100%", display: "flex", flexDirection: 'column',
                        maxWidth: 900
                    }}>
                        <div className="BT-padding" onClick={this.exit}/>
                        <div className="popup-window z-depth-2 center">
                            <div className="popup-title-block indigo z-depth-1">
                                <h1>{this.props.title}</h1>
                            </div>
                            <WalletDisplaySect
                                clickedItem={this.state.clickedItem}
                                onClickItem={this.handleWalletItemClick}
                                checkBalance={!!this.props.checkBalance}
                                walletItems={this.props.walletItems}/>
                            <div>
                                <div className="amount-input-container">
                                    <input placeholder="Amount" ref="popupInputField"/>
                                </div>
                            </div>
                            <div className="row popup-buttons">
                                <div
                                    onClick={this.exit}
                                    className="btn-large waves-effect waves-light">
                                    <span>Cancel</span>
                                </div>
                                <div className="btn-large waves-effect waves-light">
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

class WalletDisplaySect extends Component {
    constructor(props) {
        super(props);
        this.handleClickedItems = this.handleClickedItems.bind(this);
    }

    handleClickedItems(item) {
        if (this.props.onClickItem) {
            this.props.onClickItem(item);
        }
    }

    render() {
        const xBlock = [];
        for (var i = 0; i < this.props.walletItems.length; i++) {
            if (this.props.walletItems[i].balance || !this.props.checkBalance) {
                xBlock.push(
                    <li key={i}>
                        <WalletDisplayItem
                            clickedItem={this.props.clickedItem}
                            onClickItem={this.handleClickedItems}
                            item={this.props.walletItems[i]}/>
                    </li>
                );
            }
        }

        return (
            <div className="wallet-display-toplevel">
                <ul>
                    {xBlock}
                </ul>
            </div>
        );
    }
}

class WalletDisplayItem extends Component {
    constructor(props) {
        super(props);
        this.itemClicked = this.itemClicked.bind(this);
    }

    itemClicked() {
        if (this.props.onClickItem) {
            this.props.onClickItem(this.props.item);
        }
    }

    render() {
        const name = this.props.item.name ? this.props.item.name : "";
        const balance = this.props.item.balance ? func.formatMoney(this.props.item.balance) : "";
        return (
            <div
                onClick={this.itemClicked}
                className={"wallet-item-toplevel display-item waves-effect"
                + (this.props.clickedItem === this.props.item.name ? " active" : "")}>
                <div className="item-name">
                    <p>{name}</p>
                </div>
                <div className="item-balance">
                    <p>{balance}</p>
                </div>
            </div>
        );
    }
}