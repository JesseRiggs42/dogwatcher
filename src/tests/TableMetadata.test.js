import TableMetadata from "../models/TableMetadata";

describe("TableMetadata behaves as expected", () => {

    describe('Returns expected data', () => {
        describe('Returns expected data', () => {
            let title = 'title';
            let dateline = '2024 - 2025';
            let dates = ['1','2','3','4'];
            let tableMetadata;
            test('constructor()',        () => {tableMetadata = new TableMetadata(title, dateline, dates);});
            test('isValidMetadata()',    () => {expect(tableMetadata.isValidMetadata());});
            test('getTitle()',           () => {expect(tableMetadata.getTitle()).toEqual(title);});
            test('getDateline()',        () => {expect(tableMetadata.getDateline()).toEqual(dateline);});
            test('getDates()',           () => {expect(tableMetadata.getDates()).toEqual(dates);});
            test('getGameNightsCount()', () => {expect(tableMetadata.getGameNightsCount()).toEqual(4);});
        });

        describe('Returns expected data with empty dates', () => {
            let title = 'title';
            let dateline = '2024 - 2025';
            let dates = [];
            let tableMetadata = new TableMetadata(title, dateline, dates);
            test('isValidMetadata()',    () => {expect(tableMetadata.isValidMetadata());});
            test('getDates()',           () => {expect(tableMetadata.getDates()).toEqual(dates);});
            test('getGameNightsCount()', () => {expect(tableMetadata.getGameNightsCount()).toEqual(0);});
        });
    });

    describe('Throws expected errors on', () => {
        it('empty title.', () => {
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

        it('non-string title.', () => {
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

        it('empty dateline.', () => {
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

        it('non-string dateline.', () => {
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

        it('non-array dates.', () => {
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

        test('dates with empty date', () => {
            let title = 'title';
            let dateline = '2024 - 2025';
            let dates = ['1', null, '3'];
            let tableMetadata = new TableMetadata(title, dateline, dates);
            try {
                tableMetadata.isValidMetadata();
                expect(false).toEqual("This should never happen.");
            } catch(error) {
                expect(error.message).toEqual('All table dates must be nonempty.');
            }
        });

        test('dates with non-string date', () => {
            let title = 'title';
            let dateline = '2024 - 2025';
            let invalidDate = 42;
            let dates = ['1', invalidDate, '3'];
            let tableMetadata = new TableMetadata(title, dateline, dates);
            try {
                tableMetadata.isValidMetadata();
                expect(false).toEqual("This should never happen.");
            } catch(error) {
                expect(error.message).toEqual(`Expected table date to be string, found ${typeof(invalidDate)}`);
            }
        });
    });

});