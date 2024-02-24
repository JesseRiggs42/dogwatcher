import Controler from './controlers/Controler';
import ReactDOM from 'react-dom/client';
import View from './view/View';

/** TODO: finalize POC and test everything. */
const controler = new Controler();
const root = ReactDOM.createRoot(document.getElementById('root'));
const view = View(root, controler);
