class GnlLeaderBoard {
    constructor(metadata, teamsMap) {
        this.title = metadata.getTitle();
        this.dateline = metadata.getDateline();
        this.dateArray = metadata.getDates();
        this.teamsMap = teamsMap;
    }

    getTeamByName(name) {
        if(!this.teamsMap[name]) {
            log.error(`Error: could not find team by name: ${name}`)
            return null;
        }
        return this.teamsMap[name].clone();
    }

    getAllTeamNames() {
        let teamNames = [];
        this.teamsMap.keys().forEach(name => {
            teamNames.push(name);
        });
        return teamNames;
    }

    getDates() {
        return [...this.dateArray];
    }

    getDateline() {
        return this.dateline;
    }

    getTitle() {
        return this.title;
    }
}