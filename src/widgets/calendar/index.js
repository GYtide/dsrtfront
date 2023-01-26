/**
 * 获取数据年份列表
 */

async function getyearlist() {
    var response = await fetch('/data/year_overview.json')
    return response.json()
}

