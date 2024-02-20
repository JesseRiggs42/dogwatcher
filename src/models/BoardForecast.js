import GnlLeaderBoard from "./GnlLeaderBoard";
import TeamForecast from "./TeamForecast";

export default class BoardForecast extends GnlLeaderBoard {

    constructor(metadata, teamsList) {
        super(metadata, teamsList);
        this.maxExtraGames = 1;
    }

    getExtraGameOptions() {
        let options = [];
        for(let i = 0; i <= this.maxExtraGames; i++) {
            options.push(i);
        }

        return options;
    }

    getTitle() {
        return super.getTitle() + ` ${this.maxExtraGames} Game Forecast`
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

    cloneMetadata() {
        // don't inherit this from super. We don't want to do this here.
        throw new Error(`cloneMetadata cannot be implemented from children.`);
    }

    cloneTeamsList() {
        // don't inherit this from super. We don't want to do this here.
        throw new Error(`cloneTeamsList cannot be implemented from children.`);
    }

    __clear_stats() {
        // Something has changed. We no longer know the stats. Clear and recalculate.
        this.gamesAverage = null;
        this.gamesPlayed = null;
        this.gamesStandardDeviation = null;
        this.scoresTotal = null;
    }

    __create_team(teamName, teamNumber, scores) {
        let teamForecast = new TeamForecast(teamName, teamNumber, scores);
        return teamForecast;
    }

}