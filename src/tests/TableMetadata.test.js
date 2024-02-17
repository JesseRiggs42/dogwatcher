import TableMetadata from "../models/TableMetadata";

describe("TableMetadata builds and its getters return valid values.", () => {

    it('constructs with valid parameters and behaves as expected.', () => {
        let title = 'title';
        let dateline = '2024 - 2025';
        let dates = ['1','2','3','4'];
        let tableMetadata = new TableMetadata(title, dateline, dates);
        expect(tableMetadata.isValidMetadata());
        expect(tableMetadata.getTitle()).toEqual(title);
        expect(tableMetadata.getDateline()).toEqual(dateline);
        expect(tableMetadata.getDates()).toEqual(dates);
        expect(tableMetadata.getGameNightsCount()).toEqual(4);
    });

    it('constructs with empty dates and behaves as expected.', () => {
        let title = 'title';
        let dateline = '2024 - 2025';
        let dates = [];
        let tableMetadata = new TableMetadata(title, dateline, dates);
        expect(tableMetadata.isValidMetadata());
        expect(tableMetadata.getDates()).toEqual(dates);
        expect(tableMetadata.getGameNightsCount()).toEqual(0);
    });

    it('throws exception on empty title.', () => {
        let title = '';
        let dateline = '';
        let dates = [];
        let tableMetadata = new TableMetadata(title, dateline, dates);
        try{
            tableMetadata.isValidMetadata();
        } catch(error) {
            expect(error.message).toEqual('Table title cannot be empty.');
            return;
        }
        expect(null).toEqual('this should never happen.');
    });

    it('throws exception on non-string title.', () => {
        let title = 7;
        let dateline = '';
        let dates = [];
        let tableMetadata = new TableMetadata(title, dateline, dates);
        try{
            tableMetadata.isValidMetadata();
        } catch(error) {
            expect(error.message).toEqual('Table title must be string.');
            return;
        }
        expect(null).toEqual('this should never happen.');
    });

    it('throws exception on empty dateline.', () => {
        let title = 'title';
        let dateline = '';
        let dates = [];
        let tableMetadata = new TableMetadata(title, dateline, dates);
        try{
            tableMetadata.isValidMetadata();
        } catch(error) {
            expect(error.message).toEqual('Table dateline cannot be empty.');
            return;
        }
        expect(null).toEqual('this should never happen.');
    });

    it('throws exception on non-string dateline.', () => {
        let title = 'title';
        let dateline = 3;
        let dates = [];
        let tableMetadata = new TableMetadata(title, dateline, dates);
        try{
            tableMetadata.isValidMetadata();
        } catch(error) {
            expect(error.message).toEqual('Table dateline must be string.');
            return;
        }
        expect(null).toEqual('this should never happen.');
    });

    it('throws exception on non-array dates.', () => {
        let title = 'title';
        let dateline = '2024 - 2025';
        let dates = 'squirrel';
        let tableMetadata = new TableMetadata(title, dateline, dates);
        try{
            tableMetadata.isValidMetadata();
        } catch(error) {
            expect(error.message).toEqual('Table dates must be Array.');
            return;
        }
        expect(null).toEqual('this should never happen.');
    });

});