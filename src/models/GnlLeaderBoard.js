import { assert } from '../tools/ValidationTools';
import { calculateStandardDeviation, calculateAverage } from '../tools/MathTools'
import Team from './Team';

export default class GnlLeaderBoard {
    constructor(metadata, teamsList) {

        if(!metadata) {
            throw new Error("Metadata must be defined and non-null.");
        } if(typeof(metadata.isValidMetadata)!=='function') {
            throw new Error("Metadata must implement isValidMetadata().");
        }
        metadata.isValidMetadata();

        this.metadata = metadata;
        this.teamsMap = this.__map_teamsList(teamsList);
        this.gamesAverage = null;
        this.gamesStandardDeviation = null;
        this.scoresTotal = null;
        this.gamesPlayed = null;
        this.teamsList = null;
    }

    getTeamByName(name) {
        if(!this.teamsMap[name]) {
            console.error(`Error: could not find team by name: ${name}`)
            return null;
        }
        return this.teamsMap[name].clone();
    }

    getAllTeamNames() {
        let teamNames = [];
        Object.keys(this.teamsMap).forEach(name => {
            teamNames.push(name);
        });
        return teamNames;
    }

    getGamesAverage() {
        this.gamesAverage !== null
            ? this.gamesAverage
            : this.gamesAverage = calculateAverage(this.__get_scores());

        return this.gamesAverage;
    }

    getGamesStandardDeviation() {

        this.gamesStandardDeviation !== null
            ? this.gamesStandardDeviation
            : this.gamesStandardDeviation = calculateStandardDeviation(this.__get_scores())

        return this.gamesStandardDeviation;
    }

    getDates() {
        return this.metadata.getDates();
    }

    getDateline() {
        return this.metadata.getDateline();
    }

    getScoresTotal() {

        if(this.scoresTotal !== null) {
            return this.scoresTotal;
        }

        this.scoresTotal = 0;
        Object.keys(this.teamsMap).forEach(name => {
            this.scoresTotal += this.getTeamByName(name).getScoreTotal();
        });

        return this.scoresTotal;
    }

    getGameNightsCount() {
        return this.metadata.getGameNightsCount();
    }

    getGamesPlayed() {

        if(this.gamesPlayed !== null) {
            return this.gamesPlayed;
        }

        this.gamesPlayed = 0;
        Object.keys(this.teamsMap).forEach(name => {
            this.gamesPlayed += this.getTeamByName(name).getGamesPlayed();
        });
        
        return this.gamesPlayed;
    }

    getTitle() {
        return this.metadata.getTitle();
    }

    create1GameForecast() {
        // TODO: Implement this.
        throw new Error("create1GameForecast not yet implemented");
    }

    create6GameForecast() {
        // TODO: Implement this.
        throw new Error("create6GameForecast not yet implemented");
    }

    __add_metadata(metadata) {
        assert(metadata != null, 'Metadata cannot be null.');
        assert(typeof(metadata.isValidMetadata)==='function', 'Metadata must impliment "isValidMetadata".');
        try {
            metadata.isValidMetadata();
        } catch(error) {
            error.message = 'Could not add metadata. Invalid metadata: ' + error.message;
        }
    }

    __validate_teamsList(teamsList) {
        assert(teamsList != null, 'Teams map cannot be null.');
        assert(Array.isArray(teamsList), 'Teams map must be array.');
        teamsList.forEach(team => {
            assert(team != null, 'All teams in teams map must not be null.');
            assert(typeof(team.isValidTeam)==='function', 'All teams must impliment "isValidTeam".');
            team.isValidTeam();
        });
    }

    __map_teamsList(teamsList) {
        try{
            this.__validate_teamsList(teamsList);
        } catch (error) {
            error.message = `Could not validate teams map: ` + error.message;
            throw error;
        }
        let teamsMap = {};
        teamsList.forEach(team => {
            teamsMap[team.getTeamName()] =
                this.__create_team(
                    team.getTeamName(),
                    team.getTeamNumber(),
                    team.getScores()
                );
        });

        return teamsMap;
    }

    __get_teamsList() {
        if(this.teamsList != null){
            return this.teamsList;
        }

        let teamsList = [];
        Object.keys(this.teamsMap).forEach(key => {
            teamsList.push(this.teamsMap[key]);
        });
        this.teamsList = teamsList;

        return this.teamsList;
    }

    __get_scores() {
        let scores = [];
        this.getAllTeamNames().forEach(name => {
            this.teamsMap[name].getScores().forEach(score => {
                scores.push(score);
            });
        });
        
        return scores;
    }

    __create_team(teamName, teamNumber, scores) {
        return new Team(teamName, teamNumber, scores);
    }
}