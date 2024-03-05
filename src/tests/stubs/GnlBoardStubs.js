import Team from "../../models/Team";
import TableMetadata from "../../models/TableMetadata";

function generateValidTeamsList(teamsCount, gamesCount, score) {

    let scores = [];
    for(let i = 0; i < gamesCount; i++) {
        scores.push(score);
    }

    return generateValidTeamsListWithScores(teamsCount, scores);
}

function generateValidTeamsListWithScores(teamsCount, scores) {

    let teamsList = [];
    for(let i = 0; i < teamsCount; i++) {
        teamsList.push(new Team(`Team${i}`, i, [...scores]));
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

function generateParsedHtmlStub(dates, dateline, key, teamsList, title) {
    return {
        getDates    : () => dates,
        getDateline : () => dateline,
        getKey      : () => key,
        getTeamsList: () => teamsList,
        getTitle    : () => title,
    };
}

export {
    generateMetadata,
    generateParsedHtmlStub,
    generateValidMetadata,
    generateValidTeamsList,
    generateValidTeamsListWithScores,
    generateValidDates
}