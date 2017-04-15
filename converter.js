var data = "(087073818159BR00170212V4012.1409N04429.4742E002.8123421000.00,00000000L00000000)";
var V = data.search("V");
var N = data.search("N");
var E = data.search("E");
var B = data.search("B");

var mac = data.slice(1,B);

var lat1 = data.slice(V+1,N);//lat get 
var lng =  parseFloat(lat1.slice(0,2))+ parseFloat(lat1.slice(2)/60);

var lng1 = data.slice(N+2,E);//lng get
var lat =  parseFloat(lng1.slice(0,2))+ parseFloat(lng1.slice(2)/60);
