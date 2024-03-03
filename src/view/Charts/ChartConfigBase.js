import { assertIsBoolean, assertNonEmptyString, assertIsStringArray, assertIsNumericArray } from '../../tools/ValidationTools';

export default class ChartConfigBase {
    // colors as array https://stackoverflow.com/questions/25594478/different-color-for-each-bar-in-a-bar-chart-chartjs
    constructor(title, type, labels, width, height, isHorizontle) {
        this.dataSet = [];
        this.height = height;
        this.horizontle = isHorizontle;
        this.labels = labels;
        this.responsive = true;
        this.title = title;
        this.type = type;
        this.width = width;
    }

    getConfig() {
        return {
            type: this.getType(),
            options: this.getOptions(),
            data: this.getDataSets(),
            style: this.getStyle(),
        }
    }

    getDataSets() {
        return this.dataSet;
    }

    getElements() {
        return {
            bar: {
                borderWidth: 2,
                borderSkipped: 'false',
                borderRadius: Number.MAX_VALUE,
            }
        };
    }

    getHeight() {
        return this.height;
    }

    getOptions() {
        return {
            indexAxis: this.isHorizontle() ? 'y' : 'x',
            elements: this.getElements(),
            plugins: this.getPlugins(),
            responsive: this.isResponsive(),
            scales: this.getScales()
        };
    }

    getLabels() {
        return this.labels;
    }

    getPlugins() {
        return {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: this.title
            }
        };
    }

    getScales() {
        return {
            x: {
                stacked: true,
            },
            y: {
                barThickness: 0.1,
                stacked: true,
            }
        }
    }

    getStyle() {
        return {
            width: this.getWidth() ?? 750,
            height: this.getHeight() ?? 350,
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

    validate() {
        assertNonEmptyString(this.getTitle(), 'Title');
        assertNonEmptyString(this.getType(), 'Type');
        assertIsBoolean(this.isHorizontle(), 'isHorizontle');
        assertIsStringArray(this.getLabels(), 'Labels');
        assertIsBoolean(this.isResponsive(), 'isResponsive');
        this.validateDataset();
    }

    validateDataset() {
        assert(!!this.dataSet, `Dataset must be defined and non-null, found "${typeof(this.dataSet)}".`)
        assertIsNumericArray(this.dataSet.data);
    }
}
