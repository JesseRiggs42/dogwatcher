import {
    generateValidTeamsList,
    generateValidMetadata
} from "./stubs/GnlBoardStubs";
import BoardForecast from "../models/BoardForecast";
import Team from "../models/Team";
import TeamForecast from "../models/TeamForecast";

const maxExtraGames = 1;
const teamName = 'Team0';
const teamNumber = 1234;

describe("BoardForecast constructs and behaves as expected", () => {

    describe("With valid parameters", () => {
        let metadata = generateValidMetadata(10);
        let teamsList = generateValidTeamsList(10, 10, 100);
        let boardForecast;

        test("BoardForecast constructor returns new BoardForecast.", () => {
            boardForecast = new BoardForecast(metadata, teamsList);});

        test("getExtraGameOptions returns array of numeric options.", () => {
            let extraGameOptions = boardForecast.getExtraGameOptions();
            for(let i = 0; i <= maxExtraGames; i++) {
                expect(extraGameOptions[i]).toEqual(i);
            }
        });

        test("getTitle() returns forecast title.", ()=> {
            expect(boardForecast.getTitle()).toEqual(metadata.getTitle() + ` ${maxExtraGames} Game Forecast`);
        });
    
        describe("__create_team() creates TeamForecast", () => {

            boardForecast = new BoardForecast(metadata, teamsList);
            let team = boardForecast.__create_team(teamName, teamNumber, []);

            test("team is valid", () => {
                team.isValidTeam();});

            test("team is of type TeamForecast", () => {
                expect(team.constructor.name).toEqual('TeamForecast');});

        });

        describe("expected stats are populated and returned from", () => {

            test("getScoresTotal()", () => {
                expect(boardForecast.getScoresTotal())
                .toEqual(10000);});

            test("getGamesAverage()", () => {
                    expect(boardForecast.getGamesAverage())
                    .toEqual(100);});

            test("getGamesStandardDeviation()", () => {
                expect(boardForecast.getGamesStandardDeviation())
                .toEqual(0);});

            test("getGamesPlayed()", () => {
                expect(boardForecast.getGamesPlayed())
                .toEqual(100);});
        });

        test("addGamesByName() succeeds", () => {
            teamsList.forEach(team => {
                let name = team.getTeamName()
                name.charCodeAt(name.length - 1) % 2
                    ? boardForecast.addGamesByName(1, name)
                    : false;
            });
        });

        describe("After addGamesByName()", () => {

            let metadata = generateValidMetadata();
            let teamsList = [new TeamForecast(teamName, 1, [1,2,3])];

            describe("Stats adjust and returned from", () => {
                let boardForecast = new BoardForecast(metadata, teamsList);
                boardForecast.addGamesByName(1, teamName);

                test("getScoresTotal()", () => {
                    expect(boardForecast.getScoresTotal()).toEqual(8);});

                test("getGamesPlayed()", () => {
                    expect(boardForecast.getGamesPlayed()).toEqual(4);});

                test("getGamesAverage()", () => {
                    expect(boardForecast.getGamesAverage()).toEqual(2);});

                test("getGamesStandardDeviation()", () => {
                    expect(boardForecast.getGamesStandardDeviation()).toEqual(0.7071067811865476);});
            });

            describe("Stats adjust back and return from", () => {
                let boardForecast = new BoardForecast(metadata, teamsList);
                boardForecast.addGamesByName(1, teamName);
                boardForecast.addGamesByName(0, teamName);

                test("getScoresTotal()", () => {
                    expect(boardForecast.getScoresTotal()).toEqual(6);});

                test("getGamesPlayed()", () => {
                    expect(boardForecast.getGamesPlayed()).toEqual(3);});

                test("getGamesAverage()", () => {
                    expect(boardForecast.getGamesAverage()).toEqual(2);});

                test("getGamesStandardDeviation()", () => {
                    expect(boardForecast.getGamesStandardDeviation()).toEqual(0.816496580927726);});

            });

        });
    });

    describe("Hadnles errors as expected", () => {

        let metadata = generateValidMetadata();
        let teamsList = [new TeamForecast('teamName', 1, [1,2])];
        let boardForecast = new BoardForecast(metadata, teamsList);

        beforeEach(() => {
            jest.spyOn(console, 'error').mockImplementation(jest.fn());
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