import {getdatelist} from '../../util/request.js'
import { getspeoverlist } from '../../util/request.js';
import {respeoverview} from '../calendar/speovew.js'

export function refreshCalendar(padom,year) {
    padom.textContent =''
    const calendarCharts = echarts.init(padom, null, {
        renderer: 'svg',
        useDirtyRect: false
      });
    var option;
    var datelist = getdatelist(year)
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
            calendarCharts.setOption(option,true);
        }
        calendarCharts.on('click', function (params) {
          let overviewdom = document.getElementById('overview-container')
          overviewdom.textContent = ''
          var speovdom = document.createElement('div')

          speovdom.style = "width: 1050px; height: 300px;"

          let dataresponse = getspeoverlist().then(value => {
            return value
          })
        
          dataresponse.then(
            dataresponse => {
              let timearray = dataresponse.time
              let frearray = dataresponse.fre
              let dataarray = dataresponse.data
              respeoverview(speovdom,timearray,frearray,dataarray)
              overviewdom.appendChild(speovdom)
            });
          window.addEventListener('resize', calendarCharts.resize);
        }
        )

      }
    )

  }