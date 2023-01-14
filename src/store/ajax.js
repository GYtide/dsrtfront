/**
 *  封装 fetch 的网络请求
*/
async function getspectrum(url) {
    const fetchPromise = fetch(url)
    let data = await fetchPromise.then(response => {
        return response.json()
    }).then(data => {
        return data
    }).catch( err => {
        return err
    });
    return data
}

export {
    getspectrum
}