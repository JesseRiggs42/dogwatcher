import ChartConfigDecorator from './ChartConfigDecorator';
import {
    YELLOW_SOLID,
    YELLOW_TRANSPARENT,
} from '../../constants/Styles';
import {
    BACKGROUNDCOLOR,
    BARTHICKNESS,
    BORDERCOLOR,
    BORDERRADIUS,
    DATA,
    FILL,
    LABEL,
} from '../../constants/ChartConstants';

export default class ChartConfigDotDecor extends ChartConfigDecorator {
    constructor(chartConfig, type, dataSet) {
        super(chartConfig, type);
        this.dataSet = dataSet;
    }

    getDataset(styleFunction) {
        let styleBackground = styleFunction(this.dataSet.length, YELLOW_TRANSPARENT);
        let styleBorder = styleFunction(this.dataSet.length, YELLOW_SOLID);
        return this.configBars(this.dataSet, styleBackground, styleBorder);
    }

    static configBars(bars, styleBackground, styleBorder) {
        return {
            [BARTHICKNESS]    : 8,
            [BACKGROUNDCOLOR] : styleBackground ?? YELLOW_TRANSPARENT,
            [BORDERCOLOR]     : styleBorder ?? YELLOW_SOLID,
            [BORDERRADIUS]    : Number.MAX_VALUE,
            [DATA]            : bars.data,
            [FILL]            : true,
            [LABEL]           : bars.label,
        }
    }
}