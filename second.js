var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var jquery = require('jquery')
var i = 0;
var url = "http://sh.lianjia.com/ershoufang/d"; 
//初始url 

/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'woshengri0111',
  database : 'firstserver',
  port : '8889',
  socketPath :'/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();
*/

function fetchPage(x) {     //封装了一层函数
    for (j=1;j<4;j++)
    {
    var y= x + String(j);

    }
}


function startRequest(x) 
{
    console.log('正在抓取'+x+'的数据');
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

         for(k=1;k<=20;k++)

         {


         var child = li.children('div.info-panel').find('a').first();

         var webaddr = "sh.lianjia.com" + child.attr('href');

         var atitle = child.attr('title');

         var xiaoquchild = li.find('a.laisuzhou');

         var xiaoquaddr = "sh.lianjia.com" + xiaoquchild.attr('href');

         var xiaoquinfochild = li.find('span.nameEllipsis');

         var xiaoqutitle = xiaoquinfochild.attr("title");

         var huxingchild = li.find('div.where').children('a').first();

         var huxing = huxingchild.next().text();

         var mianji = huxingchild.next().next().text();

         //var quyuchild = li.find('div.con').children('a').first();

         //var quyuinfo = quyuchild.text();

         var jiaqianchild = li.find('div.price').children('span');

         var jiaqian =jiaqianchild.text();

         var danjia = li.find('div.price-pre').text();

         var otherchild = li.find('div.con');

         var otherinfo = otherchild.text().replace('\n','').replace('\t','').replace(/\s/g,'');

         var otherinfoarray =otherinfo.split('|');

         var quyu = otherinfoarray[0];

         var louceng = otherinfoarray[1];

         var chaoxiang = otherinfoarray[2];

         var niandai = otherinfoarray[3];

         var kanfangchild = li.find('div.square').children().children('span.num');

         var kanfang = kanfangchild.text();

           var info_item = {
          //获取文章的标题
            //title: $('div.article-title a').text().trim(),
         //获取该房源的URL
         //x,
            webaddr: webaddr ,
            //房源链接
            xiaoquaddr: xiaoquaddr,
            //小区链接

            xiaoqutitle: xiaoqutitle,//小区名字

            huxing: huxing,//户型名字

            mianji: mianji, //面积大小

            jiaqian : jiaqian + '万',

            danjia : danjia,

            //quyuinfo: quyuinfo, //区域


            //otherinfo: otherinfo, //其他信息

            kanfang : kanfang + '人',

            quyu : quyu,

            louceng : louceng,

            chaoxiang :chaoxiang,

            niandai : niandai,

//            length: quyuchild.length,


         //获取当前文章的url
          //  link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
         //获取供稿单位
          //  author: $('[title=供稿]').text().trim(),  
        //i是用来判断获取了多少篇文章
            i: i = i + 1,     

            };
           // connection.query('INSERT INTO `lianjia`(`webaddr`, `xiaoqutitle`) VALUES ('+webaddr+''+xiaoqutitle+')');

            //var fangs = [webaddr,xiaoquaddr,xiaoqutitle,huxing,mianji,jiaqian,danjia,kanfang,quyu,louceng,chaoxiang,niandai];

  console.log(info_item);     //打印新闻信息\

         li = li.next().first(); //定义下一个目标li
     }

//var text = x.text()
       

/* var news_title = $('div.article-title a').text().trim();

  savedContent($,news_title);  //存储每篇文章的内容及文章标题

  savedImg($,news_title);    //存储每篇文章的图片及图片标题


             //下一篇文章的url
  var nextLink="http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
            str1 = nextLink.split('-');  //去除掉url后面的中文
            str = encodeURI(str1[0]);  
            //这是亮点之一，通过控制I,可以控制爬取多少篇文章.
            if (i <= 500) {                
                fetchPage(str);
            }
*/
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

//connection.end();
