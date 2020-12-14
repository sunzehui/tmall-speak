const port='3000'
const fs = require('fs');
const express = require('express');
const TmallUtil = require( './util/tmall_util.js')
const app = express();
//form表单需要的中间件。
const mutipart = require('connect-multiparty');
const mutipartMiddeware = mutipart();
const get_contentType = require('./util/getContentType');

//这里就是接受form表单请求的接口路径，请求方式为post。
app.post('/upload',mutipartMiddeware,function (req,res) {
    //这里打印可以看到接收到文件的信息。
    console.log(req.files);

    //成功接受到浏览器传来的文件。我们可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径 。等等。
    let t = new TmallUtil()
    t.ocrCheck(req.files.file.path)
        .then(r=>{
            res.send(r.toString());
        }).catch(e=>{
            res.send("error")
    })
    //给浏览器返回一个成功提示。
});


app.all("*",function (req,res){
    const path = req.url === '/' ? '/index.html':req.url;
    console.log(path+new Date());
    fs.readFile('./static'+path,(err,data)=>{
        if(err){

            res.writeHead(404,{'content-Type':'text/html;charset="utf-8"'})

            res.end("404")
            return false;
        }
        let cType = get_contentType(path);

        res.writeHead(200,{'content-Type':`${cType};charset="utf-8"`})

        res.end(data)
    })
})

app.listen(port);
console.log(`

      ___           ___           ___       ___       ___     
     /\\__\\         /\\  \\         /\\__\\     /\\__\\     /\\  \\    
    /:/  /        /::\\  \\       /:/  /    /:/  /    /::\\  \\   
   /:/__/        /:/\\:\\  \\     /:/  /    /:/  /    /:/\\:\\  \\  
  /::\\  \\ ___   /::\\~\\:\\  \\   /:/  /    /:/  /    /:/  \\:\\  \\ 
 /:/\\:\\  /\\__\\ /:/\\:\\ \\:\\__\\ /:/__/    /:/__/    /:/__/ \\:\\__\\
 \\/__\\:\\/:/  / \\:\\~\\:\\ \\/__/ \\:\\  \\    \\:\\  \\    \\:\\  \\ /:/  /
      \\::/  /   \\:\\ \\:\\__\\    \\:\\  \\    \\:\\  \\    \\:\\  /:/  / 
      /:/  /     \\:\\ \\/__/     \\:\\  \\    \\:\\  \\    \\:\\/:/  /  
     /:/  /       \\:\\__\\        \\:\\__\\    \\:\\__\\    \\::/  /   
     \\/__/         \\/__/         \\/__/     \\/__/     \\/__/    

`)

console.log(`
  App running at:
  - Local:   http://localhost:${port}/
  - Network: http://${require('ip').address()}:${port}/
`)
