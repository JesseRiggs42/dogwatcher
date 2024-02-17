import {assert} from '../tools/ValidationTools'

export default class Team {
    constructor(teamName, teamNumber, scoresArray) {
        this.teamName = teamName;
        this.teamNumber = teamNumber;
        this.scores = scoresArray;
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
        return this.__total_scores(this.scores);
    }

    getScoreAverage() {
        return this.__average_scores(this.scores);
    }

    getGamesPlayed() {
        return this.scores.length;
    }

    isValidTeam() {
        assert(!!this.teamName, 'teamName must be declared and non-empty.');
        assert(!isNaN(Number.parseInt(this.teamNumber)), `teamNumber "${this.teamNumber}" for team "${this.teamName}" must be an integer.`);
        assert(Array.isArray(this.scores), `scores for team "${this.teamName}" must be an array.`);
        this.scores.forEach(score => {
            assert(!isNaN(Number.parseInt(score)), `score "${score}" for team ${this.teamName} must be an integer.`);
        })
    }

    __average_scores(scores) {
        let total = 0;
        scores.forEach(score => {
            total += score;
        });

        return total == 0? total : total / scores.length;
    }

    __total_scores(scores) {
        let total = 0;
        scores.forEach(score => {
            total += score;
        });

        return total;
    }

}