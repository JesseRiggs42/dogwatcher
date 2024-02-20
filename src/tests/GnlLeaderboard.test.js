import {
    generateValidTeamsList,
    generateValidMetadata,
    generateMetadata,
    generateValidDates
} from "./stubs/GnlBoardStubs";
import GnlLeaderBoard from "../models/GnlLeaderBoard";
import Team from "../models/Team";

describe("GnlLeaderBoard behaves as expected", () => {

    const teamName = "teamName";
    const teamNumber = 1234;

    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    describe("With valid inputs", () => {
        describe('New GnlLeaderBoard populates and returns expected data for', () => {
            let metadata = generateValidMetadata(10);
            let teamsList = generateValidTeamsList(10, 10, 100);
            let gnlLeaderBoard;
            test('constructor()',   () => {gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);})
            test('getTitle()',      () => {expect(gnlLeaderBoard.getTitle()).toEqual('title');});
            test('getDates()',      () => {expect(gnlLeaderBoard.getDates()).toEqual(generateValidDates(10));});
            test('getDateline()',   () => {expect(gnlLeaderBoard.getDateline()).toEqual('dateline')});
            test('getTeamByName()', () => {expect(gnlLeaderBoard.getTeamByName('Team9').getTeamName()).toEqual('Team9');});

            test('getTeamByName() returns null when not found', () => {expect(gnlLeaderBoard.getTeamByName('Team10')).toBeNull();});

            test('getAllTeamNames()', () => {
                let teamNames = [];
                teamsList.forEach(team => {
                    teamNames.push(team.getTeamName());
                });
                expect(gnlLeaderBoard.getAllTeamNames()).toEqual(teamNames);
            });

            test('getScoresTotal()',            () => {expect(gnlLeaderBoard.getScoresTotal()).toEqual(10000);});
            test('getGamesAverage()',           () => {expect(gnlLeaderBoard.getGamesAverage()).toEqual(100);});
            test('getGamesStandardDeviation()', () => {expect(gnlLeaderBoard.getGamesStandardDeviation()).toEqual(0);});
            test('getGameNightsCount()',        () => {expect(gnlLeaderBoard.getGameNightsCount()).toEqual(10);});
            test('getGamesPlayed()',            () => {expect(gnlLeaderBoard.getGamesPlayed()).toEqual(100);});

            describe('cloneMetadata()', () => {
                let clonedMetadata;
                test('clones without error', () => {clonedMetadata = gnlLeaderBoard.cloneMetadata();});
                test('getTitle()',      () => {expect(gnlLeaderBoard.getTitle()).toEqual(clonedMetadata.getTitle());});
                test('getDates()',      () => {expect(gnlLeaderBoard.getDates()).toEqual(clonedMetadata.getDates());});
                test('getDateline()',   () => {expect(gnlLeaderBoard.getDateline()).toEqual(clonedMetadata.getDateline())});

                test('clone is deep', () => {
                    gnlLeaderBoard.metadata.title = '';
                    gnlLeaderBoard.metadata.dateline = '';
                    gnlLeaderBoard.metadata.dates = [];

                    expect(gnlLeaderBoard.getTitle()).not.toEqual(clonedMetadata.getTitle());
                    expect(gnlLeaderBoard.getDateline()).not.toEqual(clonedMetadata.getDateline());
                    expect(gnlLeaderBoard.getDates()).not.toEqual(clonedMetadata.getDates());
                });
            });

            describe('cloneTeamsList()', () => {

                let clonedTeamsList;
                test('clones without error', () => {clonedTeamsList = gnlLeaderBoard.cloneTeamsList();});

                test('is identical', () =>
                {
                    clonedTeamsList.forEach(clonedTeam => {

                        let team = gnlLeaderBoard.getTeamByName(clonedTeam.getTeamName());

                        expect(clonedTeam.getTeamNumber())
                        .toEqual(team.getTeamNumber());
                        
                        expect(clonedTeam.getScores())
                        .toEqual(team.getScores());
                    });
                });

                test('is deep', () =>
                {
                    let clonedTeam = clonedTeamsList[0];
                    let team = gnlLeaderBoard.getTeamByName(clonedTeam.getTeamName());

                    expect(clonedTeam.getTeamNumber())
                    .toEqual(team.getTeamNumber());

                    expect(clonedTeam.getScores())
                    .toEqual(team.getScores());
                });
            });

        });

        describe('New GnlLeaderBoard populates with valid empty sets.', () => {
            let metadata = generateValidMetadata(0);
            let teamsList = generateValidTeamsList(0, 0, 0);
            let gnlLeaderBoard;
            test('constructor()', () => {gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);});

            test('getTitle()',                  () => {expect(gnlLeaderBoard.getTitle()).toEqual('title');});
            test('getDates()',                  () => {expect(gnlLeaderBoard.getDates()).toEqual([]);});
            test('getDateline()',               () => {expect(gnlLeaderBoard.getDateline()).toEqual('dateline')});
            test('getTeamByName()',             () => {expect(gnlLeaderBoard.getTeamByName('Team0')).toBeNull();});
            test('getAllTeamNames()',           () => {expect(gnlLeaderBoard.getAllTeamNames()).toEqual([]);});
            test('getScoresTotal()',            () => {expect(gnlLeaderBoard.getScoresTotal()).toEqual(0);});
            test('getGamesAverage()',           () => {expect(gnlLeaderBoard.getGamesAverage()).toEqual(0);});
            test('getGamesStandardDeviation()', () => {expect(gnlLeaderBoard.getGamesStandardDeviation()).toEqual(0);});
            test('getGameNightsCount()',        () => {expect(gnlLeaderBoard.getGameNightsCount()).toEqual(0);});
            test('getGamesPlayed()',            () => {expect(gnlLeaderBoard.getGamesPlayed()).toEqual(0);});

        });


        describe('__create_team() returns valid team.', () => {
            let metadata = generateValidMetadata(0);
            let teamsList = generateValidTeamsList(0, 0, 0);
            let gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);

            let teamName = 'teamName';
            let teamNumber = 1234;
            let team = gnlLeaderBoard.__create_team(teamName, teamNumber, []);
            team.isValidTeam();
            test('getTeamName()', () => {expect(team.getTeamName()).toEqual(teamName);});
            test('getTeamNumber()', () => {expect(team.getTeamNumber()).toEqual(teamNumber);});
            test('getScores()', () => {expect(team.getScores()).toEqual([]);});
        });

        it('__map_teamsList() maps valid teamsList to teamsMap.', () => {
            let metadata = generateValidMetadata(0);
            let teamsList = generateValidTeamsList(0, 0, 0);
            let gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);

            teamsList = generateValidTeamsList(3, 3, 3);
            let teamsMap = gnlLeaderBoard.__map_teamsList(teamsList);
            
            let teamsListCopy = [];
            Object.keys(teamsMap).forEach(team => {
                teamsListCopy.push(teamsMap[team]);
            });

            // TODO: This fails on implimentation of uuids. Should experiment with overriding
            // with expect.extends. https://jestjs.io/docs/expect#expectextendmatchers.
            expect(teamsList).toEqual(teamsListCopy);
        });

        it('__validate_teamsList() validates teams list.', () => {
            GnlLeaderBoard.__validate_teamsList(generateValidTeamsList(100, 100, 1));
        });
    });


    describe("Handles invalid input", () => {
        describe("Constructor throws expected error on", () => {
            it('invalid team name.', () => {
                let metadata = generateMetadata(42, 'dateline', 0);
                let teamsList = generateValidTeamsList(0, 0, 0);
                try{
                    new GnlLeaderBoard(metadata, teamsList);
                    expect(null).toEqual('This should never happen.');
                } catch (error) {
                    expect(error.message).toEqual('Table title must be string.');
                }
            });

            it('invalid team type.', () => {
                let metadata = generateMetadata('title', 'dateline', 0);
                let teamsList = ['squirrel'];
                try{
                    new GnlLeaderBoard(metadata, teamsList);
                    expect(null).toEqual('This should never happen.');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: All teams must impliment "isValidTeam".');
                }
            });

            it('null team.', () => {
                let metadata = generateMetadata('title', 'dateline', 0);
                let teamsList = [null];
                try{
                    new GnlLeaderBoard(metadata, teamsList);
                    expect(null).toEqual('This should never happen.');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: All teams in teams list must not be null.');
                }
            });

            it('non-array teamsList.', () => {
                let metadata = generateMetadata('title', 'dateline', 0);
                let teamsList = 'monkey';
                try{
                    new GnlLeaderBoard(metadata, teamsList);
                    expect(null).toEqual('This should never happen.');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: Teams list must be array.');
                }
            });

            it('null teamsList.', () => {
                let metadata = generateMetadata('title', 'dateline', 0);
                let teamsList = null;
                try{
                    new GnlLeaderBoard(metadata, teamsList);
                    expect(null).toEqual('This should never happen.');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: Teams list cannot be null.');
                }
            });

            it('invalid team score.', () => {
                let metadata = generateMetadata('title', 'dateline', 0);
                let teamsList = [new Team('teamName', '1234', ['squirrel'])]
                try{
                    new GnlLeaderBoard(metadata, teamsList);
                    expect(null).toEqual('This should never happen.');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: score "squirrel" for team teamName must be an integer.');
                }
            });
        });
        describe('__validate_teamsList() throws expected errors on', () => {
            let metadata = generateValidMetadata(0);
            let teamsList = generateValidTeamsList(0, 0, 0);
            let gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);

            let teamName = 'Team0';
            let teamNumber = 1234;
            let team;

            let teamCannotBeNull = 'All teams in teams list must not be null.';
            test(teamCannotBeNull, () => {
                try {
                    team = gnlLeaderBoard.__create_team(teamName, teamNumber, []);
                    GnlLeaderBoard.__validate_teamsList([team, null]);
                    expect(false).toEqual('This should never happen');
                } catch(error) {
                    expect(error.message).toEqual(teamCannotBeNull);
                }    
            });

            let invalidScore = 'monkey';
            let scoreMustBeInteger = `score "${invalidScore}" for team ${teamName} must be an integer.`;
            test(scoreMustBeInteger, () => {
                try {
                    team = gnlLeaderBoard.__create_team(teamName, teamNumber, [ 1, invalidScore, 2]);
                    GnlLeaderBoard.__validate_teamsList([team]);
                    expect(false).toEqual('This should never happen');
                } catch(error) {
                    expect(error.message).toEqual(scoreMustBeInteger);
                }
            });

            let TeamsListCannotBeNull = `Teams list cannot be null.`;
            test(TeamsListCannotBeNull, () => {
                try {
                    GnlLeaderBoard.__validate_teamsList(null);
                    expect(false).toEqual('This should never happen');
                } catch(error) {
                    expect(error.message).toEqual(TeamsListCannotBeNull);
                }
            });


            let teamsListMustBeArray = `Teams list must be array.`;
            test(teamsListMustBeArray, () => {
                try {
                    GnlLeaderBoard.__validate_teamsList('');
                    expect(false).toEqual('This should never happen');
                } catch(error) {
                    expect(error.message).toEqual(teamsListMustBeArray);
                }
            });

            let implimentsIsValidTeam = `All teams must impliment "isValidTeam".`;
            test(implimentsIsValidTeam, () => {
                try {
                    GnlLeaderBoard.__validate_teamsList([{"teamName":"Team0","teamNumber":0,"scores":[]}]);
                    expect(false).toEqual('This should never happen');
                } catch(error) {
                    expect(error.message).toEqual(implimentsIsValidTeam);
                }
            });
        });

        describe('__map_teamsList() throws expected errors on', () => {
            let metadata = generateValidMetadata(0);
            let teamsList = generateValidTeamsList(0, 0, 0);
            let gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);

            test('null teamsList', () => {
                try {
                    gnlLeaderBoard.__map_teamsList(null);
                    expect(false).toEqual('This should never happen');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: Teams list cannot be null.');
                }
            });

            test('team does not implement "isValidTeam"', () => {
                try {
                    gnlLeaderBoard.__map_teamsList([{}]);
                    expect(false).toEqual('This should never happen');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: All teams must impliment "isValidTeam".');
                }
            });

            test('team is null', () => {
                try {
                    gnlLeaderBoard.__map_teamsList([null]);
                    expect(false).toEqual('This should never happen');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: All teams in teams list must not be null.');
                }
            });

            test('invalid score', () => {
                try {
                    gnlLeaderBoard.__map_teamsList([new Team(teamName, teamNumber, ['squirrel'])]);
                    expect(false).toEqual('This should never happen');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: score "squirrel" for team teamName must be an integer.');
                }
            });

            test('invalid teamName', () => {
                try {
                    gnlLeaderBoard.__map_teamsList([new Team(42, teamNumber, [])]);
                    expect(false).toEqual('This should never happen');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: teamName 42 must be of type string, but is of type number.');
                }
            });

            test('invalid teamNumber', () => {
                try {
                    gnlLeaderBoard.__map_teamsList([new Team(teamName, [], [])]);
                    expect(false).toEqual('This should never happen');
                } catch (error) {
                    expect(error.message).toEqual('Could not validate teams list: teamNumber "" for team "teamName" must be an integer.');
                }
            });
        });
    });

});