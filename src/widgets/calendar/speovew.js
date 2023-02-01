export function respeoverview(padom, timearray, frearray, dataarray) {
    padom.textContent = ''
    var speChart = echarts.init(padom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var speChartoption;
    let valueData = []
    for (let j = 0; j < frearray.length; ++j) {
        for (let i = 0; i < timearray.length; ++i) {
            valueData.push([i, j, dataarray[j * timearray.length + i]])
        }
    }
    let time = +new Date(2022, 0, 1);

    const timeData = [];
    const freData = [];
    for (let i = 0; i < timearray.length; ++i) {
        timeData.push(
            echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss.ms', time + timearray[i] * 1000, false)
        );
    }

    // 频点数组保留两位小数
    for (let i = 0 ; i < frearray.length; ++i) {
        freData.push(Math.floor(frearray[i]*1000)/1000)
        // console.log(Math.floor(frearray[i]*100)/100)

    }
    const upColor = '#00da3c';
    const downColor = '#ec0000';
    speChartoption = {
        title: {
            text: '频谱概图',
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
            bottom: 150
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
                handleSize: '80%',
                bottom: 80,
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
            data: freData,
            type: 'category',
            splitArea: {
                show: false
            }
        },
        visualMap: {
            min: Math.min(...dataarray),
            max: Math.max(...dataarray),
            calculable: true,
            realtime: false,
            itemHeight: 300,
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
            },
            left: 'center',
            orient: 'horizontal'     
        },
        series: [
            {
                type: 'heatmap',
                data: valueData,
                name: '频谱数据预览',
                emphasis: {
                    itemStyle: {
                        borderColor: '#333',
                    }
                },
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                },
                progressive: 3000,
                animation: false
            }
        ]
    };

    if (speChartoption && typeof speChartoption === 'object') {
        speChart.setOption(speChartoption, true);
    }

}