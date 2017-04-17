

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
https = require('https');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tracker.db');
const s = require('net').Socket();
const net = require('net');
const fs = require('fs');
var ansfer = [];
var i = 0;
var lat1=0;
var lng1=0;
var de = new Date();
var cfenv = require('cfenv');
var browser = express();

// if (!fs.existsSync("./tracker.db")) {
//     var db = new sqlite3.Database('tracker.db'); //creat coll database
// };




/*
//tcp 
net.createServer(function (socket) {
	 // var ip = req.headers['x-forwarded-for'] ||
         // req.connection.remoteAddress ||
         // req.socket.remoteAddress ||
         // req.connection.socket.remoteAddress;
         // console.log( ip);

 socket.on('data', function (data) { 
  data = data.toString();
var V = data.search("V");
var N = data.search("N");
var E = data.search("E");
var B = data.search("B");

var mac = data.slice(1,B);

var lat1 = data.slice(V+1,N);//lat get 
var lng =  parseFloat(lat1.slice(0,2))+ parseFloat(lat1.slice(2)/60);

var lng1 = data.slice(N+2,E);//lng get
var lat =  parseFloat(lng1.slice(0,2))+ parseFloat(lng1.slice(2)/60);

 db.serialize(function () { // open database
        db.run("CREATE TABLE if not exists user (name TEXT, lng DUBLE,lat DUBLE, dt TEXT, num DUBLE)");
        db.run(`UPDATE  user SET lng =${lng}, lat=${lat}, dt =current_timestamp WHERE name = ?`, `${mac}`);
     });
})
}).listen(80,'192.168.1.5');

*/
// if (!fs.existsSync("./tracker.db")) {
//     var db = new sqlite3.Database('tracker.db'); //creat coll database
// };
// create a new express server


/*
var app = express();

app.get('/',function(req,res){
	try { if(typeof(req.query.lat)=='undefined' && typeof(req.query.lng)=='undefined'){
        throw (err);
	}
         
		 lat1 = req.query.lat;
         lng1= req.query.lon;
         var ip = req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
         console.log(ip);
         db.serialize(function () { // open database
         db.run("CREATE TABLE if not exists user (name TEXT, lng DUBLE,lat DUBLE, dt TEXT, num DUBLE)");
         db.run(`UPDATE  user SET lng =${lng1}, lat=${lat1}, dt =current_timestamp WHERE name = ?`, `${ip}`);
      });
		}
	catch(err){
	res.sendfile("public/rout/rout.html"); };


})




//app.listen(3001,'192.168.1.231');

*/

//browser.use(bodyParser.json()); // for parsing application/json
browser.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded




// for browser
browser.use(express.static(__dirname + '/public'));
//browser.use(express.bodyParser());
browser.post('/', function(req,res){console.log(req.body.bus);
 db.all(`SELECT name,lng, lat,dt  FROM user WHERE num=${req.body.bus}`, function(err, rows) {
  	                                           //dzelu shat bana uxarkum petka menak lng u lat databasum annunner@ poxvi 
        rows.forEach(function (row) {
       	
       
        ansfer[i] ={lat : row.lat,lng : row.lng};
      	i++;
        })
        i=0;
	});
 res.json(ansfer);
 ansfer = [];
});
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var appEnv1 = cfenv.getAppEnv();
browser.listen(appEnv.port,'0.0.0.0',function() {
  // print a message when the server starts listening
console.log("server starting on " + appEnv.url);
});



