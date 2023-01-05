import { ajax } from "./store/ajax.js";

const searchBtn = document.getElementById('searchdata')

searchBtn.addEventListener('click',function(){
    getspectrum()
})

async function getspectrum(){

    let url = '/get/spectrum/data/?Image_ID=0&FileDataList=[%7B%22range%22:%222022-08-29+08:10:01+~+2022-08-29+09:10:01%22,%22time_begin%22:%222022-08-29+08:10:01%22,%22time_end%22:%222022-08-29+09:10:01%22,%22min_freq%22:%22145.0+MHz%22,%22max_freq%22:%22454.971+MHz%22,%22iname%22:%22ODACH_DSRT05_SRSP_L1_05M_20220212081001_V01.01.fits%22,%22path%22:%22data%2Fspe%2FODACH_DSRT05_SRSP_L1_05M_20220212081001_V01.01.fits%22%7D]&StartTime=07:04:45&EndTime=08:16:52'
    ajax(url)
}
