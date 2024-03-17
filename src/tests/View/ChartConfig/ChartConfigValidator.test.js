import * as Consts from '../../../constants/ChartConstants';
import * as ValidationTools from '../../../tools/ValidationTools';
import Validator from '../../../tools/ChartConfigValidator';

describe('ChartConfigValidator behaves as expected.', () => {
    describe('succeeds on valid inputs for:', () => {
        test('validate()', () => {
            const assertNonEmptyString = jest.spyOn(ValidationTools, 'assertNonEmptyString').mockReturnValue(null);
            const validateData = jest.spyOn(Validator, 'validateData').mockReturnValue(null);
            const validateOptions = jest.spyOn(Validator, 'validateOptions').mockReturnValue(null);
            const validateStyle = jest.spyOn(Validator, 'validateStyle').mockReturnValue(null);
            Validator.validate({ data:'_data', options:'_options', style:'_style', type:'_type' });
            expect(assertNonEmptyString).toBeCalledWith('_type', Consts.TYPE, Consts.CHART_CONFIG_VALIDATE);
            expect(validateData).toBeCalledWith('_data');
            expect(validateOptions).toBeCalledWith('_options');
            expect(validateStyle).toBeCalledWith('_style');
            assertNonEmptyString.mockRestore();
        });
    });
    describe('handles invalid inputs and errors for:', () => {
        describe('validate()', () => {
            // const assertNonEmptyString = jest.spyOn(ValidationTools, 'assertNonEmptyString').mockReturnValue(null);
            const validateData = jest.spyOn(Validator, 'validateData').mockReturnValue(null);
            const validateOptions = jest.spyOn(Validator, 'validateOptions').mockReturnValue(null);
            const validateStyle = jest.spyOn(Validator, 'validateStyle').mockReturnValue(null);
            test('throws on empty type', () => {
                try {
                    Validator.validate({ data:'_data', options:'_options', style:'_style', type:null });
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
    });
});