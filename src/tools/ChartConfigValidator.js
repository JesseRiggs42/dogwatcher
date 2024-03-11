import {
    assertIsBoolean,
    assertIsDefinedNotNull,
    assertIsNumber,
    assertIsNumericArray,
    assertIsString,
    assertIsStringArray,
    assertIsSupported,
    assertIsValid,
    assertNonEmptyString,
} from './ValidationTools';

import {
    ARC,
    BACKGROUNDCOLOR,
    BAR,
    BARTHICKNESS,
    BORDERCOLOR,
    BORDERRADIUS,
    BORDERSKIPPED,
    BORDERWIDTH,
    CHART_CONFIG_VALIDATE,
    CONTEXT,
    DATA,
    DATASETS,
    DISPLAY,
    DRAWACTIVEELEMENTSONTOP,
    ELEMENTS,
    FILL,
    HEIGHT,
    INDEXAXIS,
    LABEL,
    LABELS,
    LEGEND,
    LINE,
    ORI_HORIZONTLE,
    ORI_VERTICLE,
    OPTIONS,
    PLUGINS,
    POINTBACKGROUNDCOLOR,
    POINTBORDERWIDTH,
    POINTHITRADIUS,
    POINTHOVERRADIUS,
    POINTRADIUS,
    POSITION,
    POSITION_TOP,
    POSITION_BOTTOM,
    POSITION_LEFT,
    POSITION_RIGHT,
    RESPONSIVE,
    SCALES,
    STACKED,
    STYLE,
    TEXT,
    TITLE,
    TYPE,
    WIDTH,
    X,
    Y,
} from '../constants/ChartConstants';

// Descend down the configuration and assert each node and leave follows some rule.
function validate(ChartConfig) {
    try{
        const { data, options, style, type } = ChartConfig;
        validateData(data);
        validateOptions(options);
        validateStyle(style);
        assertNonEmptyString(type, TYPE, CHART_CONFIG_VALIDATE);    
    } catch(error) {
        assertIsValid(false, 'ChartConfig', error.message);
    }
}

function validateData(data) {

    assertIsDefinedNotNull(data[LABELS], LABELS, CONTEXT);
    assertIsDefinedNotNull(data[DATASETS], DATASETS, CONTEXT);

    Object.keys(data).forEach(configKey => {
        const configValue = data[configKey];
        switch(configKey) {
            case LABELS:
                assertIsStringArray(configValue, configKey, CONTEXT);
                break;
            case DATASETS:
                validateDatasets(configValue);
                break;
            default:
                assertIsSupported(false, configKey, CONTEXT);
        }
    });
}

function validateDatasets(datasets) {
    datasets.forEach(set => {
        Object.keys(set).forEach(optionKey => {
            const optionValue = set[optionKey];
            switch(optionKey) {
                case DATA:
                    assertIsNumericArray(optionValue, optionKey, DATASETS);
                    break;
                case DRAWACTIVEELEMENTSONTOP:
                case FILL:
                    assertIsBoolean(optionValue, optionKey, DATASETS);
                    break;
                case BACKGROUNDCOLOR:
                case BORDERCOLOR:
                case POINTBACKGROUNDCOLOR:
                    if(Array.isArray(optionValue)) {
                        assertIsStringArray(optionValue, optionKey, DATASETS);
                        break;
                    }
                    // else it could be a string so let fall through.
                case LABEL:
                case TYPE:
                    assertIsString(optionValue, optionKey, DATASETS);
                    break;
                case BARTHICKNESS:
                case BORDERRADIUS:
                case BORDERWIDTH:
                case POINTBORDERWIDTH:
                case POINTHITRADIUS:
                case POINTHOVERRADIUS:
                case POINTRADIUS:
                    assertIsNumber(optionValue, optionKey, DATASETS);
                    break;
                default: 
            }
        });
    });
}

function validateOptions(options) {
    assertIsDefinedNotNull(options, OPTIONS, 'validateOptions()');
    const { indexAxis, elements, plugins, responsive, scales } = options;

    if(indexAxis) {
        switch(indexAxis) {
            case ORI_HORIZONTLE:
            case ORI_VERTICLE:
                break;
            default:
                assertIsSupported(false, indexAxis, INDEXAXIS);            
        }
    }

    if(elements) {
        validateElements(elements);
    }

    if(plugins) {
        validatePlugins(plugins);
    }

    if(responsive) {
        assertIsBoolean(responsive, RESPONSIVE, OPTIONS);
    }

    if(scales) {
        validateScales(scales);
    }
}

function validateScales(scales) {
    Object.keys(scales).forEach(scaleKey => {
        const scale = scales[scaleKey];
        switch(scaleKey) {
            case X:
            case Y:
                validateScale(scale);
                break;
            default:
                assertIsSupported(false, scaleKey, SCALES);
        }
    });
}

function validateScale(scale) {
    Object.keys(scale).forEach(config => {
        const configVal = scale[config];
        switch(config) {
            case STACKED:
                assertIsBoolean(configVal, config, SCALES);
                break;
            case BARTHICKNESS:
                assertIsNumber(configVal, config, SCALES);
                break;
            default:
                assertIsSupported(false, config, SCALES);
        }
    });
}

function validateElements(elements) {
    Object.keys(elements).forEach( elementKey => {
        let element = elements[elementKey];
        switch(elementKey) {
            case LINE:
            case BAR:
            case ARC:
                validateElement(element, elementKey);
                break;
            default:
                assertIsSupported(false, elementKey, ELEMENTS);
        }
    });
}

function validateElement(element, elementKey) {
    Object.keys(element).forEach(option => {
        let optionVal = element[option];
        switch(option) {
            case BORDERWIDTH:
            case BORDERRADIUS:
                assertIsNumber(optionVal, option, elementKey);
                break;
            case BORDERSKIPPED:
                assertIsBoolean(optionVal, option, elementKey);
                break;
            default:
                assertIsSupported(false, option, elementKey);
        }
    });
}

function validatePlugins(plugins) {
    Object.keys(plugins).forEach(pluginKey => {
        const plugin = plugins[pluginKey];
        switch(pluginKey) {
            case LEGEND:
            case TITLE:
                validatePlugin(plugin, pluginKey)
                break;
            default:
                assertIsSupported(false, pluginKey, PLUGINS);
        }
    });
}

function validatePlugin(plugin, pluginKey) {
    Object.keys(plugin).forEach(option => {
        const optionValue = plugin[option];
        switch(option) {
            case POSITION:
                switch(optionValue) {
                    case POSITION_TOP:
                        break;
                    case POSITION_BOTTOM:
                        break;
                    case POSITION_LEFT:
                        break;
                    case POSITION_RIGHT:
                        break;
                    default:
                        assertIsSupported(false, optionValue, option);
                }
                break;
            case DISPLAY:
                assertIsBoolean(optionValue, option, pluginKey);
                break;
            case TEXT:
                assertIsString(optionValue, option, pluginKey);
                break;
            default:
                assertIsSupported(false, option, pluginKey);
        }
    });
}

function validateStyle(style) {
    Object.keys(style).forEach(config => {
        const configValue = style[config];
        switch(config) {
            case HEIGHT:
            case WIDTH:
                assertIsNumber(configValue);
                break;
            default:
                assertIsSupported(false, config, STYLE);
        }
    });
}

export{
    validate,
    validateData,
    validateDatasets,
    validateOptions,
    validateScales,
    validateScale,
    validateElements,
    validatePlugins,
    validatePlugin,
    validateStyle,
}