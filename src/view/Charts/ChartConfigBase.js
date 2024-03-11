import { plugins } from 'chart.js';
import {
    assertIsString,
    assertIsStringArray,
} from '../../tools/ValidationTools';
import {
    BARTHICKNESS,
    BORDERRADIUS,
    BORDERSKIPPED,
    BORDERWIDTH,
    DATA,
    DATASETS,
    DISPLAY,
    ELEMENTS,
    HEIGHT,
    INDEXAXIS,
    LABELS,
    LEGEND,
    ORI_HORIZONTLE,
    ORI_VERTICLE,
    OPTIONS,
    PLUGINS,
    POSITION,
    POSITION_TOP,
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
} from '../../constants/ChartConstants';

export default class ChartConfigBase {
    // colors as array https://stackoverflow.com/questions/25594478/different-color-for-each-bar-in-a-bar-chart-chartjs
    constructor(title, type, labels, width, height, isHorizontle) {
        this.datasets = [];
        this.height = height;
        this.horizontle = isHorizontle;
        this.labels = labels;
        this.responsive = true;
        this.title = title;
        this.type = type;
        this.width = width;

        assertIsStringArray(labels, LABELS, this.constructor.name);
        assertIsString(title, TITLE, this.constructor.name);
    }

    // This is the final step. Unless overridden, this will return the same structure of agregated data.
    // The idea being that all decorations will return their own parts concatenated with the parts of their decorated.
    // This should only be called from the highest level.
    getConfig() {
        return {
            [TYPE]    : this.getType(),
            [OPTIONS] : this.getOptions(),
            [DATA]    : this.getData(),
            [STYLE]   : this.getStyle(),
        }
    }

    getData() {
        return {
            [LABELS]  : this.getLabels(),
            [DATASETS]: this.getDatasets(),
        };
    }

    getDatasets() {
        return this.datasets;
    }

    getElements() {
        return {
            bar: {
                [BORDERWIDTH]  : 2,
                [BORDERSKIPPED]: false,
                [BORDERRADIUS] : Number.MAX_VALUE,
            }
        };
    }

    getHeight() {
        return this.height;
    }

    getOptions() {
        return {
            [INDEXAXIS]   : this.isHorizontle() ? ORI_HORIZONTLE : ORI_VERTICLE,
            [ELEMENTS]    : this.getElements(),
            [PLUGINS]     : this.getPlugins(),
            [RESPONSIVE]  : this.isResponsive(),
            [SCALES]      : this.getScales()
        };
    }

    getLabels() {
        return this.labels;
    }

    getPlugins() {
        return {
            [LEGEND]: {
                [POSITION]: POSITION_TOP,
            },
            [TITLE]: {
                [DISPLAY] : true,
                [TEXT]    : this.title
            }
        };
    }

    getScales() {
        return {
            [X]: {
                [STACKED]: true,
            },
            [Y]: {
                [BARTHICKNESS]: 0.1,
                [STACKED]     : true,
            }
        }
    }

    getStyle() {
        return {
            [WIDTH]   : this.getWidth() ?? 750,
            [HEIGHT]  : this.getHeight() ?? 350,
        };
    }
    
    getTitle() {
        return this.title;
    }

    getType() {
        return this.type;
    }

    getWidth() {
        return this.width;
    }

    isHorizontle() {
        return this.horizontle;
    }

    isResponsive() {
        return this.responsive;
    }

}
