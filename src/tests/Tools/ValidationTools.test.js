import {
    assert,
    assertIsNumericArray
} from '../../tools/ValidationTools'

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

    describe('assertIsNumericArray() behaves as expected:', () => {
        test('returns normally on valid numeric array.', () => {
            assertIsNumericArray([-1,0,1,1.5,Number.MAX_VALUE], 'elementName', 'context');
        });

        test('returns normally on empty numeric array.', () => {
            assertIsNumericArray([], 'elementName', 'context');
        });

        test('throws error on non-array.', () => {
            try{
                assertIsNumericArray('squirrel', 'elementName', 'context');
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Numeric array "elementName" in "context" must be array.');
            }
        });

        test('throws error on null.', () => {
            try{
                assertIsNumericArray(null, 'elementName', 'context');
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Element "elementName" in "context" is expected to be non-null');
            }
        });

        test('throws error on non-numeric array.', () => {
            try{
                assertIsNumericArray(['squirrel'], 'elementName', 'context');
                expect(false).toEqual('Failed to throw.');
            } catch (error) {
                expect(error.message).toEqual('Element of numeric array "elementName" in "context" must be a number.');
            }
        });
    });
});