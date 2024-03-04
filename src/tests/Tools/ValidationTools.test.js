import {
    assert,
    assertIsBoolean,
    assertIsDefinedNotNull,
    assertIsNumericArray,
    assertIsStringArray,
    assertNonEmptyString
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

    describe('assertIsBoolean() behaves as expected:', () => {
        test('returns normally on valid booleans.', () => {
            assertIsBoolean(true, 'booleanElement', 'test');
            assertIsBoolean(false, 'booleanElement', 'test');
        });

        test('throws on non-boolean values.', () => {
            try{
                assertIsBoolean(null, 'booleanElement', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "booleanElement" in "test" is expected to be non-null');
            }
        });
    });


    describe('assertNonEmptyString() behaves as expected:', () => {
        test('returns normally on non-empty strings.', () => {
            assertNonEmptyString('0', 'stringElement', 'test');
            assertNonEmptyString('false', 'stringElement', 'test');
        });

        test('throws on null.', () => {
            try{
                assertNonEmptyString(null, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be of type "string" but is "object".');
            }
        });

        test('throws on undefined.', () => {
            try{
                assertNonEmptyString(undefined, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be of type "string" but is "undefined".');
            }
        });

        test('throws on int.', () => {
            try{
                assertNonEmptyString(42, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be of type "string" but is "number".');
            }
        });
    });

    describe('assertIsDefinedNotNull() behaves as expected:', () => {
        test('returns normally on defined and non-null value.', () => {
            let def = 0;
            expect(assertIsDefinedNotNull(def, 'element', 'test'))
            def = false;
            expect(assertIsDefinedNotNull(def, 'element', 'test'))
            def = 'undefined';
            expect(assertIsDefinedNotNull(def, 'element', 'test'))
            def = 'null';
            expect(assertIsDefinedNotNull(def, 'element', 'test'))
        });

        test('throws on null.', () => {
            try{
                assertIsDefinedNotNull(null, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be non-null');
            }
        });

        test('throws on undefined.', () => {
            try{
                assertIsDefinedNotNull(undefined, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be defined.');
            }
        });
    });

    describe('assertIsStringArray() behaves as expected:', () => {
        test('returns normally on valid string array.', () => {
            assertIsStringArray([]);
            assertIsStringArray(['0','false','undefined','null','']);
        });

        test('throws on null array.', () => {
            try{
                assertIsStringArray(null, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be non-null');
            }
        });

        test('throws on undfined array.', () => {
            try{
                assertIsStringArray(undefined, 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "element" in "test" is expected to be defined.');
            }
        });

        test('throws on null element.', () => {
            try{
                assertIsStringArray(['', null, ''], 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "null" of String Array "element" in "test" is expected to be of type "string" but is "object".');
            }
        });

        test('throws on undefined element.', () => {
            try{
                assertIsStringArray(['', undefined, ''], 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "undefined" of String Array "element" in "test" is expected to be of type "string" but is "undefined".');
            }
        });

        test('throws on int element.', () => {
            try{
                assertIsStringArray(['', 1, ''], 'element', 'test');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "1" of String Array "element" in "test" is expected to be of type "string" but is "number".');
            }
        });
    });
});