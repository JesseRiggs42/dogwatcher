function parseData(htmlLeaderBoardData){
    if(htmlLeaderBoardData === null
        || typeof(htmlLeaderBoardData) != 'string'
        || htmlLeaderBoardData.length === 0) {
        throw new Error("Error: htmlLeaderBoardData must be non-empty string.")
    }

}