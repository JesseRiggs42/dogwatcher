import TeamForecast from "../models/TeamForecast";

describe("TeamForecast builds and its getters return expected values.", () => {

    const teamName = "teamName";
    const teamNumber = 1234;

    it('constructs and returns expected values when score entries exist.', () => {
        let testScores = [1,2,3,4];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );

        expect(teamForecast.isValidTeam());
        expect(teamForecast.getTeamName()).toEqual(teamName);
        expect(teamForecast.getTeamNumber()).toEqual(teamNumber);
        expect(teamForecast.getScores()).toEqual(testScores);
        expect(teamForecast.getScoreAverage()).toEqual(2.5);
        expect(teamForecast.getGamesPlayed()).toEqual(4);
      });

      test('setExtraScores takes empty array and behaves normally', () => {
        let testScores = [1,2,3,4];
        let extraScores = [];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        teamForecast.setExtraScores(extraScores);

        expect(teamForecast.getScores()).toEqual(testScores);
        expect(teamForecast.getScoreTotal()).toEqual(10);
        expect(teamForecast.getGamesPlayed()).toEqual(4);
        expect(teamForecast.getScoreAverage()).toEqual(2.5);
      });

      test('setExtraScores takes numeric array and behaves normally', () => {
        let testScores = [1,2,3,4];
        let extraScores = [5,6,7];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        teamForecast.setExtraScores(extraScores);

        expect(teamForecast.getScores()).toEqual([...testScores, ...extraScores]);
        expect(teamForecast.getScoreTotal()).toEqual(28);
        expect(teamForecast.getGamesPlayed()).toEqual(7);
        expect(teamForecast.getScoreAverage()).toEqual(4);
      });

      test('setExtraScores throws exception when passed non-array argument.', () => {
        let testScores = [1,2,3,4];
        let extraScores = 'squirrel';
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        try {
            teamForecast.setExtraScores(extraScores);
        } catch(error) {
            expect(error.message).toEqual(`Could not set extra scores for team "${teamName}". `
                + `Numeric array "${extraScores}" must be array.`)
        }
      });

      test('setExtraScores throws exception when passed non-numeric array.', () => {
        let testScores = [1,2,3,4];
        let rabbit = 'rabbit';
        let extraScores = [5,6,rabbit];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        try {
            teamForecast.setExtraScores(extraScores);
        } catch(error) {
            expect(error.message).toEqual(`Could not set extra scores for team "${teamName}". `
                + `Element of numeric array "${rabbit}" must be a number.`)
        }
      });

      test('addGamesToForecast takes zero values and behaves normally', () => {
        let testScores = [1,2,3,4];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        teamForecast.addGamesToForecast(0, 0);

        expect(teamForecast.getScores()).toEqual(testScores);
        expect(teamForecast.getScoreTotal()).toEqual(10);
        expect(teamForecast.getGamesPlayed()).toEqual(4);
        expect(teamForecast.getScoreAverage()).toEqual(2.5);
      });

      test('addGamesToForecast takes multiple zero scores and behaves normally', () => {
        let testScores = [0,1,2,3];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        teamForecast.addGamesToForecast(2, 0);

        expect(teamForecast.getScores()).toEqual([...testScores, 0, 0]);
        expect(teamForecast.getScoreTotal()).toEqual(6);
        expect(teamForecast.getGamesPlayed()).toEqual(6);
        expect(teamForecast.getScoreAverage()).toEqual(1);
      });

      test('addGamesToForecast takes multiple negative scores and behaves normally', () => {
        let testScores = [];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            testScores
        );
        teamForecast.addGamesToForecast(5, -1);

        expect(teamForecast.getScores()).toEqual([-1, -1, -1, -1, -1]);
        expect(teamForecast.getScoreTotal()).toEqual(-5);
        expect(teamForecast.getGamesPlayed()).toEqual(5);
        expect(teamForecast.getScoreAverage()).toEqual(-1);
      });

    });