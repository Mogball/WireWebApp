import React, {Component} from 'react';

import './css/HomePanel.css';
import './css/materialize.css';
import func from './helper';
import prop from "./config";

export default class HomePanel extends Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            // STUB data
            transactionHistory: props.transactionHistory
        }
    }

    render() {
        return (
            <div className="home-panel-section z-depth-1">
                <div className="home-items-panel">
                    <HistoryPanel items={this.state.transactionHistory}/>
                </div>
            </div>
        );
    }
}

class HistoryPanel extends Component {
    render() {
        const items = this.props.items ?
            this.props.items.map((item) => {
                return (
                    <li key={item.timestamp}><HistoryItem item={item}/></li>
                );
            }) : null;
        return (
            <div className="history-list-toplevel">
                <div className="z-depth-1 history-panel-title center teal lighten-1">
                    <h5>{prop.cfg.homePanel.transactionHistoryLabel}</h5>
                </div>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

class HistoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {collapsed: true};
        this.collapsed.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getStyle = this.getStyle.bind(this);
    }

    collapsed() {
        return this.state.collapsed ? 0 :
            this.refs.collapseData.clientHeight;
    }

    handleClick() {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    }

    getStyle() {
        return this.state.collapsed ? "" : " expanded";
    }

    render() {
        return (
            <div>
                <div className={"history-toplevel-background" + this.getStyle()}>
                    <div className={"history-toplevel" + this.getStyle() + " waves-effect"}
                         onClick={this.handleClick}>
                        <p className="history-date">
                            {func.formatDate(new Date(this.props.item.timestamp), true)}
                        </p>
                        <div className="history-item-block">
                            <div className="history-item-desc-block">
                                <p className="username">
                                    {this.props.item.username}
                                </p>
                                <p className="description">
                                    {this.props.item.description}
                                </p>
                            </div>
                            <p className="history-change">
                                {func.formatMoney(this.props.item.change, true)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="history-item-info" style={{height: this.collapsed()}}>
                    <div ref="collapseData">
                        <div className="collapse-data">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi risus dolor, rutrum et nibh
                            ac,
                            cursus dictum turpis. Morbi leo dolor, lobortis sit amet pulvinar ac, dignissim eu ligula.
                            Vestibulum scelerisque vel massa quis pellentesque. Integer eros mi, volutpat non mauris id,
                            iaculis
                            gravida ipsum. Vestibulum vel ipsum eu dolor congue placerat. Mauris ultricies nunc nec
                            ligula
                            volutpat posuere. Curabitur tristique, nisl et pharetra faucibus, lectus nulla tristique
                            nibh,
                            non
                            egestas dui sem vehicula justo. Suspendisse vel lobortis odio, a feugiat nibh. Mauris
                            sodales
                            gravida lacus, at tincidunt velit rutrum non. Donec tincidunt luctus ligula, a vestibulum
                            libero
                            lacinia tempor. Etiam orci est, gravida ac consectetur eget, tincidunt at elit. Cras aliquet
                            nec
                            ante at posuere. In vel pharetra orci, non mattis est. Etiam a varius quam. Morbi imperdiet
                            tortor
                            augue, id scelerisque mi interdum aliquet. Sed nec risus pretium, efficitur mi a, iaculis
                            lectus.
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}