var calendardom = document.getElementById('container');
var calendarCharts = echarts.init(calendardom, null, {
  renderer: 'svg',
  useDirtyRect: false
});

var app = {};

var yearlist = getyearlist();

yearlist.then(
  res => {
    console.log(res)
    document.getElementById('yearlist').textContent = ''

    for (let i = 0; i < res.length; ++i) {
      var li = document.createElement('li')
      var a = document.createElement('a')
      a.setAttribute("class", "year-item")
      a.class = "year-item"
      a.id = res[i]
      a.yindex = i
      a.textContent = res[i]
      a.onclick = function () {

        let items = document.getElementsByClassName('year-item')
        document.getElementById('overview').textContent = ''

        for (let i = 0; i < items.length; ++i) {
          // console.log(items[0])
          items[i].style = "background-color: #FFFFFF;"
        }

        this.style = "background-color: rgb(243, 94, 94);"
        // clearRect()
        refreshCalendar(this.id)

      }
      li.appendChild(a)
      document.getElementById('yearlist').appendChild(li)
    }
    // clearRect()
    // initRect(res[0])
    let items = document.getElementsByClassName('year-item')

    for (let i = 0; i < items.length; ++i) {
      // console.log(items[0])
      items[i].style = "background-color: #FFFFFF;"
      if (items[i].id == res[0]) {
        items[i].style = "background-color: rgb(243, 94, 94);"
      }
    }
    refreshCalendar(res[0])
  }
)

async function getyearlist() {
  var response = await fetch('/data/year_overview.json')
  return response.json()
};

async function getCalendarData(year) {
  var response = await fetch(`/data/${year}.json`)
  return response.json()
}

async function getSpeoverData() {
  let resp = await Promise.all([
    fetch('/data/mmintime.bin', {
      method: 'get',
      responseType: 'arraybuffer'
    }), fetch('/data/mminfrequency.bin', {
      method: 'get',
      responseType: 'arraybuffer'
    }), fetch('/data/mmindata.bin', {
      method: 'get',
      responseType: 'arraybuffer'
    })]).then(
      res => {
        // return { time : res[0].arrayBuffer()}
        return { time: res[0].arrayBuffer(), fre: res[1].arrayBuffer(), fredata: res[2].arrayBuffer() }
      }
    ).then(
      async res => {
        let dataarray = await res.fredata.then(value => {
          return value
        })
        let timearray = await res.time.then(value => {
          return value
        })
        let frearray = await res.fre.then(value => {
          return value
        })

        // console.log(timearray)

        dataarray = new Uint8Array(dataarray)

        timearray = new Float32Array(timearray)

        frearray = new Float32Array(frearray)

        // let time = +new Date(2011, 0, 1);

        return { time: timearray, fre: frearray, data: dataarray }
      }
    )
  return resp
}


function refreshCalendar(year) {
  var option;
  var datelist = getCalendarData(year)
  datelist.then(
    res => {
      console.log(res)
      const date = +echarts.time.parse(year + '-01-01');
      const end = +echarts.time.parse(+year + 1 + '-01-01');
      const dayTime = 3600 * 24 * 1000;
      const datavalue = [];
      for (let time = date, i = 0; time < end && i < res.length; ++i, time += dayTime) {
        datavalue.push([
          echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
          res[i].value
        ]);
      }
      option = {
        title: {
          top: 30,
          left: 'center',
          text: `数据检索    ${year} 年`
        },
        tooltip: {},
        visualMap: {
          min: 0,
          max: 1000,
          type: 'piecewise',
          orient: 'horizontal',
          left: 'center',
          //   top: 65
          bottom: 50
        },
        calendar: {
          top: 90,
          left: 30,
          right: 30,
          cellSize: ['auto', 13],
          range: `${year}`,
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: false }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: datavalue
        }
      };

      if (option && typeof option === 'object') {
        calendarCharts.setOption(option);
      }
      calendarCharts.on('click', function (params) {
        let overview = document.getElementById('overview-container')
        overview.textContent = ''
        var speovdom = document.createElement('div')

        speovdom.style = "height: 100%; width: 100%"

        // speovdom.id = ''

        var speChart = echarts.init(speovdom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        let dataresponse = getSpeoverData().then(value => {
          return value
        })
        var speChartoption;
        dataresponse.then(
          dataresponse => {
            let timearray = dataresponse.time
            let frearray = dataresponse.fre
            let dataarray = dataresponse.data
            // console.log('=======',timearray,frearray,dataarray)

            let valueData = []
            for (let j = 0; j < frearray.length; ++j) {
              for (let i = 0; i < timearray.length; ++i) {
                valueData.push([i, j, dataarray[j * timearray.length + i]])
              }
            }
            // let baseValue = Math.random() * 1000;
            let time = +new Date(2011, 0, 1);

            const timeData = [];
            const freData = [];
            // const valueData = [];
            for (let i = 0; i < timearray.length; ++i) {
              timeData.push(
                echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss.ms', time + timearray[i] * 1000, false)
              );
              // valueData.push(next(i).toFixed(2));
              // time += 1000;
            }

            const dataCount = 5e5;
            const upColor = '#00da3c';
            const downColor = '#ec0000';
            speChartoption = {
              title: {
                text: echarts.format.addCommas(dataCount) + ' Data',
                left: 10
              },
              toolbox: {
                feature: {
                  dataZoom: {
                    // yAxisIndex: false
                  },
                  saveAsImage: {
                    pixelRatio: 2
                  }
                }
              },
              tooltip: {
                axisPointer: {
                  type: 'cross'
                },
                // borderWidth: 1,
                borderColor: '#ccc',
                // padding: 10,
                textStyle: {
                  color: '#000'
                },

                // trigger: 'axis',
                // axisPointer: {
                //   type: 'shadow'
                // }
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
                data: frearray,
                type: 'category',
                splitArea: {
                  show: false
                }
              },
              visualMap: {
                min: 0,
                max: 255,
                calculable: true,
                realtime: false,
                inRange: {
                  color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
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
                  // Set `large` for large data amount
                  // large: true
                  emphasis: {
                    itemStyle: {
                      borderColor: '#333',
                      // borderWidth: 1
                    }
                  },
                  itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: undefined,
                    borderColor0: undefined
                  },
                  progressive: 1000,
                  animation: false
                }
              ]
            };

            if (speChartoption && typeof speChartoption === 'object') {
              speChart.setOption(speChartoption);
            }
            overview.appendChild(speovdom)
          });
        window.addEventListener('resize', calendarCharts.resize);
      }
      )

    }
  )

}