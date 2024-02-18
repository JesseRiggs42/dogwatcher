import {assert} from '../tools/ValidationTools'
import {
    calculateAverage,
    calculateStandardDeviation,
    sumArray
} from '../tools/MathTools'

export default class Team {
    constructor(teamName, teamNumber, scoresArray) {
        this.teamName = teamName;
        this.teamNumber = teamNumber;
        this.scores = scoresArray;
        this.scoreTotal = null;
        this.scoreAvg = null;
        this.scoreStd = null;
        this.gamesPlayed = null;
        this.uid = Math.round(1000000000*Math.random());
    }

    clone() {
        return new Team(this.teamName, this.teamNumber, [...this.scores]);
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
        return this.scoreTotal ?? (this.scoreTotal = sumArray(this.getScores()));
    }

    getScoreAverage() {
        return this.scoreAvg ?? (this.scoreAvg = calculateAverage(this.getScores()));
    }

    getScoreStd() {
        return this.scoreStd ?? (this.scoreStd = calculateStandardDeviation(this.getScores()));
    }

    getGamesPlayed() {
        return this.gamesPlayed ?? (this.gamesPlayed = this.scores.length);
    }

    isValidTeam() {
        assert(!!this.teamName, 'teamName must be declared and non-empty.');
        assert(!isNaN(Number.parseInt(this.teamNumber)), `teamNumber "${this.teamNumber}" for team "${this.teamName}" must be an integer.`);
        assert(Array.isArray(this.scores), `scores for team "${this.teamName}" must be an array.`);
        this.scores.forEach(score => {
            assert(!isNaN(Number.parseInt(score)), `score "${score}" for team ${this.teamName} must be an integer.`);
        })
    }

}