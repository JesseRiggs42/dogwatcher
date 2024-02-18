import GnlLeaderBoard from "./GnlLeaderBoard";
import TeamForecast from "./TeamForecast";

export default class BoardForecast extends GnlLeaderBoard {

    constructor(metadata, teamsList) {
        super(metadata, teamsList);
        this.maxExtraGames = 0;
    }

    addGamesByName(gameCount, teamName) {

        let team = this.teamsMap[teamName];
        
        if(!team) {
            let errMsg = `addGamesByName(): team not found "${teamName}".`;
            console.error(errMsg);
            throw new Error(errMsg);
        }
        if(typeof(team.addGamesToForecast) !== 'function') {
            let errMsg = `addGamesByName(): team "${teamName}" does not implement addGamesToForecast. addGamesToForecast is ${typeof(team.addGamesToForecast)}.".`;
            console.error(errMsg);
            throw new Error(errMsg);
        }
        if(gameCount > this.maxExtraGames) {
            let errMsg = `addGamesByName(): ${gameCount} exceeds the maximum number of extra games ${this.maxExtraGames}.`;
            console.error(errMsg);
            throw new Error(errMsg);
        }

        // reset to get base average.
        team.addGamesToForecast(0,0);
        team.addGamesToForecast(gameCount, team.getScoreAverage());
        this.__clear_stats();
    }

    __clear_stats() {
        // Something has changed. We no longer know the stats. Clear and recalculate.
        this.gamesAverage = null;
        this.gamesStandardDeviation = null;
        this.scoresTotal = null;
        this.gamesPlayed = null;
    }

    __create_team(teamName, teamNumber, scores) {
        let teamForecast = new TeamForecast(teamName, teamNumber, scores);
        return teamForecast;
    }

}