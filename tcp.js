var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tracker.db');
const s = require('net').Socket();
const fs = require('fs');
var  ansfer = [];
var i=0;
var forsend = [];
const net = require('net');

// var data = "(087073818159BR00170212V4012.1409N04429.4742E002.8123421000.00,00000000L00000000)";
if (!fs.existsSync("./tracker.db")) {
    var db = new sqlite3.Database('tracker.db'); //creat coll database
};


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
        db.run("CREATE TABLE if not exists user (name TEXT, lon TEXT,lat TEXT, dt TEXT, num TEXT)");
        db.run(`UPDATE  user SET lon =${lng}, lat=${lat}, dt =current_timestamp WHERE name = ?`, `${mac}`);
     });

  db.all("SELECT name,lon, lat,dt  FROM user WHERE num='63'", function(err, rows) {
  	
        rows.forEach(function (row) {
       	forsend[i] = row;
       	i++;
        //ansfer[row] ={ name : row.name, lon : row.lon, lat : row.lat, dt : row.dt};
      
        })
         console.log(forsend);
         i=0;
	});

})
  //console.log(ansfer);
}).listen(80);
