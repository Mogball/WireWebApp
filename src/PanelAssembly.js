import React, {Component} from 'react';
import './css/PanelAssembly.css';
import './css/materialize.css';

import MenuPanel from './MenuPanel';
import HomePanel from './HomePanel';
import AccountPanel from './AccountPanel';
import AccountActionPanel from './AccountActionPanel';

export default class PanelAssembly extends Component {

    render() {
        return (
            <div className="panel-assembly-section">
                <div className="account-panel-section">
                    <AccountPanel
                        user={this.props.user}
                        popupManager={this.props.popupManager}
                        accountCompletion={this.props.user.completion}
                        accountPhoto={this.props.user.photo}
                        walletItems={this.props.walletItems}/>
                    <AccountActionPanel
                        popupManager={this.props.popupManager}/>
                </div>
                <div className="container main-section-block">
                    <div className="side-panel-section">
                        <MenuPanel
                            popupManager={this.props.popupManager}
                            walletItems={this.props.walletItems}/>
                    </div>
                    <div className="mid-panel-section">
                        <HomePanel transactionHistory={this.props.transactionHistory}/>
                    </div>
                </div>
            </div>
        );
    }
}