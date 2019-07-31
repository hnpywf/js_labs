var fs = require("fs");
var http = require("http");
var jade = require("jade");

var server = new http.Server;
server.listen(1372, 'localhost');


var renderFunc = jade.compileFile("index.jade");


var html = renderFunc({
	title : "Express",
	foo: true
});

console.log("Server started on port: 1372");
console.log("Now you have a permission to visit site.");
console.log("Sava V.S. 2019 (C)");

server.on('request', function(req, res){
	res.end(html);
});