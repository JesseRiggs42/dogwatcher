import BoardForecast from "./BoardForecast";
import TeamForecast from "./TeamForecast";

export default class BoardForecast6Games extends BoardForecast {

    constructor(metadata, teamsList) {
        super(metadata, teamsList);
        this.maxExtraGames = 6;
    }

    __create_team(teamName, teamNumber, scores) {
        let teamForecast = new TeamForecast(teamName, teamNumber, scores);
        teamForecast.addGamesToForecast(this.__expected_games_per_6(teamForecast), teamForecast.getScoreAverage());
        return teamForecast;
    }

    __expected_games_per_6(team) {

        let gamesCount = this.getGameNightsCount();
        gamesCount === 0
            ? gamesCount = 1
            : gamesCount;

        return Math.round(6 * team.getGamesPlayed() / gamesCount);
    }
}