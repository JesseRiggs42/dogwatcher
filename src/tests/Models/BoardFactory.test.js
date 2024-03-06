import BoardFactory from "../../models/BoardFactory";
import { generateParsedHtmlStub, generateValidTeamsListWithScores } from '../stubs/GnlBoardStubs';
import {
    BOARD_CLASS_1_GAME_FORECAST,
    BOARD_CLASS_6_GAME_FORECAST,
    BOARD_CLASS_BASE
} from '../../constants/Constants';

describe("BoardFactory behaves as expected.", () => {
    let boardFactory;
    const validDates     = ['mm/dd','mm/dd'];
    const validDateline  = '2000-2000';
    const validHtmlKey   = 'Board10';
    const validTeamsList = generateValidTeamsListWithScores(1, [1]);
    const baseTitle      = 'Base Title'
    const forecast1Title = 'Forecast 1 Title'
    const forecast6Title = 'Forecast 6 Title'

    describe("with valid parameters", () => {

        test("Constructs as expected.", () => {
            boardFactory = new BoardFactory();
        });

        test("Constructs only once.", () => {
            try {
                new BoardFactory();
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Error: "BoardFactory" cannot be instantiated twice.');
            }
        });

        let boardBase;
        test("Creates new GnlLeaderBoard.", () => {
            let parsedHtmlStub =
                generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    baseTitle);
            boardBase = boardFactory.create(parsedHtmlStub, BOARD_CLASS_BASE);

            expect(boardBase.constructor.name).toEqual('GnlLeaderBoard');
            expect(boardBase.getTitle()).toEqual(baseTitle);
            expect(boardBase.getDates()).toEqual(validDates);
            expect(boardBase.getDateline()).toEqual(validDateline);
            expect(boardBase.cloneTeamsList()).toEqual(validTeamsList);
        });

        test("Creates new BoardForecast1Game.", () => {
            let parsedHtmlStub =
                generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    [],
                    forecast1Title);
            let boardF1 = boardFactory.create(parsedHtmlStub, BOARD_CLASS_1_GAME_FORECAST);

            expect(boardF1.constructor.name).toEqual('BoardForecast1Game');
            expect(boardF1.getTitle()).toMatch(forecast1Title);
            expect(boardF1.getDates()).toEqual(validDates);
            expect(boardF1.getDateline()).toEqual(validDateline);
        });
    
        test("Creates new BoardForecast6Game.", () => {
            let parsedHtmlStub =
                generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    forecast6Title);
            let boardF6 = boardFactory.create(parsedHtmlStub, BOARD_CLASS_6_GAME_FORECAST);

            expect(boardF6.constructor.name).toEqual('BoardForecast6Game');
            expect(boardF6.getTitle()).toMatch(forecast6Title);
            expect(boardF6.getDates()).toEqual(validDates);
            expect(boardF6.getDateline()).toEqual(validDateline);
        });

        test("create() returns cached GnlLeaderBoard with key.", () => {
            let parsedHtmlStub =
                generateParsedHtmlStub (
                    [],
                    '',
                    validHtmlKey,
                    [],
                    '');
            let boardCached = boardFactory.create(parsedHtmlStub, BOARD_CLASS_BASE);

            expect(boardCached).toEqual(boardBase);
        });
    });

    describe("with invalid parameters", () => {
        // const validDates     = ['mm/dd','mm/dd'];
        // const validDateline  = '2000-2000';
        const validHtmlKey   = 'Board13';
        // const validTeamsList = generateValidTeamsListWithScores(1, [1]);
        // const baseTitle      = 'Base Title'
        // const forecast1Title = 'Forecast 1 Title'
        // const forecast6Title = 'Forecast 6 Title'
    
        test("create() throws error on null and undefined boardClassKey.", () => {
            try {
                let parsedHtmlStub = generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    baseTitle);
                boardFactory.create(parsedHtmlStub, undefined);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Element "BoardClassKey" in "BoardFactory.create(...)" is expected to be defined.');
            }
        });
        test("create() throws error on null parsedHtmlBoard.", () => {
            try {
                let boardCached = boardFactory.create(null, BOARD_CLASS_BASE);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Element "ParsedBoard" in "BoardFactory.create(...)" is expected to be non-null');
            }
        });

        test("create() throws error on undefined parsedHtmlBoard.", () => {
            try {
                let boardCached = boardFactory.create(undefined, BOARD_CLASS_BASE);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Element "ParsedBoard" in "BoardFactory.create(...)" is expected to be defined.');
            }
        });

        test("create() throws error when parsedHtmlBoard.getKey is undefined.", () => {
            try {
                let parsedHtmlStub = generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    baseTitle);
                parsedHtmlStub.getKey = undefined;
                boardBase = boardFactory.create(parsedHtmlStub, BOARD_CLASS_BASE);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Element "ParsedHtmlBoard.getKey()" in "BoardFactory.create(...)" is expected to be defined.');
            }
        });

        test("create() throws error when parsedHtmlBoard.getKey is undefined.", () => {
            try {
                let parsedHtmlStub = generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    baseTitle);
                parsedHtmlStub.getKey = undefined;
                boardBase = boardFactory.create(parsedHtmlStub, BOARD_CLASS_BASE);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Element "ParsedHtmlBoard.getKey()" in "BoardFactory.create(...)" is expected to be defined.');
            }
        });

        test("create() throws error when parsedHtmlBoard.getKey is null.", () => {
            try {
                let parsedHtmlStub = generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    baseTitle);
                parsedHtmlStub.getKey = null;
                boardBase = boardFactory.create(parsedHtmlStub, BOARD_CLASS_BASE);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('Element "ParsedHtmlBoard.getKey()" in "BoardFactory.create(...)" is expected to be non-null');
            }
        });

        test("create() throws error when parsedHtmlBoard.getKey is object.", () => {
            try {
                let parsedHtmlStub = generateParsedHtmlStub (
                    validDates,
                    validDateline,
                    validHtmlKey,
                    validTeamsList,
                    baseTitle);
                parsedHtmlStub.getKey = {};
                boardBase = boardFactory.create(parsedHtmlStub, BOARD_CLASS_BASE);
                expect('didn\'t').toEqual('to throw error');
            } catch(error) {
                expect(error.message).toBe('"ParsedHtmlBoard.getKey()" is expected to be of type "function" but is "object".');
            }
        });

    });

});
