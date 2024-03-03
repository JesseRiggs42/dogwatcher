import BoardForecast1Game from './BoardForecast1Game';
import BoardForecast6Game from './BoardForecast6Game';
import GnlLeaderBoard from './GnlLeaderBoard';
import TableMetadata from './TableMetadata';

// TODO: Test this class.

let boardFactoryInstance;

export default class BoardFactory {
    contructor() {
        if(boardFactoryInstance) {
            throw new Error('Cannot instantiate boardFactoryInstance more than once.');
        }
        boardFactoryInstance = this;
    }

    static getInstance() {
        if(boardFactoryInstance) {
            return boardFactoryInstance;
        }
        return new BoardFactory();
    }

    create(parsedBoard, boardClassKey) {
        if(!parsedBoard) {
            throw new Error(`parsedBoard must be defined and non-empty, but is of type "${typeof(boardClassKey)}"`);
        }

        let tableMetadata = new TableMetadata(
                parsedBoard.getTitle(),
                parsedBoard.getDateline(),
                parsedBoard.getDates()
            );

        let teamsList = parsedBoard.getTeamsList();

        switch (boardClassKey) {
            case BOARD_CLASS_BASE:
                return new GnlLeaderBoard(tableMetadata, teamsList);
            case BOARD_CLASS_1_GAME_FORECAST:
                return new BoardForecast1Game(tableMetadata, teamsList);
            case BOARD_CLASS_6_GAME_FORECAST:
                return new BoardForecast6Game(tableMetadata, teamsList);
            default:
                throw new Error(`Could not create Board instance of type "${typeof(boardClassKey)}"`);
        }
    }
}