import ChartConfigDecorator from './ChartConfigDecorator';
import {
    GRAY_TRANSPARENT
} from '../../constants/Styles';

export default class ChartConfigDotDecor extends ChartConfigDecorator {
    constructor(chartConfig, type, dataSet) {
        super(chartConfig, type);
        this.dataSet = dataSet;
    }

    getDataset() {
        return this.configBisection(this.dataSet);
    }

    static configBisection(bisection) {
        return {
            barThickness: 8,
            borderColor: GRAY_TRANSPARENT,
            data: bisection.data,
            fill: false,
            label: bisection.label,
            type: 'line'
        }
    }
}