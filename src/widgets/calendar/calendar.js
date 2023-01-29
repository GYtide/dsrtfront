import { getCalendarData ,getSpeoverData ,getProjectData ,getSpeFileList} from '../../util/request.js'
import { respeoverview} from '../calendar/speovew.js'
import {re1Dview} from '../calendar/oneproject.js'
import {refreshSpeFileList} from '../calendar/spefilelist.js'

export function initCalendar(padom, year) {
  // padom.textContent =''
  const calendarCharts = echarts.init(padom, null, {
    renderer: 'svg',
    useDirtyRect: false
  });
  var option;
  var datelist = getCalendarData(year)
  datelist.then(
    res => {
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
          bottom: 50,
    //       inRange:{
    //         // color: ['#FFFFF2','#0A84FF']
    // }
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
        calendarCharts.setOption(option, true);
      }
      calendarCharts.on('click', function (params) {
        let overviewdom = document.getElementById('overview-container')
        overviewdom.textContent = ''
        // 加载当天的频谱数据预览图
        var speovdom = document.createElement('div')
        speovdom.style = "width: 690px; height: 400px; margin-bottom: 40px;"
        let serdate = params.data[0].split('-')
        let speOvewResponse = getSpeoverData(serdate[0]).then(value => {
          return value
        })
        speOvewResponse.then(
          dataresponse => {
            let timearray = dataresponse.time
            let frearray = dataresponse.fre
            let dataarray = dataresponse.data
            respeoverview(speovdom, timearray, frearray, dataarray)
            overviewdom.appendChild(speovdom)
          });

        var oneprodom = document.createElement('div')
        oneprodom.style = "width: 690px; height: 400px; margin-bottom: 40px;"
        let oneProjResponse = getProjectData(serdate[0]).then(value => {
          return value
        })
        oneProjResponse.then(
          dataresponse => {
            let timearray = dataresponse.time
            let dataarray = dataresponse.data
            re1Dview(oneprodom, timearray,dataarray)
            overviewdom.appendChild(oneprodom)
          });

        let speflResponse =getSpeFileList(serdate[0])
        speflResponse.then( res => {
          refreshSpeFileList(res)
        })
        window.addEventListener('resize', calendarCharts.resize);
      }
      )

    }
  )

}

export function refreshCalendar(padom,data,year) {
  var chart = echarts.getInstanceByDom(padom);
  var option = chart.getOption();
  option.series[0].data = data;
  option.calendar[0].range = `${year}`
  option.title[0].text = `数据检索    ${year} 年`
  chart.setOption(option);
}