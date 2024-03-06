import { keys } from '../constants/lang/Base';
import { assertIsFunction } from '../tools/ValidationTools';

const INTERPRETER_CONSTRUCTOR = 'Interpreter.constructor(...)';

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
        assertIsFunction(countryCodeSelector,'countryCodeSelector',INTERPRETER_CONSTRUCTOR);
        assertIsFunction(languageRepo,'languageRepo',INTERPRETER_CONSTRUCTOR);
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