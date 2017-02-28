import React, {Component} from 'react';
import './css/MenuPanel.css';
import './css/materialize.css';
import prop from './config.js';
import func from './helper';
import './css/HomePanel.css';

export default class MenuPanel extends Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            // STUB dataAdd
            walletItems: props.walletItems
        }
    }

    render() {
        return (
            <WalletListPanel
                popupMan={this.props.popupManager}
                walletItems={this.state.walletItems}/>
        );
    }
}

class WalletListPanel extends Component {
    render() {
        return (
            <div className="home-panel-section z-depth-1">
                <div className="home-items-panel">
                    <div className="history-list-toplevel">
                        <div className="z-depth-1 history-panel-title center indigo lighten-1">
                            <h5>{prop.cfg.menuPanel.sideMenuTitle}</h5>
                        </div>
                        <WalletList
                            popupMan={this.props.popupMan}
                            items={this.props.walletItems}/>
                    </div>
                </div>
            </div>
        );
    }
}

class WalletList extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: {name: "null"}};
        this.clickedItem = this.clickedItem.bind(this);
        this.hideRemove = this.hideRemove.bind(this);
        this.getClicked = this.getClicked.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.hideAdd = this.hideAdd.bind(this);
    }

    getClicked() {
        return this.state.clicked;
    }

    showAdd() {
        this.props.popupMan.showPopup("Add");
        document.getElementById("Add").className = "popup-type-1 show";
    }

    hideRemove() {
        this.props.popupMan.hidePopup("Remove");
        document.getElementById("Remove").className = "popup-type-1";
    }

    hideAdd() {
        this.props.popupMan.hidePopup("Add");
        document.getElementById("Add").className = "popup-type-1";
    }

    componentDidMount() {
        this.props.popupMan.addPopup("Remove",
            <RemovePopup key="Remove" title="Remove" hideDeposit={this.hideRemove}
                         getClicked={this.getClicked}/>
        );
        this.props.popupMan.addPopup("Add",
            <AddPopup key="Add" title="Add" hideDeposit={this.hideAdd}/>
        );
    }

    clickedItem(item) {
        this.setState({clicked: item});
        this.props.popupMan.addPopup("Remove",
            <RemovePopup key="Remove" title="Remove" hideDeposit={this.hideRemove}
                         getClicked={item}/>
        );
        this.props.popupMan.showPopup("Remove");
        document.getElementById("Remove").className = "popup-type-1 show";
    }

    render() {
        const items = this.props.items ?
            this.props.items.map((item) => {
                return (
                    <li key={item.name}>
                        <WalletItem
                            clickedItem={this.clickedItem}
                            item={item}/>
                    </li>
                );
            }) : null;
        return (
            <ul className="wallet-list center">
                <li>
                    <a onClick={this.showAdd}
                       className="button btn waves-effect waves-light add-button">
                        <span className="no-drag">Add</span>
                    </a>
                </li>
                {items}
            </ul>
        );
    }
}

class WalletItem extends Component {
    constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    clicked() {
        if (this.props.clickedItem) {
            this.props.clickedItem(this.props.item);
        }
    }

    render() {
        const name = this.props.item.name ? this.props.item.name : "";
        const balance = this.props.item.balance ? func.formatMoney(this.props.item.balance) : "";
        return (
            <div onClick={this.clicked}
                 className="wallet-item-toplevel waves-effect">
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

class RemovePopup extends Component {
    constructor(props) {
        super(props);
        this.exit = this.exit.bind(this);
        this.getItem = this.getItem.bind(this);
    }

    exit() {
        this.props.hideDeposit();
    }

    getItem() {
        return this.props.getClicked;
    }

    render() {
        return (
            <div id={this.props.title} className="popup-type-1">
                <div style={{display: "flex", height: "100%", width: "100%"}}>
                    <div style={{flex: 1}} onClick={this.exit}/>
                    <div style={{
                        height: "100%", width: "100%", display: "flex",
                        flexDirection: 'column', maxWidth: 800, margin: 'auto'
                    }}>
                        <div className="BT-padding" onClick={this.exit}/>
                        <div className="popup-window z-depth-2 center">
                            <div className="popup-title-block teal lighten-1 z-depth-1">
                                <h1>{this.props.title}</h1>
                            </div>
                            <div className="remove-popup-item">
                                <div className="remove-popup-item-block">
                                    <WalletItem item={this.getItem()}/>
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

class AddPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {radio: "none"};
        this.exit = this.exit.bind(this);
        this.clicked = this.clicked.bind(this);
        this.empty = this.empty.bind(this);
    }

    clicked() {
        this.setState({radio: "clicked"});
    }

    exit() {
        const radios = document.getElementsByName("group1");
        for (let i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }
        this.forceUpdate();
        this.empty();
        this.props.hideDeposit();
    }

    empty() {
        for (let i = 1; i <= 8; i++) {
            const name = "field" + i;
            if (this.refs[name]) {
                this.refs[name].value = "";
            }
        }
    }

    render() {
        let optionFields;
        const radios = document.getElementsByName("group1");
        let value;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                value = radios[i].value;
                break;
            }
        }
        if (value === "card") {
            optionFields = (
                <div className="add-option-field">
                    <input placeholder="Card Number"
                           ref="field1"/>
                    <input placeholder="Expiry Date"
                           ref="field2"/>
                    <input placeholder="CSV"
                           ref="field3"/>
                </div>
            );
        } else if (value === "bank") {
            optionFields = (
                <div className="add-option-field">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="First Name" ref="field5"/>
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="Last Name" ref="field6"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Account Number"
                                   ref="field4"/>
                        </div>
                    </div>
                </div>
            );
        } else if (value === "paypal") {
            optionFields = (
                <div className="add-option-field">
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="PayPal Email"
                                   ref="field7"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="password" placeholder="Password"
                                   ref="field8"/>
                        </div>
                    </div>
                </div>
            );
        } else {
            optionFields = null;
        }
        return (
            <div id={this.props.title} className="popup-type-1">
                <div style={{display: "flex", height: "100%", width: "100%"}}>
                    <div style={{flex: 1}} onClick={this.exit}/>
                    <div style={{
                        height: "100%", width: "100%", display: "flex",
                        flexDirection: 'column', maxWidth: 800, margin: 'auto'
                    }}>
                        <div className="BT-padding" onClick={this.exit}/>
                        <div className="popup-window z-depth-2 center">
                            <div className="popup-title-block indigo z-depth-1">
                                <h1>{this.props.title}</h1>
                            </div>
                            <div className="add-wallet-item">
                                <div className="add-options" onClick={this.clicked}>
                                    <form ref="addForm" style={{minHeight: "8em", minWidth: "8.7em"}}>
                                        <p>
                                            <input
                                                onClick={this.empty}
                                                value="card"
                                                name="group1" type="radio" id="addOp1"/>
                                            <label htmlFor="addOp1">Credit/Debit</label>
                                        </p>
                                        <p>
                                            <input
                                                onClick={this.empty}
                                                value="bank"
                                                name="group1" type="radio" id="addOp2"/>
                                            <label htmlFor="addOp2">Bank Account</label>
                                        </p>
                                        <p>
                                            <input
                                                onClick={this.empty}
                                                value="paypal"
                                                name="group1" type="radio" id="addOp3"/>
                                            <label htmlFor="addOp3">PayPal</label>
                                        </p>
                                    </form>
                                </div>
                                <div className="add-fields center">
                                    {optionFields}
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