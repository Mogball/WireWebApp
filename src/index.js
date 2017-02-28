import React from 'react';
import ReactDOM from 'react-dom';
import TopLevelApp from './TopLevelApp';
import './css/index.css';

// Top-level render
ReactDOM.render(
    <div className="toplevel">
        <TopLevelApp/>
    </div>,
    document.getElementById('root')
);
