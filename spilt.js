var str= '\n\t\t\t\t\t\t\t\t\t普陀\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t| 高区/15层\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t| 朝南\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t'
var news = str.replace('\n','').trim()
var neww = news.replace('\t','').trim()
var m= neww.replace(/\s/g,'')
var n= m.split('|')
console.log(n);
console.log(news.length)