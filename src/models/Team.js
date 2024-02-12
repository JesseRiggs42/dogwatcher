import assert from '../tools/ValidationTools'

export default class Team {
    constructor(teamName, teamNumber, scoresArray) {
        this.teamName = teamName;
        this.teamNumber = teamNumber;
        this.scores = scoresArray;
    }

    getScores() {
        return [...this.scores];
    }

    getTeamName() {
        return this.teamName;
    }

    getTeamNumber() {
        return this.teamNumber;
    }

    getScoreTotal() {
        let scoreTotal = 0;
        this.scores.forEach(score => {
            scoreTotal += score;
        });

        return scoreTotal;
    }

    getScoreAverage() {
        if(this.scores.length === 0) {
            return 0;
        }
        return this.getScoreTotal() / this.scores.length;
    }

    getGameCount() {
        return this.scores.length;
    }

    isValid() {
        assert(!!this.teamName, 'teamName must be declared and non-empty.');
        assert(!isNaN(Number.parseInt(this.teamNumber)), `teamNumber "${this.teamNumber}" for team "${this.teamName}" must be an integer.`);
        assert(Array.isArray(this.scores), `scores for team "${this.teamName}" must be an array.`);
        this.scores.forEach(score => {
            assert(!isNaN(Number.parseInt(score)), `score "${score}" for team ${this.teamName} must be an integer.`);
        })
    }
}