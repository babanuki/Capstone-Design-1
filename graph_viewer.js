var express = require('express')
var app = express()
fs = require('fs');
moment=require('moment');
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'weatherhelper',
    password: 'testpassword',
    database: 'weather'
})
connection.connect();


app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./graph.html', function (err, html) {
    html = ""+ html
    console.log('read file');

    var qstr = 'select * from sensors ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = ""
      for (var i=0; i< rows.length; i++) {
         r = rows[i];
         data += comma + "[new Date("+r.time+"),"+ r.temperature+","+r.temp_max+","+r.temp_min+","+r.feels_like+"]";
         comma = ",";
      }
      var header = "data.addColumn('datetime', 'Date/Time');"
      header += "data.addColumn('number', 'Temperature');"
      header += "data.addColumn('number', 'Temp_Max');"
      header += "data.addColumn('number', 'Temp_Min');"
      header += "data.addColumn('number', 'Feels_Like');"
            console.log(header);
            console.log(data);
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
