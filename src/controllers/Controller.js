
let controller;

export default class Controller {
    constructor() {
        // TODO: Create unit test for this.
        if(controller){
            throw new Error("Cannot instantiate controller more than once.");
        }
        controller = this;
    }

    // TODO: Get rid of this.
    getTestMessage() {
        return "Greatings from the controller.";
    }

}

