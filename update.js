var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var jquery = require('jquery');
var mysql = require('mysql');
var i = 1;
var url = ""; 
//初始url 

function fetchPage(x) {     //封装了一层函数
    for (j=1;j<1000;j++)
    {
    var y= x + String(j);
    startRequest(y);
    }
}

try{

function startRequest(x) 
{
    console.log("正在抓取"+x+"的数据");
     //采用http模块向服务器发起一次get请求      
    http.get(x, function (res) {     
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];        
        res.setEncoding('utf-8'); //防止中文乱码
     //监听data事件，每次取一块数据
        res.on('data', function (chunk) {   
            html += chunk;
        });
     //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

         var $ = cheerio.load(html); //采用cheerio模块解析html
         
         var li = $('div.info-panel').first().parent('li'); //寻找第一个目标li

         var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'woshengri0111',
  database : 'firstserver',
  port : '8889',
  socketPath :'/Applications/MAMP/tmp/mysql/mysql.sock'
});

         connection.connect();

            connection.query('SELECT ',info_item,function (err, result) { 
                 if (err) { 
                    throw err; 
             }}); 

  console.log(info_item);     //打印新闻信息\

         li = li.next().first(); //定义下一个目标li
     }
                connection.end();


        });

    }).on('error', function (err) {
        console.log(err);
    });

}

/*
      //该函数的作用：在本地存储所爬取的新闻内容资源
function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();         

       var y = x.substring(0, 2).trim();

        if (y == '') {
        x = x + '\n';   
//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
        fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    })
}
//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($,news_title) {
    $('.article-content img').each(function (index, item) {
        var img_title = $(this).parent().next().text().trim();  //获取图片的标题
        if(img_title.length>35||img_title==""){
         img_title="Null";}
        var img_filename = img_title + '.jpg';

        var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url

//采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    })
}
*/
fetchPage(url);      //主程序开始运行
}catch(e){};