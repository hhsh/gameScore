var redis = require('redis');
 
module.exports = function(){
	var client = redis.createClient({
		host:'192.168.1.119',
		port:6593,
		password:'aaaaaaaa!aaaaaaaa!!aaaaaaaaaaa_aaaaaaaaaaa__aaaaaa'
	});	
	return client;
};