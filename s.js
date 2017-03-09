var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'woshengri0111',
  database : 'firstserver',
  port : '8889',
  socketPath :'/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();

//insertsql = 'INSERT INTO `lianjia`(`webaddr`, `xiaoqutitle`) VALUES (';
var selectsql = 'SELECT webaddr FROM `lianjia` LIMIT '
var indexstart = 0;
var indexend = 1
var sqlquery = selectsql+indexstart.toString()+','+indexend.toString();
var a = 'dsda'
var b='daf'
var c = {webaddr : a, xiaoqutitle : b}

//connection.query(insertsql+a+','+b+')',function (err, result) { 
connection.query(sqlquery,function (err, result) { 
    if (err) { 
      throw err; 
    }  
    console.log(result);
connection.end();
}
/*
	'INSERT INTO `lianjia`(`webaddr`, `xiaoqutitle`) VALUES (a)'
, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/

);