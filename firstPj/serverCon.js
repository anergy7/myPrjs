// 用于连接服务器
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'woshengri0111',
  database : 'firstserver',
  port : '8889',
  socketPath :'/Applications/MAMP/tmp/mysql/mysql.sock'
});
return connection;