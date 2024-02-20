import BoardForecast from "./BoardForecast";
import TeamForecast from "./TeamForecast";

const EXTRA_GAMES = 6;

export default class BoardForecast6Game extends BoardForecast {

    constructor(metadata, teamsList) {
        super(metadata, teamsList);
        this.maxExtraGames = EXTRA_GAMES;
    }

    __create_team(teamName, teamNumber, scores) {
        let teamForecast = new TeamForecast(teamName, teamNumber, scores);
        teamForecast.addGamesToForecast(this.__expected_games_per_extra(teamForecast), teamForecast.getScoreAverage());

        return teamForecast;
    }

    __expected_games_per_extra(team) {

        let gamesCount = this.getGameNightsCount();
        gamesCount === 0
            ? gamesCount = 1
            : gamesCount;

        return Math.round(EXTRA_GAMES * team.getGamesPlayed() / gamesCount);
    }
}