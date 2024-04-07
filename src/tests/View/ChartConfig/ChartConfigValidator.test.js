import * as Consts from '../../../constants/ChartConstants';
import * as ValidationTools from '../../../tools/ValidationTools';
import Validator from '../../../tools/ChartConfigValidator';
import { getConfig } from './testdata';
import { Legend } from 'chart.js';

describe('ChartConfigValidator behaves as expected.', () => {
    describe('succeeds on valid inputs for:', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
        test('validate()', () => {
            // set mocks for this test.
            const assertNonEmptyString = jest.spyOn(ValidationTools, 'assertNonEmptyString').mockReturnValue(null);
            const validateData = jest.spyOn(Validator, 'validateData').mockReturnValue(null);
            const validateOptions = jest.spyOn(Validator, 'validateOptions').mockReturnValue(null);
            const validateStyle = jest.spyOn(Validator, 'validateStyle').mockReturnValue(null);

            const config = getConfig('');
            Validator.validate(config);

            expect(assertNonEmptyString).toBeCalledWith(config.type, Consts.TYPE, Consts.CHART_CONFIG_VALIDATE);
            expect(validateData).toBeCalledWith(config.data);
            expect(validateOptions).toBeCalledWith(config.options);
            expect(validateStyle).toBeCalledWith(config.style);
        });
        test('validateData()', () => {
            // set mocks for this test.
            const assertIsStringArray = jest.spyOn(ValidationTools, 'assertIsStringArray').mockReturnValue(null);
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            const validateDatasets = jest.spyOn(Validator, 'validateDatasets').mockReturnValue(null);

            const data = getConfig(Consts.DATA);
            const INVALID_OPTION = 'invalidOption';
            data[INVALID_OPTION] = 'invalid';
            Validator.validateData(data);

            expect(assertIsStringArray).toBeCalledWith(data.labels, Consts.LABELS, Consts.CONTEXT);
            expect(assertIsSupported).toBeCalledWith(false, INVALID_OPTION, Consts.CONTEXT);
            expect(validateDatasets).toBeCalledWith(data.datasets);
        });
        test('validateOptions()', () => {
            // set mocks for this test.
            const assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
            const assertIsDefinedNotNull = jest.spyOn(ValidationTools, 'assertIsDefinedNotNull').mockReturnValue(null);
            const validateElements = jest.spyOn(Validator, 'validateElements').mockReturnValue(null);
            const validatePlugins = jest.spyOn(Validator, 'validatePlugins').mockReturnValue(null);
            const validateScales = jest.spyOn(Validator, 'validateScales').mockReturnValue(null);

            const options = getConfig(Consts.OPTIONS);
            Validator.validateOptions(options);

            expect(assertIsBoolean).toBeCalledWith(options.responsive, Consts.RESPONSIVE, Consts.OPTIONS);
            expect(assertIsDefinedNotNull).toBeCalledWith(options, Consts.OPTIONS, Consts.CHART_CONFIG_VALIDATE_OPTIONS);
            expect(validateElements).toBeCalledWith(options.elements);
            expect(validatePlugins).toBeCalledWith(options.plugins);
            expect(validateScales).toBeCalledWith(options.scales);
        });
        test('validateStyle()', () => {
            // set mocks for this test.
            const assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);

            const style = getConfig(Consts.STYLE);
            style.invalidStyle = 'invalidStyle';
            Validator.validateStyle(style);

            expect(assertIsNumber).toBeCalledWith(350, Consts.HEIGHT, Consts.STYLE);
            expect(assertIsNumber).toBeCalledWith(750, Consts.WIDTH, Consts.STYLE);
            expect(assertIsSupported).toBeCalledWith(false, style.invalidStyle, Consts.STYLE);
        });
        // validateDatasets
        test('validateDatasets()', () => {
            // set mocks for this test.
            const assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
            const assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
            const assertIsNumericArray = jest.spyOn(ValidationTools, 'assertIsNumericArray').mockReturnValue(null);
            const assertIsString = jest.spyOn(ValidationTools, 'assertIsString').mockReturnValue(null);
            const assertIsStringArray = jest.spyOn(ValidationTools, 'assertIsStringArray').mockReturnValue(null);
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);

            const dataSets = getConfig(`${Consts.DATA}.${Consts.DATASETS}`);
            dataSets[0].invalidOption = 'invalidOption';
            Validator.validateDatasets(dataSets);

            // assertIsBoolean
            expect(assertIsBoolean).toBeCalledWith( false, Consts.FILL, Consts.DATASETS);
            expect(assertIsBoolean).toBeCalledWith( true,  Consts.FILL, Consts.DATASETS);
            expect(assertIsBoolean).toBeCalledWith( true,  Consts.DRAWACTIVEELEMENTSONTOP, Consts.DATASETS);
            // assertIsNumber
            expect(assertIsNumber).toBeCalledWith( 0, Consts.BORDERWIDTH, Consts.DATASETS);
            expect(assertIsNumber).toBeCalledWith( 3, Consts.POINTBORDERWIDTH, Consts.DATASETS);
            expect(assertIsNumber).toBeCalledWith(30, Consts.POINTHITRADIUS, Consts.DATASETS);
            expect(assertIsNumber).toBeCalledWith(20, Consts.POINTHOVERRADIUS, Consts.DATASETS);
            expect(assertIsNumber).toBeCalledWith(10, Consts.POINTRADIUS, Consts.DATASETS);
            // assertIsNumericArray
            expect(assertIsNumericArray).toBeCalledWith(dataSets[0][Consts.DATA], Consts.DATA, Consts.DATASETS);
            // assertIsString
            expect(assertIsString).toBeCalledWith(dataSets[0][Consts.LABEL], Consts.LABEL, Consts.DATASETS);
            expect(assertIsString).toBeCalledWith(dataSets[0][Consts.TYPE], Consts.TYPE, Consts.DATASETS);
            expect(assertIsString).toBeCalledWith(dataSets[1][Consts.BORDERCOLOR], Consts.BORDERCOLOR, Consts.DATASETS);
            expect(assertIsString).toBeCalledWith(dataSets[1][Consts.LABEL], Consts.LABEL, Consts.DATASETS);
            expect(assertIsString).toBeCalledWith(dataSets[2][Consts.BACKGROUNDCOLOR], Consts.BACKGROUNDCOLOR, Consts.DATASETS);
            expect(assertIsString).toBeCalledWith(dataSets[2][Consts.BORDERCOLOR], Consts.BORDERCOLOR, Consts.DATASETS);
            expect(assertIsString).toBeCalledWith(dataSets[2][Consts.LABEL], Consts.LABEL, Consts.DATASETS);
            // assertIsStringArray
            expect(assertIsStringArray).toBeCalledWith(dataSets[0][Consts.BORDERCOLOR], Consts.BORDERCOLOR, Consts.DATASETS);
            expect(assertIsStringArray).toBeCalledWith(dataSets[0][Consts.POINTBACKGROUNDCOLOR], Consts.POINTBACKGROUNDCOLOR, Consts.DATASETS);
            // assertIsSupported
            expect(assertIsSupported).toBeCalledWith(false, dataSets[0].invalidOption, Consts.DATASETS);

            // validate that empty array succeeds.
            Validator.validateDatasets([]);
        });
        // validateScales
        test('validateScales()', () => {
            // set mocks for this test.
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            const validateScale = jest.spyOn(Validator, 'validateScale').mockReturnValue(null);

            const scales = getConfig(`${Consts.OPTIONS}.${Consts.SCALES}`);
            scales.invalidScale = 'invalidScale';
            Validator.validateScales(scales);

            expect(validateScale).toBeCalledWith(scales[Consts.X]);
            expect(validateScale).toBeCalledWith(scales[Consts.Y]);
            expect(assertIsSupported).toBeCalledWith(false, scales.invalidScale, Consts.SCALES);
        });
        // validateScale
        test('validateScale()', () => {
            // set mocks for this test.
            const assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
            const assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);

            const { [Consts.X]:x, [Consts.Y]:y } = getConfig(`${Consts.OPTIONS}.${Consts.SCALES}`);
            x.invalidScale = 'invalidScale';

            Validator.validateScale(x);
            expect(assertIsBoolean).toBeCalledWith(true, Consts.STACKED, Consts.SCALES);
            expect(assertIsSupported).toBeCalledWith(false, x.invalidScale, Consts.SCALES);

            assertIsBoolean.mockClear();

            Validator.validateScale(y);
            expect(assertIsBoolean).toBeCalledWith(true, Consts.STACKED, Consts.SCALES);
            expect(assertIsNumber).toBeCalledWith(y[Consts.BARTHICKNESS], Consts.BARTHICKNESS, Consts.SCALES);
        });
        // validateElement
        test('validateElement()', () => {
            // set mocks for this test.
            const assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
            const assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);

            const element = getConfig(`${Consts.OPTIONS}.${Consts.ELEMENTS}.${Consts.BAR}`);
            element.invalidElement = 'invalidElement';
            Validator.validateElement(element,Consts.BAR);

            expect(assertIsBoolean).toBeCalledWith(element[Consts.BORDERSKIPPED], Consts.BORDERSKIPPED, Consts.BAR);
            expect(assertIsNumber).toBeCalledWith(element[Consts.BORDERWIDTH], Consts.BORDERWIDTH, Consts.BAR);
            expect(assertIsSupported).toBeCalledWith(false, element.invalidElement, Consts.BAR);
        });
        // validatePlugins
        test('validatePlugins()', () => {
            // set mocks for this test.
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            const validatePlugin = jest.spyOn(Validator, 'validatePlugin').mockReturnValue(null);

            const plugins = getConfig(`${Consts.OPTIONS}.${Consts.PLUGINS}`);
            plugins.invalidPlugin = 'invalidPlugin';
            Validator.validatePlugins(plugins);

            expect(assertIsSupported).toBeCalledWith(false, plugins.invalidPlugin, Consts.PLUGINS);
            expect(validatePlugin).toBeCalledWith(plugins[Consts.LEGEND], Consts.LEGEND);
            expect(validatePlugin).toBeCalledWith(plugins[Consts.TITLE], Consts.TITLE);
        });
        // validatePlugin
        test('validatePlugins()', () => {
            // set mocks for this test.
            const assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
            const assertIsString = jest.spyOn(ValidationTools, 'assertIsString').mockReturnValue(null);
            const assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);

            const {[Consts.LEGEND]:legend, [Consts.TITLE]:title} = getConfig(`${Consts.OPTIONS}.${Consts.PLUGINS}`);
            legend.invalidPlugin = 'invalidPlugin';

            Validator.validatePlugin(legend, Consts.LEGEND);
            expect(assertIsSupported).toBeCalledWith(false, legend.invalidPlugin, Consts.LEGEND);

            Validator.validatePlugin(title, Consts.TITLE);
            expect(assertIsBoolean).toBeCalledWith(title[Consts.DISPLAY], Consts.DISPLAY, Consts.TITLE);
            expect(assertIsString).toBeCalledWith(title[Consts.TEXT], Consts.TEXT, Consts.TITLE);
        });
        test('validate() on entire config', () => {
            const config = getConfig('');
            Validator.validate(config);
        });
    });
    describe('handles invalid inputs and errors for:', () => {
        describe('validate()', () => {
            let config;
            let validateData;
            let validateOptions;
            let validateStyle;
            beforeEach(() => {
                config = getConfig('');
                validateData = jest.spyOn(Validator, 'validateData').mockReturnValue(null);
                validateOptions = jest.spyOn(Validator, 'validateOptions').mockReturnValue(null);
                validateStyle = jest.spyOn(Validator, 'validateStyle').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on null type', () => {
                try {
                    config.type = null;
                    Validator.validate(config);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on empty type', () => {
                try {
                    config.type = '';
                    Validator.validate(config);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws new error on data error', () => {
                try {
                    validateData = jest.spyOn(Validator, 'validateData')
                        .mockImplementation(() => {throw new Error('data error')}); 
                    Validator.validate(config);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws new error on options error', () => {
                try {
                    validateOptions = jest.spyOn(Validator, 'validateOptions')
                        .mockImplementation(() => {throw new Error('options error')}); 
                    Validator.validate(config);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws new error on style error', () => {
                try {
                    validateStyle = jest.spyOn(Validator, 'validateStyle')
                        .mockImplementation(() => {throw new Error('style error')}); 
                    Validator.validate(config);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateData
        describe('validateData()', () => {
            let assertIsStringArray;
            let assertIsSupported;
            let data;
            let validateDatasets;
            beforeEach(() => {
                data = getConfig(Consts.DATA);

                assertIsStringArray = jest.spyOn(ValidationTools, 'assertIsStringArray').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
                validateDatasets = jest.spyOn(Validator, 'validateDatasets').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on null labels', () => {
                try {
                    data[Consts.LABELS] = null;
                    Validator.validateData(data);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid labels', () => {
                try {
                    assertIsStringArray.mockRestore();
                    data[Consts.LABELS] = ['1', 2, '3'];
                    Validator.validateData(data);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on null dataSets', () => {
                try {
                    data[Consts.DATASETS] = null;
                    Validator.validateData(data);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateDatasets
        describe('validateDatasets()', () => {
            let assertIsBoolean;
            let assertIsNumber;
            let assertIsNumericArray;
            let assertIsString;
            let assertIsStringArray;
            let assertIsSupported;
            let datasets;
            beforeEach(() => {
                datasets = getConfig(`${Consts.DATA}.${Consts.DATASETS}`);

                assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
                assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
                assertIsNumericArray = jest.spyOn(ValidationTools, 'assertIsNumericArray').mockReturnValue(null);
                assertIsString = jest.spyOn(ValidationTools, 'assertIsString').mockReturnValue(null);
                assertIsStringArray = jest.spyOn(ValidationTools, 'assertIsStringArray').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on null data', () => {
                datasets[0][Consts.DATA] = null;
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on null label', () => {
                datasets[0][Consts.LABEL] = null;
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid data', () => {
                datasets[0][Consts.DATA] = [1, 'two', 3];
                assertIsNumericArray.mockRestore();
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid booleans', () => {
                datasets[0][Consts.DRAWACTIVEELEMENTSONTOP] = 'two';
                assertIsBoolean.mockRestore();
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid string arrays', () => {
                datasets[0][Consts.BACKGROUNDCOLOR] = [1];
                assertIsStringArray.mockRestore();
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid strings', () => {
                datasets[0][Consts.LABEL] = [1];
                assertIsString.mockRestore();
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid numbers', () => {
                datasets[0][Consts.BARTHICKNESS] = 'one';
                assertIsNumber.mockRestore();
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid option', () => {
                datasets[0].InvalidOption = 'InvalidOption';
                assertIsSupported.mockRestore();
                try {
                    Validator.validateDatasets(datasets);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateOptions
        describe('validateOptions()', () => {
            let options;

            let assertIsBoolean;
            let assertIsDefinedNotNull;
            let assertIsSupported;
            let validateElements;
            let validatePlugins;
            let validateScales;
            beforeEach(() => {
                options = getConfig(Consts.OPTIONS);

                assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
                assertIsDefinedNotNull = jest.spyOn(ValidationTools, 'assertIsDefinedNotNull').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
                validateElements = jest.spyOn(Validator, 'validateElements').mockReturnValue(null);
                validatePlugins = jest.spyOn(Validator, 'validatePlugins').mockReturnValue(null);
                validateScales = jest.spyOn(Validator, 'validateScales').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid indexAxis', () => {
                options[Consts.INDEXAXIS] = 'InvalidIndexAxis';
                assertIsSupported.mockRestore();
                try {
                    Validator.validateOptions(options);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on null options', () => {
                options = null;
                assertIsDefinedNotNull.mockRestore();
                try {
                    Validator.validateOptions(options);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateScales
        describe('validateScales()', () => {
            let scales;

            let assertIsDefinedNotNull;
            let validateScale;
            beforeEach(() => {
                scales = getConfig(`${Consts.OPTIONS}.${Consts.SCALES}`);

                assertIsDefinedNotNull = jest.spyOn(ValidationTools, 'assertIsDefinedNotNull').mockReturnValue(null);
                validateScale = jest.spyOn(Validator, 'validateScale').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid option', () => {
                scales.z = 'invalidScale';
                assertIsDefinedNotNull.mockRestore();
                try {
                    Validator.validateScales(scales);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateScale
        describe('validateScale()', () => {
            let scaleY;

            let assertIsBoolean;
            let assertIsNumber;
            let assertIsSupported;
            beforeEach(() => {
                scaleY = getConfig(`${Consts.OPTIONS}.${Consts.SCALES}.${Consts.Y}`);

                assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
                assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid scale', () => {
                scaleY.invalidScale = 'invalidScale';
                assertIsSupported.mockRestore();
                try {
                    Validator.validateScale(scaleY);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid stacked', () => {
                scaleY[Consts.STACKED] = 'invalidBoolean';
                assertIsBoolean.mockRestore();
                try {
                    Validator.validateScale(scaleY);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid barthickness', () => {
                scaleY[Consts.BARTHICKNESS] = 'invalidBarthickness';
                assertIsNumber.mockRestore();
                try {
                    Validator.validateScale(scaleY);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateElements
        describe('validateElements()', () => {
            let elements;

            let validateElement;
            let assertIsSupported;
            beforeEach(() => {
                elements = getConfig(`${Consts.OPTIONS}.${Consts.ELEMENTS}`);

                validateElement = jest.spyOn(Validator, 'validateElement').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid element', () => {
                const invalidElement = 'invalidElement';
                elements[invalidElement] = invalidElement;
                assertIsSupported.mockRestore();
                try {
                    Validator.validateElements(elements);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateElement
        describe('validateElement()', () => {
            let element;

            let assertIsBoolean;
            let assertIsNumber;
            let assertIsSupported;
            beforeEach(() => {
                element = getConfig(`${Consts.OPTIONS}.${Consts.ELEMENTS}.${Consts.BAR}`);

                assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
                assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid option', () => {
                const invalidOption = 'invalidOption';
                element[invalidOption] = invalidOption;
                assertIsSupported.mockRestore();
                try {
                    Validator.validateElement(element, Consts.BAR);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid number', () => {
                element[Consts.BORDERWIDTH] = 'invalidNumber';
                assertIsNumber.mockRestore();
                try {
                    Validator.validateElement(element, Consts.BAR);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid number', () => {
                element[Consts.BORDERSKIPPED] = 'invalidBoolean';
                assertIsBoolean.mockRestore();
                try {
                    Validator.validateElement(element, Consts.BAR);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validatePlugins
        describe('validatePlugins()', () => {
            let plugins;

            let assertIsSupported;
            let validatePlugin;
            beforeEach(() => {
                plugins = getConfig(`${Consts.OPTIONS}.${Consts.PLUGINS}`);

                validatePlugin = jest.spyOn(Validator, 'validatePlugin').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid plugin', () => {
                const invalidPlugin = 'invalidPlugin';
                plugins[invalidPlugin] = invalidPlugin;
                assertIsSupported.mockRestore();
                try {
                    Validator.validatePlugins(plugins, Consts.PLUGINS);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validatePlugin
        describe('validatePlugin()', () => {
            let plugin;

            let assertIsBoolean;
            let assertIsString;
            let assertIsSupported;
            beforeEach(() => {
                plugin = getConfig(`${Consts.OPTIONS}.${Consts.PLUGINS}.${Consts.TITLE}`);

                assertIsBoolean = jest.spyOn(ValidationTools, 'assertIsBoolean').mockReturnValue(null);
                assertIsString = jest.spyOn(ValidationTools, 'assertIsString').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid option', () => {
                const invalidOption = 'invalidOption';
                plugin[invalidOption] = invalidOption;
                assertIsSupported.mockRestore();
                try {
                    Validator.validatePlugin(plugin, Consts.PLUGINS);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid display', () => {
                const invalidDisplay = 'invalidOption';
                plugin[Consts.DISPLAY] = invalidDisplay;
                assertIsBoolean.mockRestore();
                try {
                    Validator.validatePlugin(plugin, Consts.PLUGINS);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid position', () => {
                const invalidPosition = 'invalidOption';
                plugin[Consts.POSITION] = invalidPosition;
                assertIsSupported.mockRestore();
                try {
                    Validator.validatePlugin(plugin, Consts.PLUGINS);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid text', () => {
                const invalidText = 1234;
                plugin[Consts.TEXT] = invalidText;
                assertIsString.mockRestore();
                try {
                    Validator.validatePlugin(plugin, Consts.PLUGINS);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
        // validateStyle
        describe('validateStyle()', () => {
            let style;

            let assertIsNumber;
            let assertIsSupported;
            beforeEach(() => {
                style = getConfig(`${Consts.STYLE}`);

                assertIsNumber = jest.spyOn(ValidationTools, 'assertIsNumber').mockReturnValue(null);
                assertIsSupported = jest.spyOn(ValidationTools, 'assertIsSupported').mockReturnValue(null);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            test('throws on invalid option', () => {
                const invalidOption = 'invalidOption';
                style[invalidOption] = invalidOption;
                assertIsSupported.mockRestore();
                try {
                    Validator.validateStyle(style, Consts.STYLE);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
            test('throws on invalid height', () => {
                style[Consts.HEIGHT] = 'InvalidHeight';
                assertIsNumber.mockRestore();
                try {
                    Validator.validateStyle(style, Consts.STYLE);
                    expect(false).toEqual('should throw');
                } catch(error) {
                    expect(error.message).toMatchSnapshot();
                }
            });
        });
    });
});
