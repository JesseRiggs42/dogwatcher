import ChartConfigBase from './ChartConfigBase';

export default class ChartConfigDecorator extends ChartConfigBase {
    constructor(chartConfig, type) {
        this.chartConfig = chartConfig;
        this.dataSet = [];
        this.type = type;
    }

    getDatasets(styleFunction) {
        let baseData = this.chartConfig.getDataSets(styleFunction);
        baseData.push(this.getDatatset());
        return baseData;
    }

    getDatatset() {
        return this.dataSet;
    }

    getElements() {
        return this.chartConfig.getConfig();
    }

    getHeight() {
        return this.chartConfig.getHeight();
    }

    getLabels() {
        return this.chartConfig.getLabels();
    }

    getPlugins() {
        return this.chartConfig.getPlugins();
    }

    getScales() {
        return this.chartConfig.getScales();
    }

    getStyle() {
        return this.chartConfig.getStyle();
    }
    
    getTitle() {
        return this.chartConfig.getTitle();
    }

    getType() {
        return this.type ?? this.chartConfig.getType();
    }

    getWidth() {
        return this.chartConfig.getWidth();
    }

    isHorizontle() {
        return this.chartConfig.isHorizontle();
    }

    isResponsive() {
        return this.chartConfig.isResponsive();
    }

}