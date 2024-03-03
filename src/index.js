import Controller from './controllers/Controller';
import React from 'react';
import ReactDOM from 'react-dom/client';
import View from './view/View';

/** TODO: finalize POC and test everything. */
const controller = new Controller();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <View controller={controller} />
    </React.StrictMode>
);
