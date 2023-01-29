export function refreshSpeFileList(data) {

    let listdom = document.getElementById('spelist')

    // 清空列表
    listdom.textContent = ''

    // 刷新列表

    let rows = data.rows

    let rowlength = rows.length

    //    创建表头
    //      <thead>
    //         <tr>
    //             <th scope="col">#</th>
    //             <th scope="col">First</th>
    //             <th scope="col">Last</th>
    //             <th scope="col">Handle</th>
    //         </tr>
    //      </thead>

    let thead = document.createElement('thead')

    thead.innerHTML = 
            `<tr>
                <th scope="col">_</th>
                <th scope="col">filename</th>
                <th scope="col">filepath</th>
                <th scope="col">observedatetime</th>
                <th scope="col">uploaddatetime</th>
                <th scope="col">flags</th>
                <th scope="col">filesize</th>
             </tr>`

    listdom.appendChild(thead)
    let  tbody = document.createElement('tbody')
    listdom.appendChild(tbody)


    for (let i = 0; i < rowlength; ++i) {
        // 创建列表

        let tr = document.createElement('tr')
        let th = document.createElement('th')
        th.innerHTML = i

        tr.appendChild(th)
        // 遍历对象
        for( var key in rows[i]){
            let td = document.createElement('td')
            td.innerHTML = rows[i][key]
            tr.appendChild(td)
        }

        tbody.appendChild(tr)

    }

    // 分页

    let pagination  = document.getElementById('pagination')

    pagination.textContent = ""
    // <li class="page-item disabled">
    // <a class="page-link">Previous</a>
    // </li>

    let lip = document.createElement('li')
    lip.innerHTML = `<a class="page-link">Previous</a>`
    lip.setAttribute("class","page-item disabled")

    pagination.appendChild(lip)
    for (let i = 0 ; i < rowlength/100 ;++i){
        // <li class="page-item"><a class="page-link" href="#">3</a></li>
        let li = document.createElement('li')
        li.setAttribute("class","page-item")
        li.innerHTML = `<a class="page-link" href="#list-item-${i+1}">${i*100+1}-${i*100+100}</a>`
        pagination.appendChild(li)
    }

    let lin = document.createElement('li')
    lin.innerHTML = `<a class="page-link" href="#list-item-0">Next</a>`
    lin.setAttribute("class","page-item")

    pagination.appendChild(lin)
    pagination.textContent = ""

}