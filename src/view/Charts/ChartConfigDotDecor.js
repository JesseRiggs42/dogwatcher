import ChartConfigDecorator from './ChartConfigDecorator';
import {
    CYAN_SOLID,
    CYAN_TRANSPARENT
} from '../../constants/Styles';

export default class ChartConfigDotDecor extends ChartConfigDecorator {
    constructor(chartConfig, type, dataSet) {
        super(chartConfig, type);
        this.dataSet = dataSet;
    }

    getDataset(styleFunction) {
        let styleBackground = styleFunction(this.dataSet.length, YELLOW_TRANSPARENT);
        let styleBorder = styleFunction(this.dataSet.length, YELLOW_SOLID);
        return this.configDots(this.dataSet, styleBackground, styleBorder);
    }

    static configDots(dots, styleBackground, styleBorder) {
        return {
            borderColor: styleBorder ?? CYAN_SOLID,
            borderWidth: 0,
            data: dots.data,
            drawActiveElementsOnTop: 'true',
            fill: false,
            label: dots.label,
            pointBackgroundColor: styleBackground ?? CYAN_TRANSPARENT,
            pointBorderWidth: 3,
            pointHitRadius: 30,
            pointHoverRadius: 20,
            pointRadius: 10,
            type: 'line'
        };
    }
}