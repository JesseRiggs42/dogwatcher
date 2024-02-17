import Team from "../../models/Team";
import TableMetadata from "../../models/TableMetadata";

function generateValidTeamsList(teamsCount, gamesCount, score) {
    
    let scores = [];
    for(let i = 0; i < gamesCount; i++) {
        scores.push(score);
    }

    let teamsList = [];
    for(let i = 0; i < teamsCount; i++) {
        teamsList.push(new Team(`Team${i}`, i, scores));
    }

    return teamsList;
}

function generateValidMetadata(gamesCount) {
    return generateMetadata('title', 'dateline', gamesCount);
}

function generateMetadata(title, dateline, gamesCount) {
    return new TableMetadata(title, dateline, generateValidDates(gamesCount));
}

function generateValidDates(gamesCount) {
    let dates = [];
    for(let i = 0; i < gamesCount; i++) {
        dates.push(`date${i}`);
    }

    return dates;
}

export {generateValidTeamsList, generateValidMetadata, generateMetadata, generateValidDates}