import BoardForecast1Game from './BoardForecast1Game';
import BoardForecast6Game from './BoardForecast6Game';
import GnlLeaderBoard from './GnlLeaderBoard';
import TableMetadata from './TableMetadata';
import {
    assertIsDefinedNotNull,
    assertIsFunction,
    assertNotInstantiated
} from '../tools/ValidationTools'
import {
    BOARD_CLASS_BASE,
    MODEL_KEY_DELIMITER,
    BOARD_CLASS_1_GAME_FORECAST,
    BOARD_CLASS_6_GAME_FORECAST
} from '../constants/Constants';

let boardFactoryInstance;

const boardCache = {};

export default class BoardFactory {
    // Singleton, we only need one.
    constructor() {
        assertNotInstantiated(boardFactoryInstance, this.constructor.name);
        boardFactoryInstance = this;
    }

    // Instances should be gotten by controller.
    static getInstance() {
        if(boardFactoryInstance) {
            return boardFactoryInstance;
        }
        return new BoardFactory();
    }

    // Build an instance of a board to fulfill the request. Cache boards so they don't need rebuilt for each.
    create(parsedHtmlBoard, boardClassKey) {
        assertIsDefinedNotNull(boardClassKey, 'BoardClassKey', 'BoardFactory.create(...)');
        assertIsDefinedNotNull(parsedHtmlBoard, 'ParsedBoard', 'BoardFactory.create(...)');
        assertIsFunction(parsedHtmlBoard.getKey, 'ParsedHtmlBoard.getKey()', 'BoardFactory.create(...)');

        let cacheKey = `${parsedHtmlBoard.getKey()}${MODEL_KEY_DELIMITER}${boardClassKey}`;
        if(boardCache[cacheKey]) {
            return boardCache[cacheKey];
        }

        let tableMetadata = new TableMetadata(
                parsedHtmlBoard.getTitle(),
                parsedHtmlBoard.getDateline(),
                parsedHtmlBoard.getDates()
            );

        let teamsList = parsedHtmlBoard.getTeamsList();

        switch (boardClassKey) {
            case BOARD_CLASS_BASE:
                boardCache[cacheKey] = new GnlLeaderBoard(tableMetadata, teamsList)
                return boardCache[cacheKey];
            case BOARD_CLASS_1_GAME_FORECAST:
                boardCache[cacheKey] = new BoardForecast1Game(tableMetadata, teamsList)
                return boardCache[cacheKey];
            case BOARD_CLASS_6_GAME_FORECAST:
                boardCache[cacheKey] = new BoardForecast6Game(tableMetadata, teamsList)
                return boardCache[cacheKey];
            default:
                throw new Error(`Could not create Board instance of type "${typeof(boardClassKey)}"`);
        }
    }
}