var express = require('express');
var request=require('request');
var moment=require('moment');
var url='http://api.openweathermap.org/data/2.5/weather?lat=37.56826&lon=126.977829&APPID=a5c51d2daade4fc57bdfccd86f9d62ae';
var app=express();

require('moment-timezone')
require('date-utils')
moment.tz.setDefault("Asia/Seoul")
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'weatherhelper',
    password: 'testpassword',
    database: 'weather'
})
connection.connect();

function insert_sensor(temperature, tmp_min, tmp_max, pressure, feels_like) {
  obj = {};
  obj.temperature = temperature;
  obj.temp_min=tmp_min;
  obj.temp_max=tmp_max;
  obj.pressure=pressure;
  obj.feels_like=feels_like;
  obj.time=moment().add("-1","M").format('YYYY,MM,DD,hh,mm,ss');

  var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

function get_data(){
  var wanted;

  request(url, function(error, response, body){
    wanted=JSON.parse(body);
    insert_sensor(wanted.main.temp, wanted.main.temp_min, wanted.main.temp_max, wanted.main.pressure, wanted.main.feels_like);
  });

}

setInterval(get_data, 600000);
