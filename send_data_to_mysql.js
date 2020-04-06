var express = require('express');
var app = express();

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'temp',
    password: 'testpassword',
    database: 'temperature'
})
connection.connect();

function insert_sensor(device_id, temperature_value) {
  obj = {};
  obj.device_id = device_id;
  obj.temperature_value = temperature_value;

  var query = connection.query('insert into temp set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

app.get('/get', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  insert_sensor(r.device_id, r.temperature_value);
  res.end('OK:' + JSON.stringify(req.query));
});

var server = app.listen(8086, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
