/**
 * 获取数据年份列表
 */
import { APP_URL } from '../api/overview.js'

export async function getyearlist() {
    var response = await fetch(APP_URL.yearlist)
    return response.json()
}


export async function getdatelist(year) {
    var response = await fetch(`/data/${year}.json`)
    return response.json()
}

export async function getspeoverlist() {
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