
function populateCharts() {
    axisSettings = {
        gridLines: {
            drawOnChartArea: false,
            color: 'rgb(251, 136, 131)'
        },
        scaleLabel: {
            display: true,
            fontFamily: "'Josefin Slab', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontSize: 20
        },
        ticks: {
            fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif"
        }
    }
    Chart.scaleService.updateScaleDefaults('linear', axisSettings)
    Chart.scaleService.updateScaleDefaults('category', axisSettings)
    getStateDistributionData(buildStateDistributionChart)
    getSolvingData([buildTimeScatterChart])
}


function getStateDistributionData(callback) {
    $.get('/api/data/states').then(callback)
}

function getSolvingData(callbacks) {
    $.get('/api/data/solve').then(data => callbacks.forEach(c => c(data)))
}


function buildStateDistributionChart(rawData) {

    let ctx = document.getElementById('statesChart').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: Object.keys(rawData),
            datasets: [{
                data: Object.values(rawData), 
                borderColor: 'rgb(227, 27, 38)'
            }]
        },

        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        labelString: 'States',
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        labelString: 'Number of Moves from Solution',
                    }
                }]
            }
        }

    });

}

function buildTimeScatterChart(rawData) {
    compexities = Object.keys(rawData)
    treeData = compexities.map(c => {return {x:c, y:rawData[c]['tree']['time']}})
    aStarData = compexities.map(c => {return {x:c, y:rawData[c]['a_star']['time']}})
    greedyData = compexities.map(c => {return {x:c, y:rawData[c]['greedy']['time']}})

    let ctx = document.getElementById('timeChart').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'scatter',

        data: {
            datasets: [{
                label: 'Greedy Algoritm',
                fill: false,
                showLine: false,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgb(0, 0, 0)',
                pointStyle: 'rect',
                radius: 4,
                data: greedyData
            }, {
                label: 'A* Algoritm',
                fill: false,
                showLine: false,
                borderColor: 'rgb(227, 27, 38)',
                pointStyle: 'circle',
                radius: 4,
                data: aStarData
            }, {
                label: 'Machine Learning',
                fill: false,
                showLine: false,
                borderColor: 'rgb(227, 27, 38)',
                backgroundColor: 'rgb(227, 27, 38)',
                pointStyle: 'star',
                radius: 4,
                data: treeData
            }]
        },

        options: {
            legend: {
                position: 'bottom',
                labels: {
                    fontFamily: "'Open Sans', 'Helvetica', 'Arial', sans-serif",
                    fontSize: 15,
                    usePointStyle: true,
                    padding: 30
                }
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    scaleLabel: {
                        labelString: 'Time (ms)',
                    }
                }],
                xAxes: [{
                    type: 'linear',
                    display: 'bottom',
                    scaleLabel: {
                        labelString: 'Number of Moves from Solution',
                    }
                }]
            }
        }

    });
}