import React, {Component} from 'react';
import prop from './config';
import './css/Header.css';
import './css/materialize.css';

export default class Header extends Component {
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {activeButton: "Home"};

        // Bind functions
        this.handleClick = this.handleClick.bind(this);
        this.getActive = this.getActive.bind(this);
        this.setActive = this.setActive.bind(this);
    }

    handleClick(buttonLabel) {
        if (buttonLabel !== this.state.activeButton) {
            // Novel clicked button
            this.setActive(buttonLabel);
            this.props.navClick(buttonLabel);
        }
    }

    getActive(buttonLabel) {
        return this.state.activeButton === buttonLabel ? " active" : "";
    }

    setActive(buttonLabel) {
        this.setState({activeButton: buttonLabel});
    }

    render() {
        const headerButtons = prop.cfg.header.buttonLabels.map((buttonLabel) =>
            <li key={buttonLabel}>
                <a onClick={() => {
                    this.handleClick(buttonLabel)
                }}
                   id={buttonLabel} className={"waves-effect nav-bar-button" + this.getActive(buttonLabel)}>
                    <p className={"nav-bar-button-text" + this.getActive(buttonLabel)}>
                        {buttonLabel}
                    </p>
                </a>
            </li>
        );
        return (
            <HeaderContainer>
                <HeaderTitle />
                <HeaderButtonComplex>
                    {headerButtons}
                </HeaderButtonComplex>
            </HeaderContainer>
        );
    }
}

const HeaderContainer = function (props) {
    return (
        <div className="header-container indigo darken-2 z-depth-1">
            <div className="container">
                <div className="nav-bar">
                    <div className="nav-container">
                        <ul className="nav-bar-button-container small-margin">
                            {props.children}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeaderTitle = function () {
    return (
        <li className="logo">
            <div className="nav-bar-logo-block">
                <p href="../" className="logo">{prop.cfg.header.title}</p>
            </div>
        </li>
    );
};

const HeaderButtonComplex = function (props) {
    return (
        <li>
            <div className="nav-bar-button-block">
                <ul className="nav-bar-button-container">
                    {props.children}
                </ul>
            </div>
        </li>
    );
};