const http = require('http');
const fs = require('fs');
// 自动获取文件类型插件，mime
// const type=require(mime);
const querystring = require('querystring');
const path = require('path');
const server = http.createServer();
server.on('request', function (req, res) {
    // 获取请求地址
    var { searchParams, pathname } = new URL(req.url, 'http://localhost:3000/foo');
    // let type = mime.getType(pathname);
    if (pathname == '/im') { res.end('hellow'); }
    // 静态资源获取
    // 判断是否为public文件夹下的文件
    //   字符串处理
    if (pathname.charAt(pathname.length - 1) == '/') {
        pathname = pathname.substr(0, pathname.length - 1)
    }
    // console.log(pathname);
    if (req.method == 'GET') {
        if (pathname.includes('public')) {
            // 获取文件扩展名
            var type = pathname.split('.')[pathname.split('.').length - 1];
            if (type == 'gif') { type = 'JPEG/jpg' }
            else { type = 'text/css' }
            //   读取静态资源并发送给客户端
            fs.readFile(path.join(__dirname, pathname), (err, result) => {
                res.writeHead(200, { 'Content-Type': type })
                res.end(result)
            })
        }
        // 首页请求路由
        if (pathname == '/first') {
            fs.readFile('index.html', (err, result) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });




                res.end(result);
                console.log(searchParams.get('m'));

            })
        }
        if (pathname == '/last') {
            res.end('result')
        }
        // 次网页的路由
        if (pathname == '/second') {
            fs.readFile('./Untitled-1.html', (err, result) => {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(result)
                // console.log(searchParams.get('m'));
            })
        }
        if (pathname == '/index') {
            // fs.readFile(path.join(__dirname, pathname), function (err, result) {
            //     if (!err) {
            // res.writeHead(200, { 'content-type': type });
            // console.log(result);
            var bb = `<html><body> <link rel="stylesheet" href="/public/a.css"><meta charset='utf-8'><div ></div></body></html>`;
            console.log(searchParams.get('m'));
            res.end(bb);
        }
    }
    // post请求参数
    if (req.method == 'POST') {
        if (pathname == '/index') {
            let postparams = '';
            req.on('data', params => {
                postparams += params;
            })
            req.on('end', () => {
                postparams = querystring.parse(postparams);
                var firstnumber = 0;
                for (k in postparams) {

                    firstnumber += (postparams[k] - 0);



                }
                console.log(firstnumber);
                var bb = `<html><body> <link rel="stylesheet" href="/public/css/a.css"><meta charset='utf-8'><div >${firstnumber}</div></body></html>`;
                res.end(bb)
            })
        }
        if (pathname == '/second') {
            console.log(searchParams.get('m'));
            let postparams = '';
            req.on('data', params => {
                postparams += params;
            })
            req.on('end', () => {
                // 字符串处理成对象
                var objectParams = {};
                postparams = postparams.indexOf('&') ? postparams.split('&') : [postparams];
                for (let i = 0; i < postparams.length; i++) {
                    let element = postparams[i].split('=');
                    objectParams[element[0]] = element[1];
                    res.writeHead(301, { location: '/last' })


                    res.end();
                };
                console.log(objectParams.m)
            })
        }
    }
})
server.listen(3000);
