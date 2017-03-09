var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'woshengri0111',
  database: 'firstserver',
  port: '8889',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect();

var user_id;

function fetchID(x, y, callback) {
  connection.query(y, x, function(err, rows) {
    if (err) {
      callback(err, null);
    } else
      callback(null, rows[0].webaddr);
  });
}

function sqlq(x) {
  connection.query(updatesql, x, function(err, res) {
    if (err) console.log(err);
    else console.log('success');
  })
}



//insertsql = 'INSERT INTO `lianjia`(`webaddr`, `xiaoqutitle`) VALUES (';
var selectsql = 'SELECT `webaddr` FROM `lianjia` LIMIT ?,?';
var indexstart = 0;
var updatesql = 'UPDATE `lianjia` SET `id`=' + indexstart + 'WHERE webaddr=?'
var indexend = 1
var data = [indexstart, indexend];
//for (;indexstart<1;indexstart++)
//{
var sqlquery = selectsql; //+indexstart.toString()+','+indexend.toString();

//connection.query(insertsql+a+','+b+')',function (err, result) { 

Step(
  fetchID(data, sqlquery, function(err, content) {
    if (err) {
      console.log(err);
      // Do something with your error...
    } else {
      user_id = content;
      console.log(user_id + '0');
      sqlq(user_id);
    }
  }); console.log(user_id + '1');
);
//};

/*
var updatequery = updatesql+indexstart.toString()+' WHERE `webaddr`='+re;
console.log(updatequery);
connection.query(updatequery,function(err,result){if(err){throw err}console.log('success')});
console.log(indexstart++);
indexend++;
*/
}
catch (e) {};
connection.end();

console.log(user_id + '2');
console.log(user_id + '3');

/*
	'INSERT INTO `lianjia`(`webaddr`, `xiaoqutitle`) VALUES (a)'
, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/