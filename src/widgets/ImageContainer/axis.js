/**
 * 画出坐标轴
 */

/**
 * @param {Object} ctx - canvas的CanvasRenderingContext2D对象
 * @param {Object} XdateList - X轴数组
 * @param {Object} YdateList - Y轴数组
 */

export const drawAxis = function (ctx,XdateList,YdateList){
    ctx.strokeStyle = '#000000'
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(0, offsetY - height);
    ctx.stroke(); // 刻度线
}