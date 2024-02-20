import {
    generateValidTeamsListWithScores,
    generateValidMetadata
} from "./stubs/GnlBoardStubs";
import BoardForecast6Game from "../models/BoardForecast6Game";

const MAX_EXTRA_GAMES = 6;

describe("BoardForecast6Game constructs and behaves as expected", () => {

    let metadata = generateValidMetadata(MAX_EXTRA_GAMES);
    let teamsList = generateValidTeamsListWithScores(16, [0,8]);

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    describe("With valid parameters", () => {

        let boardForecast = new BoardForecast6Game(metadata, teamsList);

        test("getExtraGameOptions() describes all extra game options for forecast.", () => {
            expect(boardForecast.getExtraGameOptions()).toEqual([0,1,2,3,4,5,6]);});

        test("Stats express extra game added.", () => {
            expect(boardForecast.getGamesPlayed()).toEqual(64);
            expect(boardForecast.getScoresTotal()).toEqual(256);
            expect(boardForecast.getGamesAverage()).toEqual(4);
            expect(boardForecast.getGamesStandardDeviation()).toEqual(2.8284271247461903);
        });

        test("addGamesByName() for zero value resets stats", () => {
            let teamName = boardForecast.getAllTeamNames()[0]
            boardForecast.addGamesByName(0, teamName);
            expect(boardForecast.getGamesPlayed()).toEqual(62);
        });
        
    });

    describe("Handles invalid data as expected.", () => {

        let boardForecast = new BoardForecast6Game(metadata, teamsList);

        test("addGamesByName() throws expected error when game count is out of range.", () => {
            let teamName = boardForecast.getAllTeamNames()[0]
            try{
                boardForecast.addGamesByName(20, teamName);
                expect(false).toEqual("This should never happen.");
            } catch (error) {
                expect(error.message).toEqual("addGamesByName(): 20 exceeds the maximum number of extra games 6.");
            }
        });

        describe("Cannot implement forbidden functions", () => {
            test("cloneMetadata must not be implemented from children", () => {
                try {
                    boardForecast.cloneMetadata();
                    expect(false).toEqual("This should never happen");
                } catch(error) {
                    expect(error.message).toEqual('cloneMetadata cannot be implemented from children.');
                }
            });

            test("cloneTeamsList must not be implemented from children", () => {
                try {
                    boardForecast.cloneTeamsList();
                    expect(false).toEqual("This should never happen");
                } catch(error) {
                    expect(error.message).toEqual('cloneTeamsList cannot be implemented from children.');
                }
            });
        });
    });
});