import { keys } from '../constants/lang/Base'

let interpreterInstance;

let counter = 0;

export default class Interpreter {
    constructor(countryCodeSelector, languageRepo) {
        if(interpreterInstance) {
            throw new Error(
                interpreterInstance.interpret(
                    keys.ERROR_CANNOT_INSTANTIATE_TWICE,
                    interpreterInstance.constructor.name));
        }
        if(countryCodeSelector === null) {
            throw new Error('Error: countryCodeSelector cannot be null.');
        }
        if(typeof(countryCodeSelector) !== 'function') {
            throw new Error(`Error: countryCodeSelector must be function, found ${typeof(countryCodeSelector)}.`);
        }
        if(languageRepo === null) {
            throw new Error('Error: languageRepor cannot be null.');
        }
        if(typeof(languageRepo) !== 'function') {
            throw new Error(`Error: languageRepo must be function, found ${typeof(languageRepo)}.`);
        }
        interpreterInstance = this;
        this.languageRepo = languageRepo;
        this.countryCodeSelector = countryCodeSelector;
    }

    static getInstance() {
        return interpreterInstance ? interpreterInstance : new Interpreter();
    }

    // Literally WAT? Not saying this is "good" coding practice. But, it's minimal and terse (Code Golf style).
    // languageRepo(countryCode) returns repository that takes code to lookup and return lambda. Lambda can call interpret to
    // recursevly descend the stack of interpretations and return translation.
    interpret(code, subject, context, ...rest) {
        if((code ?? '') === '') return '';
        try{
            const that = this;
            return (((this.languageRepo)(
                        (this.countryCodeSelector)()
                    ))(code)
                )(
                    subject,
                    context,
                    (...otherRest) => that.interpret(...otherRest),
                    ...rest);
        } catch(error) {
            return `Could not internationalize: ${error.message} | code : ${code} | subject : ${subject} | context : ${context}`;
        }
    }
}