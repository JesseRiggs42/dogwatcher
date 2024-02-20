import BoardForecast from "./BoardForecast";
import TeamForecast from "./TeamForecast";

const EXTRA_GAMES = 1;

export default class BoardForecast1Game extends BoardForecast {

    constructor(metadata, teamsList) {
        super(metadata, teamsList);
        this.maxExtraGames = EXTRA_GAMES;
    }

    __create_team(teamName, teamNumber, scores) {
        let teamForecast = new TeamForecast(teamName, teamNumber, scores);
        teamForecast.addGamesToForecast(EXTRA_GAMES, teamForecast.getScoreAverage());
        return teamForecast;
    }

}