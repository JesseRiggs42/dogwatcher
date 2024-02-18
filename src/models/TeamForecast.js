import Team from './Team';
import { validateNumericArray } from '../tools/ValidationTools'

export default class TeamForecast extends Team {

    constructor(teamName, teamNumber, scoresArray) {
        super(teamName, teamNumber, scoresArray);
        this.extraScores = [];
    }

    getScores() {
        return [...this.scores, ...this.extraScores];
    }

    getGamesPlayed() {
        return super.getGamesPlayed() + this.extraScores.length;
    }

    setExtraScores(extraScores) {
        try{
            validateNumericArray(extraScores);
        } catch(error) {
            error.message = `Could not set extra scores for team "${this.getTeamName()}". ` + error.message;
            throw error;
        }
        this.extraScores = extraScores;
        this.__clear_stats();
    }

    addGamesToForecast(gameCount, score) {
        if(gameCount < 0 || isNaN(Number.parseFloat(score))) {
            throw new Error(`Could not add games to forecast for team "${this.getTeamName()}" with gameCount "${gameCount}" and score "${score}"`);
        }
        let extraScores = [];
        for(let i=0;i<gameCount;i++){
            extraScores.push(score);
        }
        this.setExtraScores(extraScores);
    }

    __clear_stats() {
        // Something has changed. We no longer know the stats. Clear and recalculate.
        this.scoreTotal = null;
        this.scoreAvg = null;
        this.scoreStd = null;
        this.gamesPlayed = null;
    }
}