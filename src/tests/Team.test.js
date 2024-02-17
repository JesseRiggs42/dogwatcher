import Team from '../models/Team';

describe("Team builds and its getters return expected values.", () => {

    const teamName = "teamName";
    const teamNumber = 1234;

    it('constructs and returns exptected values when score entries exist.', () => {
        let testScores = [1,2,3,4];
        let team = new Team(
            teamName,
            teamNumber,
            testScores
        );
        expect(team.isValidTeam());
        expect(team.getTeamName()).toEqual(teamName);
        expect(team.getTeamNumber()).toEqual(teamNumber);
        expect(team.getScores()).toEqual(testScores);
        expect(team.getScoreTotal()).toEqual(10);
        expect(team.getScoreAverage()).toEqual(2.5);
        expect(team.getGamesPlayed()).toEqual(4);
      });

      it('returns expected values when score entries are absent.', () => {
        let testScores = [];
        let team = new Team(
            teamName,
            teamNumber,
            testScores
        );
        expect(team.getScores()).toEqual(testScores);
        expect(team.getScoreTotal()).toEqual(0);
        expect(team.getScoreAverage()).toEqual(0);
        expect(team.getGamesPlayed()).toEqual(0);
        expect(team.isValidTeam());
      });

      it('throws exception when validating invalid teamName.', () => {
        let team = new Team("",null,null);
        try{
          team.isValidTeam();
        } catch(error) {
          expect(error.message).toEqual('teamName must be declared and non-empty.');
          return;
        }
        expect(null).toEqual('this should never happen.');
      });

      it('throws exception when validating invalid teamNumber.', () => {
        let squirrel = 'squirrel';
        let team = new Team(teamName,squirrel,null);
        try{
          team.isValidTeam();
        } catch(error) {
          expect(error.message).toEqual(`teamNumber "${squirrel}" for team "${teamName}" must be an integer.`);
          return;
        }
        expect(null).toEqual('this should never happen.');
      });

      it('throws exception when validating invalid scores array.', () => {
        let turtle = 'turtle'
        let team = new Team(teamName,teamNumber,turtle);
        try{
          team.isValidTeam();
        } catch(error) {
          expect(error.message).toEqual(`scores for team "${teamName}" must be an array.`);
          return;
        }
        expect(null).toEqual('this should never happen.');
      });

      it('throws exception when validating invalid element of scores.', () => {
        let button = 'button';
        let team = new Team(teamName,teamNumber,[1,2,3,button]);
        try{
          team.isValidTeam();
        } catch(error) {
          expect(error.message).toEqual(`score "${button}" for team ${teamName} must be an integer.`);
          return;
        }
        expect(null).toEqual('this should never happen.');
      });
    })