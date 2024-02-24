
// TODO:Test this file.
const MODELS = {};
const TIMESTAMPS = {
    lastRequest : Date.now(),
    lastResponse : Date.now()
};
let dispatcherInstance;

export default class Dispatcher {
    constructor() {
        if(dispatcherInstance) {
            throw new Error('Cannot instantiate more than one dispatcher.');
        }
        dispatcherInstance = this;
    }

    sendRequest(request) {
        if(request === null) {
            throw new Error('Cannot dispatch null request.');
        }
    }
}