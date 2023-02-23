/**
 * 
 * @param {Float32Array} imgArr - 图片数据
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {Object} artr - 其他设置 
 */
// function initRenderImage(imgArr, width, height, artr) {
    // image-panel
    //     fetch('../../data/2020/image/image.bin', { method: 'get', responseType: 'arraybuffer' }
    //     ).then(res => {
    //         return res.arrayBuffer()
    //     }).then(data => {
    //         data = new Float32Array(data)

    //         var valueData = []

    //         for (let j = 0; j < 128; ++j) {
    //             for (let i = 0; i < 128; ++i) {
    //                 valueData.push([i, j, data[j * 128 + i]])
    //             }
    //         }
    //         console.log(data)
    //         var xData = Array.from({ length: 128 }, (_, index) => index + 1);
    //         var yData = Array.from({ length: 128 }, (_, index) => index + 1);
    //         var chartDom = document.getElementById('image-panel');
    //         var myChart = echarts.init(chartDom);
    //         option = {
    //             toolbox: {
    //                 feature: {
    //                     dataZoom: {

    //                     }, saveAsImage: {
    //                         pixelRatio: 2
    //                     }
    //                 }
    //             },
    //             dataZoom: [
    //                 {
    //                     type: 'inside'
    //                 },
    //                 {
    //                     type: 'inside',
    //                     orient: 'vertical'
    //                 }

    //             ],
    //             grid: {
    //                 left: 100,
    //                 right: 150,
    //                 top: 20,
    //                 bottom: 30,
    //             },
    //             tooltip: {},
    //             xAxis: {
    //                 type: 'category',
    //                 data: xData
    //             },
    //             yAxis: {
    //                 type: 'category',
    //                 data: yData
    //             },
    //             visualMap: {
    //                 min: Math.min(...data),
    //                 max: Math.max(...data),
    //                 calculable: true,
    //                 realtime: false,
    //                 right: '10px',
    //                 top: 'center',
    //                 itemWidth: 20,
    //                 itemHeight: 550,
    //                 splitNumber: 5,
    //                 type: 'continuous',
    //                 precision: 0,
    //                 inRange: {
    //                     color: [
    //                         'rgb(0,0,0)',
    //                         'rgb(230,0,0)',
    //                         'rgb(255,210,0)',
    //                         'rgb(255,255,255)'
    //                     ]
    //                 },
    //                 formatter: function (value, name) {
    //                     return value.toExponential(3);
    //                 }
    //             },
    //             series: [
    //                 {
    //                     name: 'value',
    //                     type: 'heatmap',
    //                     data: valueData,
    //                     emphasis: {
    //                         itemStyle: {
    //                             borderColor: '#333',
    //                             borderWidth: 1
    //                         }
    //                     },
    //                     progressive: 1000,
    //                     animation: false
    //                 }
    //             ]

    //         }
    //         option && myChart.setOption(option);
    //         var xcoorDom = document.getElementById('xcoordinate')//x坐标横切图
    //         var xcoorChart = echarts.init(xcoorDom);
    //         var ycoorDom = document.getElementById('ycoordinate')//y坐标横切图
    //         var ycoorChart = echarts.init(ycoorDom);

    //         function refreshCoordinate(x,y){
    //             var option = xcoorChart.getOption();
    //             console.log(xcoorChart)
    //             var xCoorData = []
    //             for (let i = 0; i < 128; ++i) {
    //                 xCoorData.push(data[128*y+i])
    //             }
    //             console.log(xCoorData)
    //             option.series[0].data = xCoorData;

    //             option = ycoorChart.getOption();
    //             var yCoorData = []
    //             for (let i = 0; i < 128; ++i) {
    //                 yCoorData.push(data[128*x+i])
    //             }
    //             console.log(yCoorData)
    //             option.series[0].data = yCoorData;
    //         }

    //         myChart.on("mouseover",function(params){
    //             let x = params.data[0]
    //             let y = params.data[1]
    //             refreshCoordinate(x,y)

    //         })


    //         // 初始化坐标横切折线图初始坐标 (0,0)
    //         var xCoorData = []
    //         for (let i = 0; i < 128; ++i) {
    //             xCoorData.push(data[i])
    //         }

    //         xcoorOption = {
    //             xAxis: {
    //                 type: 'category',
    //                 data: xData
    //             },
    //             yAxis: {
    //                 type: 'value'
    //             },
    //             series: [
    //                 {
    //                     data: xCoorData,
    //                     type: 'line',
    //                     smooth: true
    //                 }
    //             ],
    //             animation: false
    //         }
    //         xcoorOption && xcoorChart.setOption(xcoorOption)

    //         var yCoorData = []
    //         for (let i = 0; i < 128; ++i) {
    //             yCoorData.push(data[i * 128])
    //         }


    //         ycoorOption = {
    //             xAxis: {
    //                 type: 'category',
    //                 data: yData
    //             },
    //             yAxis: {
    //                 type: 'value'
    //             },
    //             series: [
    //                 {
    //                     data: yCoorData,
    //                     type: 'line',
    //                     smooth: true
    //                 }
    //             ],
    //             animation: false
    //         }
    //         ycoorOption && ycoorChart.setOption(ycoorOption)

    //     })

    // }



    const stage = new Konva.Stage({
        container: 'image-panel',
        width: document.getElementById('image-panel').clientWidth,
        height: document.getElementById('image-panel').clientHeight
    });
    // 2 create layer
    const layer = new Konva.Layer();
    stage.add(layer);

    Promise.all([
        fetch('/data/2020/speov/mmindata.bin', { method: 'get', responseType: 'arraybuffer' }),
        fetch('/data/2020/speov/mmintime.bin', { method: 'get', responseType: 'arraybuffer' }),
        fetch('/data/2020/speov/mminfrequency.bin', { method: 'get', responseType: 'arraybuffer' })
    ]).then(([data, time, frequency]) => {
        return { data: data.arrayBuffer(), time: time.arrayBuffer(), frequency: frequency.arrayBuffer() };
    }).then(res => {
        return Promise.all([
            res.data.then(value => new Uint8Array(value)),
            res.time.then(value => new Float32Array(value)),
            res.frequency.then(value => new Float32Array(value))
        ]);
    }).then(([data, time, frequency]) => {
        return { time, data, frequency };
    }).then(
        oneProjResponse => {
            let time = oneProjResponse.time;
            let data = oneProjResponse.data;
            let frequency = oneProjResponse.frequency;
            let width = time.length;
            let height = data.length / width;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            const imageData = ctx.createImageData(width, height);
            const pixelData = imageData.data;

            for (let j = 0; j < height; j++) {
                for (let i = 0; i < width; i++) {
                    const value = data[j * width + i];
                    if (value < 128) {
                        pixelData[(j * width + i) * 4] = value;
                        pixelData[(j * width + i) * 4 + 1] = 0;
                        pixelData[(j * width + i) * 4 + 2] = 0;
                        pixelData[(j * width + i) * 4 + 3] = 255;
                    } else if (value < 192) {
                        pixelData[(j * width + i) * 4] = value;
                        pixelData[(j * width + i) * 4 + 1] = (value - 128) * 2;
                        pixelData[(j * width + i) * 4 + 2] = 0;
                        pixelData[(j * width + i) * 4 + 3] = 255;
                    } else {
                        pixelData[(j * width + i) * 4] = value;
                        pixelData[(j * width + i) * 4 + 1] = (value - 128) * 2;
                        pixelData[(j * width + i) * 4 + 2] = (value - 192) * 3;
                        pixelData[(j * width + i) * 4 + 3] = 255;
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);

            const konvaImg = new Konva.Image({
                name: 'image',
                image: canvas,
                x: 0,
                y: 0,
                width: stage.width(),
                height: stage.height(),
                draggable: true,
                stroke: 'rgb(223, 222, 222)',
                strokeWidth: 0,
                dash: [10, 10],
            });

            konvaImg.on('mousedown', (e) => {
                const x = Math.floor(e.target.getRelativePointerPosition().x / 2);
                const y = Math.floor(e.target.getRelativePointerPosition().y / 5);
                console.log(data[y * width + x]);
            });

            layer.add(konvaImg);
            layer.draw();

        }
    ).catch(error => {
        console.error('An error occurred:', error);
    });
// }