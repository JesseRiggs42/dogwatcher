import {
    generateValidTeamsListWithScores,
    generateValidMetadata
} from "../stubs/GnlBoardStubs";
import BoardForecast1Game from "../../models/BoardForecast1Game";

const maxExtraGames = 1;

describe("BoardForecast1Game constructs and behaves as expected", () => {

    let metadata = generateValidMetadata();
    let teamsList = generateValidTeamsListWithScores(100, [0,1,2]);

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    describe("With valid parameters", () => {

        let boardForecast = new BoardForecast1Game(metadata, teamsList);

        test("getExtraGameOptions() describes all extra game options for forecast.", () => {
            expect(boardForecast.getExtraGameOptions()).toEqual([0,1]);});

        test("Stats express extra game added.", () => {
            expect(boardForecast.getGamesPlayed()).toEqual(400);
            expect(boardForecast.getScoresTotal()).toEqual(400);
            expect(boardForecast.getGamesAverage()).toEqual(1);
            expect(boardForecast.getGamesStandardDeviation()).toEqual(0.7071067811865476);
        });

        test("addGamesByName() for zero value resets stats", () => {
            let teamName = boardForecast.getAllTeamNames()[0]
            boardForecast.addGamesByName(0, teamName);
            expect(boardForecast.getGamesPlayed()).toEqual(399);
        });       
    });

    describe("Handles invalid data as expected.", () => {

        let boardForecast = new BoardForecast1Game(metadata, teamsList);

        test("addGamesByName() throws expected error when game count is out of range.", () => {
            let teamName = boardForecast.getAllTeamNames()[0]
            try{
                boardForecast.addGamesByName(20, teamName);
                expect(false).toEqual("This should never happen.");
            } catch (error) {
                expect(error.message).toEqual("addGamesByName(): 20 exceeds the maximum number of extra games 1.");
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