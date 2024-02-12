function parseData(htmlLeaderBoardData){
    if(htmlLeaderBoardData === null
        || typeof(htmlLeaderBoardData) != 'string'
        || htmlLeaderBoardData.length === 0) {
        throw new Error("Error: htmlLeaderBoardData cannot be null or empty.")
    }
}