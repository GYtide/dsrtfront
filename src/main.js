import { getspectrum } from "./store/ajax.js";

// import * as Konva from "./lib/konva/konva.js"

const searchBtn = document.getElementById('searchdata')

searchBtn.addEventListener('click', async function () {
    let spectrum = await getspectrum('/get/spectrum/data/?Image_ID=0&FileDataList=[%7B%22range%22:%222022-08-2 9+08:10:01+~+2022-08-29+09:10:01%22,%22time_begin%22:%222022-08-29+08:10:01%22,%22time_end%22:%222022-08-29+09:10:01%22,%22min_freq%22:%22145.0+MHz%22,%22max_freq%22:%22454.971+MHz%22,%22iname%22:%22ODACH_DSRT05_SRSP_L1_05M_20220212081001_V01.01.fits%22,%22path%22:%22data%2Fspe%2FODACH_DSRT05_SRSP_L1_05M_20220212081001_V01.01.fits%22%7D]&StartTime=07:04:45&EndTime=08:16:52')
    // let width = img.
    // console.log(img)
    let height = spectrum.NAXIS1
    let width = spectrum.NAXIS2
    let imgdata = spectrum.Data

    // console.log(imgdata)

    // 归一化



    var canvas = document.createElement('canvas');
    canvas.width = width
    canvas.height = height
    var ctx = canvas.getContext('2d');

    let catx = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    let imdata = catx.data

    for (let i = 0; i < width * height; ++i) {
        imdata[4 * i] = imdata[4 * i + 1] = imdata[4 * i + 2] = imgdata[i]
        imdata[4 * i + 3] = 255
    }
    // console.log(imdata)
    normalization(imdata)
    console.log(imdata)
    ctx.putImageData(catx, 0, 0)

    var Img = new Konva.Image({
        name: 'image',
        image: canvas,
        x: stage.width() / 2 - width / 2,
        y: stage.height() / 2 - height / 2,
        width: width / 3,
        height: height * 3,
        draggable: true,
        dash: [10, 10],
    });

    layer.add(Img);

    layer.draw();
})



function normalization(imdata) {


    let min = imdata[0], max = imdata[0]

    for (let i = 0; i < imdata.length; i += 4) {
        if (imdata[i] < min) {
            min = imdata[i]
        }
        if (imdata[i] > max) {
            max = imdata[i]
        }
    }

    let range = max - min

    for (let i = 0; i < imdata.length; i += 4) {

        let nd = 255 * imdata[i] / range

        imdata[i] = nd * 0.7
        imdata[i + 1] = nd * 0.2
        imdata[i + 2] = nd * 0.1
    }


}

// 初始化画布

// 1 create stage 创建 konva 画布和图层
const stage = new Konva.Stage({
    container: 'container',
    width: 800,
    height: 600
});

// 2 create layer
const layer = new Konva.Layer();
stage.add(layer);


