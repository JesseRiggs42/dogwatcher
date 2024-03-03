import BoardFactory from "../models/BoardFactory";

// TODO:Test this file.
let dispatcherInstance;

export default class Dispatcher {
    constructor(controller, fetcher, models) {
        if(dispatcherInstance) {
            throw new Error('Cannot instantiate more than one dispatcher.');
        }

        dispatcherInstance = this;
        
        this.controller = controller;
        this.fetcher = fetcher;
        this.models = models ?? {};
    }

    sendRequest(request) {
        if(request === null) {
            throw new Error('Cannot dispatch null request.');
        }
        fetchModel(request.getModelKey());
    }

    fetchModel(modelKey) {

        let model = this.models[modelKey];
        if(model === null) {
            let [ baseKey, classKey ] = modelKey.split(constants.KEY_DELIMITER);
            // TODO: grab either cached data or fetch new.
            // culd modelHtml be part of the modelHtml Structure?
            let modelHtml = this.fetcher.fetch(baseKey, baseKey);
            let parsedHtml = this.parser.parse(modelHtml, baseKey);
            model = BoardFactory.create(parsedHtml, classKey);
            this.models[modelKey] = model;
        }

    }
}