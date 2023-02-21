import { drawAxis } from "./axis";

/**
 * 
 * @param {Uint8Array} data - 图片数据
 * @param {Float32Array} YdateList - Y轴频点数组
 * @param {Float32Array} XdataList - X轴时间数组
 * 
 */
function renderImage(){
    const overlayCanvas = document.getElementById('overlay-canvas')
    ctx = overlayCanvas.getContext('2d')
    ctx.beginPath()//开始路径绘图
    
    
}




// const stage = new Konva.Stage({
//     container: 'image-panel',
//     width: document.getElementById('image-panel').clientWidth,
//     height: document.getElementById('image-panel').clientHeight
// });
// 2 create layer
// const layer = new Konva.Layer();
// stage.add(layer);

// Promise.all([
//     fetch('/data/2020/speov/mmindata.bin', { method: 'get', responseType: 'arraybuffer' }),
//     fetch('/data/2020/speov/mmintime.bin', { method: 'get', responseType: 'arraybuffer' }),
//     fetch('/data/2020/speov/mminfrequency.bin', { method: 'get', responseType: 'arraybuffer' })
// ]).then(([data, time, frequency]) => {
//     return { data: data.arrayBuffer(), time: time.arrayBuffer(), frequency: frequency.arrayBuffer() };
// }).then(res => {
//     return Promise.all([
//         res.data.then(value => new Uint8Array(value)),
//         res.time.then(value => new Float32Array(value)),
//         res.frequency.then(value => new Float32Array(value))
//     ]);
// }).then(([data, time, frequency]) => {
//     return { time, data, frequency };
// }).then(
//     oneProjResponse => {
//         let time = oneProjResponse.time;
//         let data = oneProjResponse.data;
//         let frequency = oneProjResponse.frequency;
//         let width = time.length;
//         let height = data.length / width;
//         const canvas = document.createElement('canvas');
//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');

//         const imageData = ctx.createImageData(width, height);
//         const pixelData = imageData.data;

//         for (let j = 0; j < height; j++) {
//             for (let i = 0; i < width; i++) {
//                 const value = data[j * width + i];
//                 if (value < 128) {
//                     pixelData[(j * width + i) * 4] = value;
//                     pixelData[(j * width + i) * 4 + 1] = 0;
//                     pixelData[(j * width + i) * 4 + 2] = 0;
//                     pixelData[(j * width + i) * 4 + 3] = 255;
//                 } else if (value < 192) {
//                     pixelData[(j * width + i) * 4] = value;
//                     pixelData[(j * width + i) * 4 + 1] = (value - 128) * 2;
//                     pixelData[(j * width + i) * 4 + 2] = 0;
//                     pixelData[(j * width + i) * 4 + 3] = 255;
//                 } else {
//                     pixelData[(j * width + i) * 4] = value;
//                     pixelData[(j * width + i) * 4 + 1] = (value - 128) * 2;
//                     pixelData[(j * width + i) * 4 + 2] = (value - 192) * 3;
//                     pixelData[(j * width + i) * 4 + 3] = 255;
//                 }
//             }
//         }

//         ctx.putImageData(imageData, 0, 0);

//         const konvaImg = new Konva.Image({
//             name: 'image',
//             image: canvas,
//             x: 0,
//             y: 0,
//             width: stage.width(),
//             height: stage.height(),
//             // draggable: true,
//             stroke: 'rgb(223, 222, 222)',
//             strokeWidth: 0,
//             dash: [10, 10],
//         });

//         konvaImg.on('mousedown', (e) => {
//             const x = Math.floor(e.target.getRelativePointerPosition().x / 2);
//             const y = Math.floor(e.target.getRelativePointerPosition().y / 5);
//             console.log(data[y * width + x]);
//         });

//         layer.add(konvaImg);
//         layer.draw();

//     }
// ).catch(error => {
//     console.error('An error occurred:', error);
// });