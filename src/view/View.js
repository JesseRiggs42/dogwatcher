import logo from './logo.svg';
import React from 'react';
import './View.css';
import './index.css';
import TestChart from './Charts/TestChart';

export default class View extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.controller = props.controller;
    }

    render() {
      return this.ViewTest();
    }

    ViewTest() {
      return (
        <div className="View">
          <header className="View-header">
            <img src={logo} className="View-logo" alt="logo" />
            <p>{this.controller.getTestMessage()}</p>
            <div id='testchart'><TestChart /></div>
            <p>
              Edit <code>src/View.js</code> and save to reload.
            </p>
            <a
              className="View-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
}

export { View };
