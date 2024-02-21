import {assert} from '../tools/ValidationTools'

export default class TableMetadata{
    constructor(title, dateline, dates) {
        this.title = title;
        this.dateline = dateline;
        this.dates = dates;
    }

    clone() {

        let dates = [];
        this.dates.forEach(date => {
            dates.push(date);
        });

        return new TableMetadata(this.title, this.dateline, dates);
    }

    getTitle() {
        return this.title;
    }

    getDateline() {
        return this.dateline;
    }

    getDates() {
        return [...this.dates];
    }

    getGameNightsCount() {
        return this.dates.length;
    }

    isValidMetadata() {
        assert(!!this.title, 'Table title cannot be empty.');
        assert(typeof(this.title) == 'string', 'Table title must be string.');
        assert(!!this.dateline, 'Table dateline cannot be empty.');
        assert(typeof(this.dateline) == 'string', 'Table dateline must be string.');
        assert(Array.isArray(this.dates), 'Table dates must be Array.');
        this.dates.forEach(date => {
            assert(!!date, 'All table dates must be nonempty.');
            assert(typeof(date) === 'string', `Expected table date to be string, found ${typeof(date)}`);
        });
    }
}