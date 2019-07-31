var redis = require("redis");
var client = redis.createClient();

client.on("error", function(err) {
   console.log("Error" + err);
});


client.set("one", "eto odinka", redis.print);
client.hset("hash key", "hashtest 1", "valueofhash1", redis.print);
client.hkeys("hash key", function(err, replies) {
	console.log(replies.lenght + "replying here: ");
	replies.forEach(function (reply, i){
		console.log("         " + i + " and : "+ reply);
	});
	client.quit();
});