var net = require('net');

var redisClient = require('./GetRedisClient')();

var server = net.createServer(function(conn) {
   console.log('connected'); 

   redisClient.on('error', function(err) {
     console.log('Error ' + err);
   });

   // fifth database is game score database
   redisClient.select(5);
   conn.on('data', function(data) {
      console.log(data + ' from ' + conn.remoteAddress + ' ' +
        conn.remotePort);
      try {
         var obj = JSON.parse(data);

         // add or overwrite score
         redisClient.hset(obj.member, "first_name", obj.first_name, redisClient.print);
         redisClient.hset(obj.member, "last_name", obj.last_name, redisClient.print);
         redisClient.hset(obj.member, "score", obj.score, redisClient.print);
         redisClient.hset(obj.member, "date", obj.date, redisClient.print);

         // add to scores for Zowie!
         redisClient.zadd("Zowie!", parseInt(obj.score), obj.member);
      } catch(err) {
         console.log(err);
      }
   });
   conn.on('close', function() {
        console.log('redisClient closed connection');
        redisClient.quit();
   });

}).listen(8124);

console.log('listening on port 8124');
