/**
 * 获取数据年份列表
 */
import { APP_URL } from '../api/overview.js'

export async function getyearlist() {
    var response = await fetch(APP_URL.yearlist)
    return response.json()
}


export async function getCalendarData(year) {
  console.log()
    var response = await fetch(APP_URL.calendardata(year))
    return response.json()
}

export async function getSpeoverData(date) {
    let resp = await Promise.all([
      fetch(APP_URL.speoverview(date).time, {
        method: 'get',
        responseType: 'arraybuffer'
      }), fetch(APP_URL.speoverview(date).fre, {
        method: 'get',
        responseType: 'arraybuffer'
      }), fetch(APP_URL.speoverview(date).data, {
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