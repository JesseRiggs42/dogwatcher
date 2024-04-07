const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Average",
            data: [35.5, 65.5, 92.5, 46, 71, 76],
            fill: false,
            borderColor: ["rgba(75,192,192,1)","rgba(75,192,192,1)","rgba(75,192,192,1)","rgba(192,75,75,1)","rgba(75,192,192,1)","rgba(75,192,192,1)"],
            borderWidth: 0,
            drawActiveElementsOnTop: true,
            pointBackgroundColor: ["rgba(75,192,192,0.5)","rgba(75,192,192,0.5)","rgba(75,192,192,0.5)","rgba(192,75,75,0.5)","rgba(75,192,192,0.5)","rgba(75,192,192,0.5)"],
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
            label: "Standard Deviation",
            data: [5, 25, 15, 10, 54, 2],
            fill: true,
            backgroundColor: "rgba(192,192,75,0.2)",
            borderColor: "rgba(192,192,75,1)",
            borderRadius: Number.MAX_VALUE,
            barThickness: 8,
        },
    ],
};

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
            borderSkipped: false,
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

const style = {
    width: 750,
    height: 350,
};

const type = 'ChartType';

const config = {
    data: data,
    options: options,
    style: style,
    type: type
}

function getConfig(path) {

    let retNode = config;

    const nodes = !path ? [] : path.split('.');
    nodes.forEach(nodeName => {
        retNode = retNode[nodeName];
        if(!retNode){
            throw new Error(`Could not find node "${nodeName}" in path "${path}."`);
        }
    });
 
    return JSON.parse(JSON.stringify(retNode));
}

export { getConfig };