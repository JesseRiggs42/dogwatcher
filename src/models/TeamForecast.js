import Team from './Team';
import {validateNumericArray} from '../tools/ValidationTools'

export default class TeamForecast extends Team {

    constructor(teamName, teamNumber, scoresArray) {
        super(teamName, teamNumber, scoresArray);
        this.extraScores = [];
    }

    getScores() {
        return [...this.scores, ...this.extraScores];
    }

    getScoreTotal() {
        return this.__total_scores([...this.scores, ...this.extraScores]);
    }

    getScoreAverage() {
        return this.__average_scores([...this.scores, ...this.extraScores]);
    }

    getGamesPlayed() {
        return this.scores.length + this.extraScores.length;
    }

    setExtraScores(extraScores) {
        try{
            validateNumericArray(extraScores);
        } catch(error) {
            error.message = `Could not set extra scores for team "${this.getTeamName()}". ` + error.message;
            throw error;
        }
        this.extraScores = extraScores;
    }

    addGamesToForecast(gameCount, score) {
        if(gameCount < 0 || isNaN(Number.parseFloat(score))) {
            throw new Error(`Could not add games to forecast for team "${this.getTeamName()}" with gameCount "${gameCount}" and score "${score}"`);
        }
        let extraScores = [];
        for(let i=0;i<gameCount;i++){
            extraScores.push(score);
        }
        this.extraScores = extraScores;
    }

}