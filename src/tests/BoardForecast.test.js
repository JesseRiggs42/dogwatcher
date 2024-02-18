import {
    generateValidTeamsList,
    generateValidMetadata
} from "./stubs/GnlBoardStubs";
import BoardForecast from "../models/BoardForecast";
import Team from "../models/Team";

const maxExtraGames = 1;

class testBoardForecast extends BoardForecast {
    constructor(metadata, teamsList) {
        super(metadata, teamsList);
        this.maxExtraGames = maxExtraGames;
    }
}

describe("BoardForecast constructs and behaves as expected", () => {

    describe("with valid parameters", () => {
        let metadata = generateValidMetadata(10);
        let teamsList = generateValidTeamsList(10, 10, 100);
        let boardForecast;

        test("BoardForecast constructor returns new BoardForecast.", () => {
            boardForecast = new testBoardForecast(metadata, teamsList);});

        test("expected stats are populated and returned.", () => {
            expect(boardForecast.getScoresTotal()).toEqual(10000);
            expect(boardForecast.getGamesAverage()).toEqual(100);
            expect(boardForecast.getGamesStandardDeviation()).toEqual(0);
            expect(boardForecast.getGamesPlayed()).toEqual(100);
        });

        test("addGamesByName() succeeds", () => {
            teamsList.forEach(team => {
                let name = team.getTeamName()
                name.charCodeAt(name.length - 1) % 2
                    ? boardForecast.addGamesByName(1, name)
                    : false;
            });
        });

        describe("after addGamesByName()", () => {
            test("getScoresTotal() adjusts to extraGames.", () => {
                expect(boardForecast.getScoresTotal()).toEqual(10500);});

            test("getGamesPlayed() adjusts for extra games.", () => {
                expect(boardForecast.getGamesPlayed()).toEqual(105);});
        });

        describe("BoardForecast hadnles errors as expected", () => {

            test("addGamesByName() throws expected Error when gameCount exceeds maxExtraGames.", () => {
                let gameCount = maxExtraGames + 1;
                let teamName = boardForecast.getAllTeamNames()[0];
                let team = boardForecast.teamsMap[teamName];
                let teamOrigScoreTotal = team.getScoreTotal();
                try {
                    boardForecast.addGamesByName(gameCount, teamName);
                    expect(false).toEqual("This should never happen.");
                } catch(error) {
                    expect(error.message).toEqual(`addGamesByName(): ${gameCount} exceeds the maximum number of extra games ${maxExtraGames}.`);
                }
                // Also check that nothing updates. Set scoreTotal to null for recount.
                team.scoreTotal = null;
                expect(team.getScoreTotal()).toEqual(teamOrigScoreTotal);
            });

            test("addGamesByName() throws expected Error when team not found.", () => {
                let teamName = 'badTeamName';
                try {
                    boardForecast.addGamesByName(maxExtraGames, teamName);
                    expect(false).toEqual("This should never happen.");
                } catch(error) {
                    expect(error.message).toEqual(`addGamesByName(): team not found "${teamName}".`);
                }
            });

            test("addGamesByName() throws expected Error when team does not implement isValidTeam().", () => {
                let teamName = 'TeamExtra';
                let teamNumber = 1000000;
                let newTeam = new Team(teamName, teamNumber,[]);
                boardForecast.teamsMap[teamName] = newTeam;

                try {
                    boardForecast.addGamesByName(maxExtraGames, teamName);
                    expect(false).toEqual("This should never happen.");
                } catch(error) {
                    expect(error.message).toEqual(`addGamesByName(): team "${teamName}" does not implement addGamesToForecast. addGamesToForecast is ${typeof(newTeam.addGamesToForecast)}.".`);
                }
            });
        });
    });

});