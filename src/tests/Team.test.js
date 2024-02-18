import Team from '../models/Team';

describe("Team constructs and behaves as expected", () => {

    const teamName = "teamName";
    const teamNumber = 1234;

    describe('with vaid parameters and numeric teamScores', () => {
        let teamScores = [1,2,3,4];
        let team;

        test('constructor returns new Team without error', () => {
            team = new Team(
              teamName,
              teamNumber,
              teamScores
            );
        });

        test('isValid() returns without error.', () => {
            expect(team.isValidTeam());});

        test('getTeamName() returns expected teamName.', () => {
            expect(team.getTeamName())
            .toEqual(teamName);});

        test('getTeamNumber() returns expected teamNumber.', () => {
            expect(team.getTeamNumber())
            .toEqual(teamNumber);});

        test('getScores() returs expected scores.', () => {
            expect(team.getScores())
            .toEqual(teamScores);});

        test('getScoreTotal() returns expected total.', () => {
            expect(team.getScoreTotal())
            .toEqual(10);});

        test('getScoreAverage() returns expected average.', () => {
            expect(team.getScoreAverage())
            .toEqual(2.5);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(team.getGamesPlayed())
            .toEqual(4);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(team.getScoreStd())
            .toEqual(1.118033988749895);});

    });

    describe('with vaid parameters and empty scores', () => {
        let testScores = [];
        let team;

        it('constructs without error.', () => {
            team = new Team(
                teamName,
                teamNumber,
                testScores
            );
        });

        it('isValidTeam() returns without error.', () => {
            expect(team.isValidTeam());});
      
        it('getScores() returns empty array.', () => {
            expect(team.getScores())
            .toEqual([]);});

        it('getScoreTotal() returns 0.', () => {  
            expect(team.getScoreTotal())
            .toEqual(0);});

        it('getScoreAverage() returns 0.', () => {
            expect(team.getScoreAverage())
            .toEqual(0);});

        it('getGamesPlayed() returns 0.', () => {
            expect(team.getGamesPlayed())
            .toEqual(0);});

        test('getScoreStd() returns expected value.', () => {
            expect(team.getScoreStd())
            .toEqual(0);});
    });


    describe('with invalid parameters', () => {

        it('isValidTeam() throws expected error when teamName is invalid.', () => {
            let team = new Team("",null,null);
            try{
                team.isValidTeam();
                expect(null).toEqual('this should never happen.');
            } catch(error) {
                expect(error.message).toEqual('teamName must be declared and non-empty.');
            }
        });

        it('isValidTeam() throws expected error when teamNumber is invalid.', () => {
            let squirrel = 'squirrel';
            let team = new Team(teamName,squirrel,null);
            try{
                team.isValidTeam();
                expect(null).toEqual('this should never happen.');
            } catch(error) {
                expect(error.message).toEqual(`teamNumber "${squirrel}" for team "${teamName}" must be an integer.`);
            }
        });

        it('isValidTeam() throws expected error when scores is invalid array.', () => {
            let turtle = 'turtle'
            let team = new Team(teamName,teamNumber,turtle);
            try{
                team.isValidTeam();
                expect(null).toEqual('this should never happen.');
            } catch(error) {
                expect(error.message).toEqual(`scores for team "${teamName}" must be an array.`);
            }
        });

        it('isValidTeam() throws expected error when scores element is not a number.', () => {
            let button = 'button';
            let team = new Team(teamName,teamNumber,[1,2,3,button]);
            try{
                team.isValidTeam();
                expect(null).toEqual('this should never happen.');
            } catch(error) {
                expect(error.message).toEqual(`score "${button}" for team ${teamName} must be an integer.`);
            }
        });
    });

});