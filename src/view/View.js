import logo from './logo.svg';
import React from 'react';
import './View.css';
import './index.css';

let controller;

export default function View(root, controllerRef) {
    if(controller){
      throw new Error("Cannot instantiate View more than once.");
    }
    controller = controllerRef;
    root.render(
      <React.StrictMode>
        <ViewTest />
      </React.StrictMode>
    );
}

function ViewTest() {
  return (
    <div className="View">
      <header className="View-header">
        <img src={logo} className="View-logo" alt="logo" />
        <p>{controller.getTestMessage()}</p>
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

export { ViewTest, View };
