import GnlLeaderBoard from "./GnlLeaderBoard";

export default class BoardForecast extends GnlLeaderBoard {

    constructor(metadata, teamsMap) {
        this.metadata = metadata;
        this.teams = {};
        this.extraGames = 0;
        this.maxExtraGames = 0;
    }

    addGamesByName(gameCount, teamName) {

        let team = this.teams[teamName];
        
        if(!team) {
            console.error(`Error: could not add games to team "${teamName}"; not found.`);
            return;
        }
        if(typeof(team.addGamesToForecast) !== 'function') {
            console.error(`Error: team "${teamName}" does not implement addGamesToForecast`);
            return;
        }
        if(gameCount > this.maxExtraGames) {
            console.error(`Error: "${gameCount}" exceeds the maximum number of extra games "${this.maxExtraGames}".`);
            return;
        }

        // reset to get base average.
        team.addGamesToForecast(0,0);
        team.addGamesToForecast(gameCount, team.getScoreAverage());
    }

    __create_team(teamName, teamNumber, scores) {
        // TODO: this should be implementation specific.
    }

}