const express=require('express')
const ejs=require("ejs")
const app=express()
const port=8000

app.set("view engine", "ejs")
app.use(express.static(__dirname+'/'))

var moment=require('moment')
var fs=require('fs')

bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
require('date-utils')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

app.get('/', function(req, res){
	res.render("test1", {})
})

app.get('/test', function(req, res){
	gr=req.query

	gr.email="slshslsk1330@gmail.com"
	gr.stuno="20151602"
	gr.time=moment().format("YYYY-MM-DD HH:mm:ss")
    gr.ip=req.ip.replace('::ffff:', '')

	console.log(gr)
	res.send(JSON.stringify(gr))
})

app.post('/test', function(req, res){
	pr=req.body

	pr.email="slshslsk1330@gmail.com"
    pr.stuno="20151602"
    pr.time=moment().format("YYYY-MM-DD HH:mm:ss")
    pr.ip=req.ip.replace('::ffff:', '')

	console.log(pr)
	res.send(JSON.stringify(pr))
})

/*
var data="test complete\n"

fs.writeFile('WriteASync.txt', data, 'utf8', function(error, data){
	if(error)
		throw error
});

fs.writeFileSync('WriteSync.txt', data, 'utf8')
console.log("WriteFileSync completed")
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
