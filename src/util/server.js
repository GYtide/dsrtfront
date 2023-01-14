let http = require('http');
let fs = require('fs');
let path = require('path')


// --proxy=/api:http://49.233.61.61:80 --proxy=/get:http://49.233.61.61:80 --proxy=/user:http://49.233.61.61:80 --proxy=/media:http://49.233.61.61:80 
// 代理配置
let conifg = {
    '/api': { // 需要拦截的本地请求路径
        target: 'http://49.233.61.61', // 真实代理地址
        port: 80, // 端口，默认80
    },
    '/get': { // 需要拦截的本地请求路径
        target: 'http://49.233.61.61', // 真实代理地址
        port: 80, // 端口，默认80
    },
    '/user': { // 需要拦截的本地请求路径
        target: 'http://49.233.61.61', // 真实代理地址
        port: 80, // 端口，默认80
    },
    '/media': { // 需要拦截的本地请求路径
        target: 'http://49.233.61.61', // 真实代理地址
        port: 80, // 端口，默认80
    },
};

// 创建http服务
let app = http.createServer(function (request, response) {
    // console.log(request)
    let url = request.url === '/' ? 'index.html' : request.url;
    // let url = request.url
    var mjs = /.\.js/
    if(mjs.test(url)){
        // console.log(response)
        response.setHeader('Content-Type', 'application/javascript')
    }
    // 存在代理地址，走代理请求
    if (hasProxy(url, request, response)) {
        return;
    }
    
    // 普通请求和资源加载,以本文件目录为源目录
    fs.readFile(path.join(path.resolve(__dirname,'..'),url) , function (err, data) {
        if (err) {
            console.log('请求失败', err);
        } else {
            response.end(data);
        }
    });
});

// 判断是否存在代理地址
function hasProxy(url, request, response) {
    for (const key in conifg) {
        if (url.indexOf(key) < 0) {
            continue;
        }
        const { target, port } = conifg[key];
        // console.log(target)
        let info = target.split('//');
        let opts = { // 请求参数
            protocol: info[0],
            host: info[1],
            port: port || 80,
            method: request.method,
            path: url,
            json: true,
            headers: {
                ...request.headers,
                host: info[1],
                referer: target + url
            }
        }
        proxy(opts, request, response);
        return true;
    }
    return false;
}

// 代理转发
function proxy(opts, request, response) {
    console.log("opts==",opts)
    // 请求真实代理接口
    var proxyRequest = http.request(opts, function (proxyResponse) {
        // 代理接口返回数据，写入本地response
        proxyResponse.on('data', function (chunk) {
            response.write(chunk, 'binary');
        });
        // 代理接口结束，通知本地response结束
        proxyResponse.on('end', function () {
            response.end();
        });
        response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    });

    // 本地接口数据传输，通知代理接口请求
    request.on('data', function (chunk) {
        proxyRequest.write(chunk, 'bin`ary');
    });

    // 本地请求结束，通知代理接口请求结束
    request.on('end', function () {
        proxyRequest.end();
    });
}

app.listen(8000);
console.log('server is listen on 8000....');