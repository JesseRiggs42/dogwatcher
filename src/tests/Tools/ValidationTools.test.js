import {
    assert,
    assertIsBoolean,
    assertIsDefinedNotNull,
    assertIsFunction,
    assertIsNumber,
    assertIsNumericArray,
    assertIsString,
    assertIsStringArray,
    assertIsSupported,
    assertIsValid,
    assertNonEmptyString,
    assertNotInstantiated
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

    describe('assertIsString() behaves as expected:', () => {
        const stringName = 'stringName';
        const context = 'test';
        test('returns as expected on string.', () => {
            assertIsString('string', stringName, context);
        });
        test('throws on null.', () => {
            try{
                assertIsString(null, stringName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });

        test('throws on undefined.', () => {
            try{
                assertIsString(undefined, stringName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on undefined.', () => {
            try{
                assertIsString(42, stringName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
    });

    describe('assertIsStringArray() behaves as expected:', () => {
        test('returns normally on valid string array.', () => {
            assertIsStringArray([], 'array','context');
            assertIsStringArray(['0','false','undefined','null',''], 'array','context');
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

    describe('assertNotInstantiated() behaves as expected:', () => {
        test('returns normally on undefined and null.', () => {
            assertNotInstantiated(undefined, 'object');
            assertNotInstantiated(null, 'object');
        });

        test('throws on objec.', () => {
            try{
                assertNotInstantiated({}, 'object');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Error: "object" cannot be instantiated twice.');
            }
        });
    });

    describe('assertIsFunction() behaves as expected:', () => {
        test('returns normally on function.', () => {
            assertIsFunction(() => {return 'null'}, 'functionName', 'context');
        });

        test('throws on objec.', () => {
            try{
                assertIsFunction({}, 'functionName', 'context');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('"functionName" is expected to be of type "function" but is "object".');
            }
        });

        test('throws on null.', () => {
            try{
                assertIsFunction(null, 'functionName', 'context');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "functionName" in "context" is expected to be non-null');
            }
        });

        test('throws on undefined.', () => {
            try{
                assertIsFunction(undefined, 'functionName', 'context');
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toEqual('Element "functionName" in "context" is expected to be defined.');
            }
        });

    });

    describe('assertIsNumber() behaves as expected.', () => {
        const numberName = 'nuberName';
        const context = 'test';
        test('returns normal on integer.', () => {
            assertIsNumber(10, numberName, context);
        });
        test('returns normal on negative decimal.', () => {
            assertIsNumber(-3.14159, numberName, context);
        });
        test('returns normal on really big.', () => {
            assertIsNumber(Number.MAX_VALUE, numberName, context);
        });
        test('returns normal on really small.', () => {
            assertIsNumber(Number.MIN_VALUE, numberName, context);
        });
        test('throws on undefined.', () => {
            try{
                assertIsNumber(undefined, numberName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on null.', () => {
            try{
                assertIsNumber(null, numberName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on string.', () => {
            try{
                assertIsNumber('string', numberName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
    });

    describe('assertIsSupported() behaves as expected', () => {
        const optionName = 'nuberName';
        const context = 'test';
        test('returns normal on option.', () => {
            assertIsSupported('option', optionName, context);
        });
        test('throws on null.', () => {
            try{
                assertIsSupported(null, optionName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
        test('throws on undefined.', () => {
            try{
                assertIsSupported(undefined, optionName, context);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
    });
    describe('assertIsValid() behaves as expected', () => {
        const config = 'config';
        const description = 'because something happened.';
        test('returns normal on true.', () => {
            assertIsValid(true, config, description);
        });
        test('throws on false.', () => {
            try{
                assertIsValid(false, config, description);
                expect(false).toEqual('Should have thrown.');
            } catch(error) {
                expect(error.message).toMatchSnapshot();
            }
        });
    });
});