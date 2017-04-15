
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tracker.db');
var i=0;
var ansfer = [];
 db.all("SELECT name,lng, lat,dt  FROM user WHERE num='63'", function(err, rows) {
  	                                           //dzelu shat bana uxarkum petka menak lng u lat databasum annunner@ poxvi 
        rows.forEach(function (row) {
       	
       	
        ansfer[i] ={lng : row.lng, lat : row.lat};
      i++;
        })
         console.log(ansfer);
         i=0;
	});