import BoardForecast from "./BoardForecast";

export default class BoardForecast1Game extends BoardForecast {

    constructor(gnlLeaderBoard) {
        super(gnlLeaderBoard);
        this.extraGames = 1;
        this.maxExtraGames = 1;
    }

}