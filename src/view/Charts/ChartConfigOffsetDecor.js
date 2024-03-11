import ChartConfigDecorator from './ChartConfigDecorator';
import {
    GRAY_THIN_TRANSPARENT
} from '../../constants/Styles';

export default class ChartConfigDotDecor extends ChartConfigDecorator {
    constructor(chartConfig, type, dataSet) {
        super(chartConfig, type);
        this.dataSet = dataSet;
    }

    getDataset() {
        return this.configOffsets(this.dataSet);
    }

    static configOffsets(offsets) {
        return {
            barThickness: 8,
            borderColor: GRAY_THIN_TRANSPARENT,
            data: offsets.data,
            fill: false,
            label: offsets.label,
        }
    }
}