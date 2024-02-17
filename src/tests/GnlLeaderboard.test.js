import {
    generateValidTeamsList,
    generateValidMetadata,
    generateMetadata,
    generateValidDates
} from "./stubs/GnlBoardStubs";
import GnlLeaderBoard from "../models/GnlLeaderBoard";
import TableMetadata from "../models/TableMetadata";
import Team from "../models/Team";

describe("GnlLeaderBoard builds and getters behave as expected.", () => {

    const teamName = "teamName";
    const teamNumber = 1234;

    it('constructs and returns expected values when using valid parameters.', () => {
        let metadata = generateValidMetadata(10);
        let teamsList = generateValidTeamsList(10, 10, 100);
        let gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);


        expect(gnlLeaderBoard.getTitle()).toEqual('title');
        expect(gnlLeaderBoard.getDates()).toEqual(generateValidDates(10));
        expect(gnlLeaderBoard.getDateline()).toEqual('dateline')

        expect(gnlLeaderBoard.getTeamByName('Team9').getTeamName()).toEqual('Team9');
        expect(gnlLeaderBoard.getTeamByName('Team10')).toBeNull();

        let teamNames = [];
        teamsList.forEach(team => {
            teamNames.push(team.getTeamName());
        });
        expect(gnlLeaderBoard.getAllTeamNames()).toEqual(teamNames);

        expect(gnlLeaderBoard.getScoresTotal()).toEqual(10000);
        expect(gnlLeaderBoard.getGamesAverage()).toEqual(100);
        expect(gnlLeaderBoard.getGamesStandardDeviation()).toEqual(0);
        expect(gnlLeaderBoard.getGameNightsCount()).toEqual(10);
        expect(gnlLeaderBoard.getGamesPlayed()).toEqual(100);

    });

    it('constructs and returns expected values when using empty games.', () => {
        let metadata = generateValidMetadata(0);
        let teamsList = generateValidTeamsList(0, 0, 0);
        let gnlLeaderBoard = new GnlLeaderBoard(metadata, teamsList);


        expect(gnlLeaderBoard.getTitle()).toEqual('title');
        expect(gnlLeaderBoard.getDates()).toEqual([]);
        expect(gnlLeaderBoard.getDateline()).toEqual('dateline')
        expect(gnlLeaderBoard.getTeamByName('Team0')).toBeNull();
        expect(gnlLeaderBoard.getAllTeamNames()).toEqual([]);
        expect(gnlLeaderBoard.getScoresTotal()).toEqual(0);
        expect(gnlLeaderBoard.getGamesAverage()).toEqual(0);
        expect(gnlLeaderBoard.getGamesStandardDeviation()).toEqual(0);
        expect(gnlLeaderBoard.getGameNightsCount()).toEqual(0);
        expect(gnlLeaderBoard.getGamesPlayed()).toEqual(0);

    });

    it('throws exception when constructed with invalid team name.', () => {
        let metadata = generateMetadata(42, 'dateline', 0);
        let teamsList = generateValidTeamsList(0, 0, 0);
        try{
            new GnlLeaderBoard(metadata, teamsList);
            expect(null).toEqual('This should never happen.');
        } catch (error) {
            expect(error.message).toEqual('Table title must be string.');
        }
    });

    it('throws exception when constructed with string as team.', () => {
        let metadata = generateMetadata('title', 'dateline', 0);
        let teamsList = ['squirrel']
        try{
            new GnlLeaderBoard(metadata, teamsList);
            expect(null).toEqual('This should never happen.');
        } catch (error) {
            expect(error.message).toEqual('Could not validate teams map: All teams must impliment "isValidTeam".');
        }
    });

    it('throws exception when constructed with invalid team.', () => {
        let metadata = generateMetadata('title', 'dateline', 0);
        let teamsList = [new Team('teamName', '1234', ['squirrel'])]
        try{
            new GnlLeaderBoard(metadata, teamsList);
            expect(null).toEqual('This should never happen.');
        } catch (error) {
            expect(error.message).toEqual('Could not validate teams map: score "squirrel" for team teamName must be an integer.');
        }
    });

});