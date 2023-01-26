import { getyearlist} from "../../util/request.js";
import { refreshCalendar } from "./calendar.js";

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
            refreshCalendar(calendardom,this.id)

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
    refreshCalendar(calendardom,res[0])
}
)

