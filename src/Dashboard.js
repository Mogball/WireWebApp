import React, {Component} from 'react';
import Header from './Header';
import PanelAssembly from './PanelAssembly';
import StorePanelAssembly from './StorePanelAssembly';
import ManagePanelAssembly from './ManagePanelAssembly';
import update from 'immutability-helper';
import './css/Dashboard.css';

export default class Dashboard extends Component {
    static get defaultProps() {
        return {
            user: {
                firstName: "Emeritus",
                lastName: "Pachementyke",
                balance: 3354743562,
                balancePoints: 23145252,
                uid: "111111111111",
                email: "emeritus.pachementyke@terran.cdn",
                phone: "11111111111",
                reputation: 100,
                ratings: 128,
                postings: 25,
                location: {
                    country: "Terran Confederation",
                    state: "Hyperion",
                    city: "Prefecture 0",
                },
                photo: require('./res/stubProfilePic.jpg'),
                completion: 55
            },
            walletItems: [
                {name: "The swag bank of swagland, xd xd", balance: 999999849599},
                {name: "RBC Visa Infinity"},
                {name: "Bank of Americard"},
                {name: "RBC Express Checking", balance: -231423},
                {name: "TD Canada Trust", balance: 232312314},
                {name: "UnionPay", balance: 5245351},
                {name: "PayPal Mastercard Express", balance: 877573},
                {name: "Swag card 360 xd Bonus edition ;^)"},
                {name: "Mega swagalicious card"}
            ],
            transactionHistory: [
                {
                    change: -765, timestamp: 61658567754356, uid: 846542106359,
                    username: "Tim Hortons", description: "Retail payment"
                },
                {
                    change: -34, timestamp: 61657934532554, uid: 986754213424,
                    username: "Eugene Wang", description: "Direct transfer"
                },
                {
                    change: -7524, timestamp: 61656454235334, uid: 456453446425,
                    username: "Amazon", description: "Purchase of 3 items"
                },
                {
                    change: -3425, timestamp: 61359973947937, uid: 345553444321,
                    username: "Steam", description: "Skyrim Legendary Edition"
                },
                {
                    change: 3553211, timestamp: 61345332441324, uid: 243213532453,
                    username: "OLB Crazy 75", description: "Lottery winnings"
                },
                {
                    change: 600000, timestamp: 61345235443643, uid: 435652432411,
                    username: "Forerunner Matthias", description: "Requested expenses"
                },
                {
                    change: 3235, timestamp: 61344156143742, uid: 642342523451,
                    username: "Forerunner Elinor", description: "Compensation for dinner"
                },
                {
                    change: -682745, timestamp: 61343635546543, uid: 363454624512,
                    username: "Origin PCs", description: "Thank you for your purchase!"
                },
                {
                    change: -1253, timestamp: 61342456134666, uid: 435146334674,
                    username: "McDonald's", description: "Retail purchase"
                },
                {
                    change: -43251, timestamp: 61341543246532, uid: 673856253525,
                    username: "Nintendo", description: "Nintendo Switch"
                },
            ]
        }
    }

    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            activeScreen: "Home",
            shows: {}
        };
        this.popups = {};

        // Bind functions
        this.navClick = this.navClick.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.addPopup = this.addPopup.bind(this);
        this.removePopup = this.removePopup.bind(this);
    }

    navClick(screen) {
        if (this.state.actionScreen !== screen) {
            this.setState(
                {
                    activeScreen: screen,
                    shows: {}
                }
            );
            this.popups = {};
        }
    }

    showPopup(name) {
        this.setState({
            shows: update(this.state.shows, {[name]: {$set: true}})
        });
    }

    hidePopup(name) {
        this.setState({
            shows: update(this.state.shows, {[name]: {$set: false}})
        });
    }

    addPopup(name, popup) {
        this.popups[name] = popup;
        this.setState({
            shows: update(this.state.shows, {[name]: {$set: false}})
        });
    }

    removePopup(name) {
        this.popups[name] = null;
        this.setState({
            shows: update(this.state.shows, {[name]: {$set: null}})
        });
    }

    render() {
        const popups = [];
        let active = 0;
        for (let name in this.popups) {
            if (this.popups.hasOwnProperty(name)) {
                if (this.state.shows[name]) {
                    active++;
                }
                if (this.popups[name]) {
                    popups.push(this.popups[name]);
                }
            }
        }
        const popupManager = (
            <PopupManager popups={popups} active={active !== 0}/>
        );
        let activeScreen;
        if (this.state.activeScreen === "Home") {
            activeScreen = (
                <PanelAssembly
                    user={this.props.user}
                    walletItems={this.props.walletItems}
                    transactionHistory={this.props.transactionHistory}
                    popupManager={this}/>
            );
        } else if (this.state.activeScreen === "Store") {
            activeScreen = (
                <StorePanelAssembly
                    user={this.props.user}
                    popupManager={this}/>
            );
        } else if (this.state.activeScreen === "Manage") {
            activeScreen = (
                <ManagePanelAssembly popupManager={this}/>
            );
        } else {
            activeScreen = null;
        }
        return (
            <div className="dashboard">
                {popupManager}
                <Header navClick={this.navClick} activeScreen={this.state.activeScreen}/>
                <div className="header-placeholder"/>
                {activeScreen}
            </div>
        );
    }
}

class PopupManager extends Component {
    render() {
        return (
            <div className={this.props.active ? "popup show" : "popup"}>
                {this.props.popups}
            </div>
        );
    }
}