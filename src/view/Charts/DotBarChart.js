/**
 * This script registers Chart modules so they don't get pruned during tree shaking.
 */
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class DotBarChart extends Component {

    constructor(labels, dotPoints, barPoints, offsetPoints, selectedIndex) {

        super();
        this.labels = labels;
        this.dotList = this.transformDots(dotPoints);
        this.barList = this.transformBars(barPoints);
        this.offsetList = this.transformOffsets(offsetPoints);
        this.selectedIndex = selectedIndex;

        let dotBisection = [];
        for(let i = 0; i < dotPoints.length; i++) {
            dotBisection.push(dotPoints[selectedIndex]);
        }
        this.selectedDotBisection = this.translateDotBisection(dotBisection, labels[selectedIndex]);

    }

    render() {
        return <Bar
            style={chartStyle}
            data={{
                labels: this.labels,
                datasets: [
                    this.dotList,
                    this.offsetList,
                    this.barList,
                ]
            }}
            options={chartOptions}
        />
    }

    static transformDots(dots) {
        return {
            label: dots.label,
            data: dots.data,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 0,
            drawActiveElementsOnTop: "true",
            pointBackgroundColor: "rgba(75,192,192,0.5)",
            pointBorderWidth: 3,
            pointHitRadius: 30,
            pointHoverRadius: 20,
            pointRadius: 10,
            type: 'line'
        };
    }

    static transformBars(bars) {
        return {
            label: bars.label,
            data: bars.data,
            fill: true,
            backgroundColor: "rgba(192,192,75,0.2)",
            borderColor: "rgba(192,192,75,1)",
            borderRadius: Number.MAX_VALUE,
            barThickness: 8,
        }
    }

    static transformOffsets(offsets) {
        return {
            label: offsets.label,
            data: offsets.data,
            barThickness: 8,
            fill: false,
            borderColor: "rgba(192,192,192,0.25)"
        }
    }

    static transformDotBisection(dotBisections, label) {
        return {
            label: label,
            data: dotBisections,
            fill: false,
            borderColor: "rgba(192,192,192,0.5)",
            borderWidth: 2,
            pointBorderWidth: 0,
            type: 'line'
        };
    }

}
