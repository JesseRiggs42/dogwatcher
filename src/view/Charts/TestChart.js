/* OK, this is kinda dumb. In order for react-cartjs-2 to work, chart.js registerables must first be registered. The
 * devs at chart.js made this script to do that. But, now I have an unused import, so I'm supressing the warnings. This
 * should be fixed when the chart/react hipsters fix their problems. ;)
 */
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Component, React } from "react";
import { Bar } from "react-chartjs-2";

const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Average",
            data: [35.5, 65.5, 92.5, 46, 71, 76],
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
        },
        {
            label: "",
            data: [33, 53, 85, 41, 44, 75],
            barThickness: 8,
            fill: false,
            borderColor: "rgba(192,192,192,0.25)"
        },
        {
            label: "Standart Deviation",
            data: [5, 25, 15, 10, 54, 2],
            fill: true,
            backgroundColor: "rgba(192,192,75,0.2)",
            borderColor: "rgba(192,192,75,1)",
            borderRadius: Number.MAX_VALUE,
            barThickness: 8,
        },
    ],
};

const chartOptions = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
            borderSkipped: 'false',
            borderRadius: Number.MAX_VALUE,
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
        }
    },
    responsive: true,
    scales: {
        x: {
              stacked: true,
        },
        y   : {
            barThickness: 0.1,
            stacked: true,
        }
    }
};

const chartStyle={
    width: 750,
    height: 350,
};

// console.log(chartData.datasets[0].data.length);

export default class TestChart extends Component {
    render() {
        return <div className="chart-container">
        <Bar
            style={chartStyle}
            data={chartData}
            options={chartOptions}
        />
      </div>
    }
}