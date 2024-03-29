import { assert } from '../tools/ValidationTools';
import {
    calculateStandardDeviation,
    calculateAverage } from '../tools/MathTools'
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
            console.error(`Error: could not find team by name: ${name}`);
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
            this.scoresTotal += this.teamsMap[name].getScoreTotal();
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
            this.gamesPlayed += this.teamsMap[name].getGamesPlayed();
        });
        
        return this.gamesPlayed;
    }

    getTitle() {
        return this.metadata.getTitle();
    }

    cloneMetadata() {
        return this.metadata.clone();
    }

    cloneTeamsList() {

        let teamsList = [];
        Object.keys(this.teamsMap).forEach(teamName => {
            teamsList.push(this.teamsMap[teamName].clone());
        });

        return teamsList;
    }

    static __validate_teamsList(teamsList) {
        assert(teamsList != null, 'Teams list cannot be null.');
        assert(Array.isArray(teamsList), 'Teams list must be array.');
        teamsList.forEach(team => {
            assert(team != null, 'All teams in teams list must not be null.');
            assert(typeof(team.isValidTeam)==='function', 'All teams must impliment "isValidTeam".');
            team.isValidTeam();
        });
    }

    __map_teamsList(teamsList) {
        try{
            GnlLeaderBoard.__validate_teamsList(teamsList);
        } catch (error) {
            error.message = `Could not validate teams list: ` + error.message;
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