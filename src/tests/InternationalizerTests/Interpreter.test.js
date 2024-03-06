import { CountryCodes } from '../../constants/lang/CountryCodes';
import Repo from '../../internationalizer/repo/Repo';
import Interpreter from '../../internationalizer/Interpreter';
import { keys } from '../../constants/LangKeys'

describe("Interpreter behaves as expected", () => {
    let interpreter;

    describe("When using invalid inputs", () => {
        test("Null countryCodeSelector throws expected error.", () => {
            try {
                interpreter = new Interpreter(null, null);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toEqual('Element "countryCodeSelector" in "Interpreter.constructor(...)" is expected to be non-null');
            }
        });
        test("Non-function countryCodeSelector throws expected error.", () => {
            try {
                interpreter = new Interpreter(42, null);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toEqual('"countryCodeSelector" is expected to be of type "function" but is "number".');
            }
        });

        test("Null languageRepo throws expected error.", () => {
            try {
                interpreter = new Interpreter(()=>{''}, null);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toEqual('Element "languageRepo" in "Interpreter.constructor(...)" is expected to be non-null');
            }
        });
        test("Undefined languageRepo throws expected error.", () => {
            try {
                interpreter = new Interpreter(()=>{''}, undefined);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toEqual('Element "languageRepo" in "Interpreter.constructor(...)" is expected to be defined.');
            }
        });
    });

    describe("When using valid inputs.", () => {
        let countryCode = CountryCodes.US;
        let countryCodeSelector = () => countryCode;
        test("Constructs", () => {
            interpreter = new Interpreter(countryCodeSelector, Repo);
        });
        test("Constructs only once.", () => {
            try {
                new Interpreter(countryCodeSelector, Repo);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Error: Interpreter cannot be instantiated twice.');
            }
        });
        let interpreterInstance;
        test("getInstance() returns interpreter.", () => {
            interpreterInstance = Interpreter.getInstance();
            expect(interpreterInstance).toEqual(interpreter);
        });
        test("interpret() returns expected interpretation.", () => {
            expect(interpreterInstance.interpret(keys.INTERPRETER, 'the interpreter', 'language'))
                .toEqual('Interpretation of the interpreter in context of language is return results.');
        });
        test("interpret() returns expected interpretation on recursive decent.", () => {
            expect(interpreterInstance.interpret(
                    keys.INTERPRETER,
                    'last results',
                    'first recursion',
                    keys.INTERPRETER,
                    'second results',
                    'second recursion',
                    keys.INTERPRETER,
                    'first results',
                    'last recursion'))
                .toEqual('Interpretation of last results in context of first recursion is Interpretation of second results in context of second recursion is Interpretation of first results in context of last recursion is return results.');
        });
        test("interpret() returns expected interpretation on recursive decent for CN.", () => {
            countryCode = CountryCodes.CN;
            expect(interpreterInstance.interpret(
                    keys.INTERPRETER,
                    'last results',
                    'first recursion',
                    keys.INTERPRETER,
                    'second results',
                    'second recursion',
                    keys.INTERPRETER,
                    'first results',
                    'last recursion'))
                .toEqual('last results的解释在此背景下first recursion是second results的解释在此背景下second recursion是first results的解释在此背景下last recursion是返回结果。');
        });
    });
});