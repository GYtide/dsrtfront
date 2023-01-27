export const APP_URL = {

    /**
     * 有可用数据的年份
     */
    yearlist : '/data/year_overview.json',

    /**
     * 
     * @param {*} year 
     * @returns string 日历数据的 api
     */
    calendardata : (year) => {
        return `/data/${year}/calendar/daydata.json`
    },
    /**
     * 
     * @param {*} date 年月日数组,测试时简单用年代替
     * @returns Object 频谱概图的时间、频率、数据 api
     */
    speoverview : (date) => {
        return { 
            time : `/data/${date}/speov/mmintime.bin`,
            fre : `/data/${date}/speov/mminfrequency.bin`,
            data : `/data/${date}/speov/mmindata.bin`
        }
    },

    /**
     * 
     *  @param {*} date 年月日数组,测试时简单用年代替
     * @returns Object 一维投影的时间、数据 api
     */

    oneProjectview : (date) => {
        return {
            time : `/data/${date}/1D/1Dtime.bin`,
            data : `/data/${date}/1D/1Dproject.bin`
        }
    }
}

