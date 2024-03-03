import BoardFactory from "../models/BoardFactory";

// TODO: Finish this class. Won't run, haven't tried.
// TODO: Test this file.
let dispatcherInstance;

export default class Dispatcher {
    constructor(controller, fetcher, defaultModelKey, models) {
        if(dispatcherInstance) {
            throw new Error('Cannot instantiate more than one dispatcher.');
        }

        dispatcherInstance = this;

        this.controller = controller;
        this.fetcher = fetcher;
        this.models = models ?? {};
        this.defaultModelKey = defaultModelKey;
        this.currentModelKey = defaultModelKey;

        isValidDispatcher();
    }

    sendRequest(request) {
        if(request === null) {
            throw new Error('Cannot dispatch null request.');
        }
        __fetch_model(request.getModelKey());
    }

    __fetch_model(modelKey) {

        let model = this.models[modelKey];
        if(model === null) {
            let [ baseKey, classKey ] = modelKey.split(MODEL_KEY_DELIMITER);
            // TODO: grab either cached data or fetch new.
            // culd modelHtml be part of the modelHtml Structure?
            let modelHtml = this.fetcher.fetch(baseKey, baseKey);
            let parsedHtml = this.parser.parse(modelHtml, baseKey);
            model = BoardFactory.create(parsedHtml, classKey);
            this.models[modelKey] = model;
        }

    }
}