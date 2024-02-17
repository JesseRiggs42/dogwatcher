import {
    assert,
    validateNumericArray
} from '../tools/ValidationTools'

describe('ValidationTools vaidate parameters:', () => {
    describe('assert() behaves as expected:', () => {
        test('returns normally on true.', () => {
            assert(true, 'Failed on true.');
        });

        test('throws error on false.', () => {
            try{
                assert(false, 'Threw on false.');
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Threw on false.');
            }
        });
    });

    describe('validateNumericArray() behaves as expected:', () => {
        test('returns normally on valid numeric array.', () => {
            validateNumericArray([-1,0,1,1.5,Number.MAX_VALUE]);
        });

        test('returns normally on empty numeric array.', () => {
            validateNumericArray([]);
        });

        test('throws error on non-array.', () => {
            try{
                validateNumericArray('squirrel');
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Numeric array "squirrel" must be array.');
            }
        });

        test('throws error on null.', () => {
            try{
                validateNumericArray(null);
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Numeric array "null" must be array.');
            }
        });

        test('throws error on non-numeric array.', () => {
            try{
                validateNumericArray(['squirrel']);
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Element of numeric array "squirrel" must be a number.');
            }
        });
    });
});