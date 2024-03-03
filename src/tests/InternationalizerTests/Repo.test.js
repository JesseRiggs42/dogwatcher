import { CountryCodes } from '../../constants/lang/CountryCodes';
import Repo from '../../internationalizer/repo/Repo';
import { keys } from '../../constants/LangKeys'

describe("Repo behaves as expected", () => {
    describe("When using valid inputs", () => {
        let repo;
        let langFun;
        test("Repo(CountryCode) returns function.", () => {
            repo = (Repo)(CountryCodes.US);
            expect(typeof(repo)).toBe('function');
        });
        test("Country specific repo(keyCode) returns interpreter function from country repo.", () => {
            langFun = (repo)(keys.INTERPRETER);
            expect(typeof(langFun)).toBe('function');
        });
        test("US interpreter function returns expected language interpretation.", () => {
            expect(langFun('the interpreter','language', (rest) => rest, ['interpretation.']))
            .toBe('Interpretation of the interpreter in context of language is interpretation.');
        });
    });

    describe("When using invalid inputs", () => {
        let repo;
        let langFun;
        test("Invalid CountryCode throws expected error.", () => {
            let invalidCountryCode = 'MYPOS';
            try{
                (Repo)(invalidCountryCode);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toEqual(`Error, country code does not exist: ${invalidCountryCode}.`);
            }
        });
    });
});