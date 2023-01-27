export const APP_URL = {
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
}

