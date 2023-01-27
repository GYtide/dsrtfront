import { getyearlist } from "../../util/request.js";
import { initCalendar, refreshCalendar } from "./calendar.js";
import { getCalendarData } from '../../util/request.js'


var calendardom = document.getElementById('container');

var yearlist = getyearlist();

yearlist.then(res => {
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
            document.getElementById('overview-container').textContent = ''
            for (let i = 0; i < items.length; ++i) {
                // console.log(items[0])
                items[i].style = "background-color: #FFFFFF"
            }

            this.style = "background-color: #0A84FF"
            var caldate = getCalendarData(this.id)
            caldate.then(
                res => {
                    // console.log('-====-',res)
                    const date = +echarts.time.parse(this.id + '-01-01');
                    const end = +echarts.time.parse(+this.id + 1 + '-01-01');
                    const dayTime = 3600 * 24 * 1000;
                    const datavalue = [];
                    for (let time = date, i = 0; time < end && i < res.length; ++i, time += dayTime) {
                        datavalue.push([
                            echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                            res[i].value
                        ]);
                    }
                    refreshCalendar(calendardom,datavalue,this.id)
                }
            )
        }
        li.appendChild(a)
        document.getElementById('yearlist').appendChild(li)
    }
    let items = document.getElementsByClassName('year-item')

    for (let i = 0; i < items.length; ++i) {
        items[i].style = "background-color: #FFFFFF;"
        if (items[i].id == res[0]) {
            items[i].style = "background-color:  #0A84FF"
        }
    }
    initCalendar(calendardom, res[0])
}
)

