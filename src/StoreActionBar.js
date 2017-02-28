import React, {Component} from 'react';
import './css/materialize.css';
import './css/AccountActionPanel.css';

export default class StoreActionBar extends Component {
    constructor(props) {
        super(props);
        this.focusSearch = this.focusSearch.bind(this);
        this.focusOutSearch = this.focusOutSearch.bind(this);
        this.state = {searchFocus: false}
    }

    focusSearch() {
        this.refs.searchField.setSelectionRange(0, this.refs.searchField.value.length);
        this.setState({searchFocus: true});
    }

    focusOutSearch() {
        if (this.refs.searchField.value === "") {
            this.setState({searchFocus: false});
        }
    }

    render() {
        return (
            <div className="store action-panel-toplevel indigo z-depth-2">
                <div className="container">
                    <div className="super-block">
                        <div className="block-1"/>
                        <div className="action-panel-block store center">
                            <ul>
                                <li style={{flex: 4, paddingRight: "1.5em"}}>
                                    <div className={"store button-container focus"
                                    + (this.state.searchFocus ? " focused" : "")}
                                         onClick={() => {
                                             this.refs.searchField.focus();
                                         }}>
                                        <a className="action-button">
                                            <span>
                                                <input type="search" ref="searchField"
                                                       onFocus={this.focusSearch}
                                                       onBlur={this.focusOutSearch}/>
                                            </span>
                                        </a>
                                    </div>
                                </li>
                                <li style={{flex: 1, paddingRight: "1.5em"}}>
                                    <div className="waves-effect button-container">
                                        <a className="action-button">
                                            <span>
                                                Search
                                            </span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}