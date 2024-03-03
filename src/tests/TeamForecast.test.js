import TeamForecast from "../models/TeamForecast";

function runStats (teamForecast) {
    teamForecast.getScoreTotal();
    teamForecast.getGamesPlayed();
    teamForecast.getScoreStd();
}

describe("TeamForecast behaves as expected", () => {

    const teamName = "teamName";
    const teamNumber = 1234;

    describe('with vaid parameters and numeric teamScores', () => {
        let teamScores = [1,3,9,27];
        let teamForecast;

        test('constructs wihtout error.', () => {
            teamForecast = new TeamForecast(
                teamName,
                teamNumber,
                teamScores
            );
        });
        test('isValid() returns without error.', () => {
          expect(teamForecast.isValidTeam());});

        test('getTeamName() returns expected teamName.', () => {
            expect(teamForecast.getTeamName())
            .toEqual(teamName);});

        test('getTeamNumber() returns expected teamNumber.', () => {
            expect(teamForecast.getTeamNumber())
            .toEqual(teamNumber);});

        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual(teamScores);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(40);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(10);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(4);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(10.246950765959598);});
    });

    describe('setExtraScores() succeeds with empty array and does not affect calculated statistics', () => {
        let teamScores = [1,2,3,4];
        let extraScores = [];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        test('setExtraScores() succeeds with empty array', () => {
            teamForecast.setExtraScores(extraScores);});

        test('getScores() returs expected scores.', () => {
          expect(teamForecast.getScores())
          .toEqual(teamScores);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(10);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(2.5);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(4);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(1.118033988749895);});
    });

    describe('setExtraScores() succeeds with numeric array and caculated stats adjust', () => {
        let teamScores = [1,2,3,4];
        let extraScores = [5,6,7];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        test('setExtraScores() succeeds with populated array', () => {
            teamForecast.setExtraScores(extraScores);});

        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual([...teamScores, ...extraScores]);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(28);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(4);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(7);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(2);});
    });

    describe('setExtraScores() called multiple times and caculated stats adjust', () => {

        let teamScores = [1,2,3,4];
        let extraScores = [5,6,7];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        teamForecast.setExtraScores([1]);
        runStats(teamForecast);
        teamForecast.setExtraScores([0,0,0,0,0,0,0]);
        runStats(teamForecast);
        teamForecast.setExtraScores([-1,-2,-3]);
        runStats(teamForecast);
        teamForecast.setExtraScores(extraScores);


        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual([...teamScores, ...extraScores]);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(28);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(4);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(7);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(2);});
    });

    test('setExtraScores() throws exception when passed non-array argument.', () => {
        let teamScores = [1,2,3,4];
        let extraScores = 'squirrel';
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        try {
            teamForecast.setExtraScores(extraScores);
        } catch(error) {
            expect(error.message).toEqual(`Numeric array "extraScores" in "teamName" must be array.`);
        }
    });

    test('setExtraScores() throws exception when passed non-numeric array.', () => {
        let teamScores = [1,2,3,4];
        let rabbit = 'rabbit';
        let extraScores = [5,6,rabbit];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        try {
            teamForecast.setExtraScores(extraScores);
        } catch(error) {
            expect(error.message).toEqual(`Element of numeric array "extraScores" in "teamName" must be a number.`);
        }
    });

    describe('addGamesToForecast succeeds with zero values and calculated stats are unneffected', () => {
        let teamScores = [1,2,3,4];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        test('addGamesToForecast() succeeds with populated array', () => {
            teamForecast.addGamesToForecast(0, 0);});

        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual(teamScores);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(10);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(2.5);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(4);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(1.118033988749895);});
    });

    describe('addGamesToForecast succeeds with populated numeric array and calculated stats adjust', () => {
        let teamScores = [0,1,2,3];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        test('addGamesToForecast() succeeds with populated array', () => {
            teamForecast.addGamesToForecast(2, 0);});

        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual([...teamScores, 0, 0]);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(6);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(1);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(6);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(1.1547005383792515);});
    });

    describe('addGamesToForecast() succeeds with multiple negative scores and stats adjust', () => {
        let teamScores = [];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        test('addGamesToForecast() succeeds with populated array', () => {
            teamForecast.addGamesToForecast(5, -1);});

        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual([-1, -1, -1, -1, -1]);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(-5);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(-1);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(5);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(0);});
    });

    describe('addGamesToForecast() called multiple times and caculated stats adjust', () => {

        let teamScores = [2,2,2,2];
        let teamForecast = new TeamForecast(
            teamName,
            teamNumber,
            teamScores
        );
        teamForecast.addGamesToForecast(0, 0);
        runStats(teamForecast);
        teamForecast.addGamesToForecast(5, 5);
        runStats(teamForecast);
        teamForecast.addGamesToForecast(6, -1);
        runStats(teamForecast);
        teamForecast.addGamesToForecast(2, 2);


        test('getScores() returs expected scores.', () => {
            expect(teamForecast.getScores())
            .toEqual([...teamScores, 2, 2]);});

        test('getScoreTotal() returns expected total.', () => {
            expect(teamForecast.getScoreTotal())
            .toEqual(12);});

        test('getScoreAverage() returns expected average.', () => {
            expect(teamForecast.getScoreAverage())
            .toEqual(2);});

        test('getGamesPlayed() returns expected value.', () => {
            expect(teamForecast.getGamesPlayed())
            .toEqual(6);});

        test('getScoreStd() returns expected standard deviation.', () => {
            expect(teamForecast.getScoreStd())
            .toEqual(0);});
    });
});