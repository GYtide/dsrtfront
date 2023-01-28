export function re1Dview(padom, timearray,dataarray) {
    padom.textContent = ''
    var speChart = echarts.init(padom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var speChartoption;
    let valueData = []
    let pixelnum = dataarray.length/timearray.length
    for (let j = 0; j < pixelnum; ++j) {
        for (let i = 0; i < timearray.length; ++i) {
            valueData.push([i, j, dataarray[j * timearray.length + i]])
        }
    }
    let time = +new Date(2022, 0, 1);

    const timeData = [];
    const freData = [];
    for (let i = 0; i < timearray.length; ++i) {
        timeData.push(
            echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time + timearray[i] * 1000, false)
        );
    }
    const upColor = '#00da3c';
    const downColor = '#ec0000';
    speChartoption = {
        title: {
            text: '一维投影概图',
            left: 10
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: true
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            axisPointer: {
                // type: 'cross'
            },
            borderWidth: 1,
            borderColor: '#ccc',
            // padding: 10,
            textStyle: {
                color: '#000'
            },
        },
        grid: {
            bottom: 90
        },
        dataZoom: [
            {
                type: 'inside'
            },
            {
                type: 'slider',
                showDataShadow: false,
                handleIcon:
                    'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%'
            },
            {
                type: 'inside',
                orient: 'vertical'
            },
            {
                type: 'slider',
                orient: 'vertical',
                showDataShadow: false,
                handleIcon:
                    'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%'
            }
        ],
        xAxis: {
            data: timeData,
            type: 'category',
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: {
            // data: freData,
            type: 'category',
            splitArea: {
                show: false
            }
        },
        visualMap: {
            min: Math.min(...dataarray) ,
            max: Math.max(...dataarray),
            calculable: true,
            realtime: false,
            inRange: {
                color: [
                    // '#313695',
                    // '#4575b4',
                    // '#74add1',
                    // '#abd9e9',
                    // '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                ]
            }
        },
        series: [
            {
                type: 'heatmap',
                data: valueData,
                name: '一维投影概图',
                emphasis: {
                    itemStyle: {
                        borderColor: '#333',
                    }
                },
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                },
                progressive: 1000,
                animation: false
            }
        ]
    };

    if (speChartoption && typeof speChartoption === 'object') {
        speChart.setOption(speChartoption, true);
    }

}